# 🔧 CODE MIGRATION GUIDE - Specific Changes to Existing Files

This guide shows EXACTLY what to change in your existing codebase to add multi-tenancy.

---

## FILE 1: `app/models/db_models.py`

**Action:** REPLACE ENTIRE FILE with `/home/claude/db_models_multi_tenant.py`

**Why:** The new file includes all existing models PLUS the new Tenant models.

---

## FILE 2: `app/main.py`

**Action:** ADD tenant resolver middleware

**Add these imports at the top:**
```python
from app.middleware.tenant_resolver import resolve_tenant_middleware
```

**Add this middleware (after existing middleware):**
```python
# Add BEFORE existing middleware
app.middleware("http")(resolve_tenant_middleware)  # NEW - Tenant resolution
app.middleware("http")(validate_twilio_request)    # Existing
app.middleware("http")(log_requests)                # Existing
```

**Update include routers section:**
```python
# Add new admin router
from app.routers import admin_tenants_router  # NEW

# Include it
app.include_router(admin_tenants_router)  # NEW
```

---

## FILE 3: Create `app/middleware/tenant_resolver.py`

**Action:** CREATE NEW FILE

Copy content from `/home/claude/tenant_resolver.py`

---

## FILE 4: Create `app/services/tenant_config.py`

**Action:** CREATE NEW FILE

Copy content from `/home/claude/tenant_config_builder.py`

---

## FILE 5: Create `app/routers/admin_tenants.py`

**Action:** CREATE NEW FILE

Copy content from `/home/claude/admin_tenants_router.py`

---

## FILE 6: `app/agents/hvac_agent.py`

**Action:** UPDATE to use tenant context

**Add import:**
```python
from app.middleware.tenant_resolver import TenantContext
from app.services.tenant_config import TenantConfigBuilder
```

**Update the `run_agent` or agent initialization function:**

**BEFORE:**
```python
def run_agent(call_sid: str, initial_message: str = None):
    # Hardcoded system prompt
    system_prompt = """You are an AI receptionist for KC Comfort Air..."""
    
    messages = [
        {"role": "system", "content": system_prompt},
        # ...
    ]
```

**AFTER:**
```python
def run_agent(call_sid: str, initial_message: str = None):
    # Get current tenant from context
    tenant = TenantContext.get()
    if not tenant:
        raise ValueError("No tenant context set!")
    
    # Build tenant-specific prompt
    config_builder = TenantConfigBuilder(tenant)
    system_prompt = config_builder.build_system_prompt()
    
    messages = [
        {"role": "system", "content": system_prompt},
        # ...
    ]
    
    # Use tenant-specific voice settings
    voice_config = config_builder.get_voice_config()
```

---

## FILE 7: `app/services/calendar_service.py`

**Action:** ADD tenant filtering to all queries

**Example in `create_appointment` function:**

**BEFORE:**
```python
def create_appointment(location_id: int, customer_name: str, ...):
    appointment = Appointment(
        location_id=location_id,
        customer_name=customer_name,
        # ...
    )
```

**AFTER:**
```python
def create_appointment(location_id: int, customer_name: str, ...):
    from app.middleware.tenant_resolver import TenantContext
    
    tenant = TenantContext.get()
    
    appointment = Appointment(
        tenant_id=tenant.id,  # NEW - Add tenant_id
        location_id=location_id,
        customer_name=customer_name,
        # ...
    )
```

**Example in `get_available_slots` function:**

**BEFORE:**
```python
def get_available_slots(location_code: str, date: datetime):
    location = db.query(Location).filter(
        Location.code == location_code
    ).first()
```

**AFTER:**
```python
def get_available_slots(location_code: str, date: datetime):
    from app.middleware.tenant_resolver import TenantContext
    
    tenant = TenantContext.get()
    
    location = db.query(Location).filter(
        Location.code == location_code,
        Location.tenant_id == tenant.id  # NEW - Filter by tenant
    ).first()
```

**Apply this pattern to ALL database queries** in:
- `calendar_service.py`
- `emergency_service.py`
- Any other service that queries the database

---

## FILE 8: `app/routers/twilio_voice_router.py` (and other Twilio routers)

**Action:** UPDATE to log tenant information

**Add after call starts:**

```python
@router.post("/twilio/voice")
async def handle_voice_call(request: Request):
    # Existing code...
    
    # NEW - Get tenant from context
    from app.middleware.tenant_resolver import TenantContext
    tenant = TenantContext.get()
    
    if tenant:
        logger.info("Call for tenant: %s (%s)", tenant.id, tenant.company_name)
    
    # Continue with existing logic...
```

---

## FILE 9: `.env`

**Action:** UPDATE environment variables

**ADD these new variables:**
```bash
# Multi-Tenant Configuration
DEFAULT_TENANT_ID=default_tenant

# Database must be PostgreSQL for production multi-tenancy
DATABASE_URL=postgresql://user:password@host:5432/hvac_agent

# Admin API Authentication (for securing tenant management)
ADMIN_API_KEY=your-secure-admin-key-here
```

**REMOVE (no longer needed):**
```bash
# ❌ Remove - now per-tenant in database
# HVAC_COMPANY_NAME=KC Comfort Air
```

---

## FILE 10: `app/services/db.py`

**Action:** ADD helper function to get tenant-filtered session

**ADD this function:**
```python
from app.middleware.tenant_resolver import TenantContext

def get_tenant_id() -> str:
    """Get current tenant ID from context."""
    tenant = TenantContext.get()
    if not tenant:
        raise ValueError("No tenant context available")
    return tenant.id

def query_with_tenant(model, session=None):
    """
    Helper to create tenant-filtered query.
    
    Usage:
        appointments = query_with_tenant(Appointment, db).filter(
            Appointment.date == today
        ).all()
    """
    if session is None:
        session = next(get_db_session())
    
    tenant_id = get_tenant_id()
    return session.query(model).filter(model.tenant_id == tenant_id)
```

---

## FILE 11: Database Migration Script

**Action:** CREATE and RUN migration

**Create file: `migrations/001_add_multi_tenancy.sql`**

Copy content from `/home/claude/migration_001_multi_tenant.sql`

**Run migration:**
```bash
# If using PostgreSQL
psql -d hvac_agent -f migrations/001_add_multi_tenancy.sql

# If using SQLite (development)
sqlite3 hvac_agent.db < migrations/001_add_multi_tenant.sql
```

**Or use Alembic (recommended):**
```bash
# Install Alembic
pip install alembic

# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Add multi-tenancy"

# Review generated migration
# Edit alembic/versions/xxx_add_multi_tenancy.py if needed

# Run migration
alembic upgrade head
```

---

## FILE 12: `requirements.txt`

**Action:** ADD new dependencies

```txt
# Add these lines
passlib[bcrypt]>=1.7.4  # For password hashing (tenant users)
python-jose[cryptography]>=3.3.0  # For JWT tokens (optional)
pytz>=2023.3  # For timezone handling
```

---

## TESTING CHECKLIST

After making all changes:

### 1. Database Migration
```bash
# Run migration
alembic upgrade head

# Verify tables created
psql -d hvac_agent -c "SELECT * FROM tenants;"
```

### 2. Create Test Tenant
```bash
curl -X POST http://localhost:8000/admin/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test HVAC Co",
    "twilio_phone_number": "+15555551234",
    "forward_to_number": "+15555555678",
    "service_areas": ["Dallas"],
    "admin_email": "admin@testhvac.com",
    "admin_name": "Test Admin"
  }'
```

### 3. Test Incoming Call
```bash
# Simulate Twilio webhook
curl -X POST http://localhost:8000/twilio/voice \
  -d "From=+15555550000" \
  -d "To=+15555551234" \
  -d "CallSid=test123"
  
# Check logs - should show:
# "Resolved tenant: test_hvac_co (Test HVAC Co)"
```

### 4. Verify Data Isolation
```python
# In Python shell
from app.services.db import get_db_session
from app.models.db_models import Tenant, Appointment

db = next(get_db_session())

# Get all tenants
tenants = db.query(Tenant).all()
print(f"Total tenants: {len(tenants)}")

# Check appointments are tenant-isolated
for tenant in tenants:
    count = db.query(Appointment).filter(
        Appointment.tenant_id == tenant.id
    ).count()
    print(f"{tenant.company_name}: {count} appointments")
```

---

## ROLLBACK PLAN (If Something Goes Wrong)

### Option 1: Database Rollback
```bash
# Using Alembic
alembic downgrade -1

# Or restore from backup
pg_restore -d hvac_agent backup.sql
```

### Option 2: Code Rollback
```bash
# Revert to previous commit
git revert HEAD

# Or checkout previous working version
git checkout <previous-commit-hash>
```

### Option 3: Emergency Fix
```python
# Temporarily disable tenant middleware in main.py
# Comment out this line:
# app.middleware("http")(resolve_tenant_middleware)

# System will fail gracefully without tenant context
# You can still access database directly
```

---

## DEPLOYMENT STEPS

### 1. Development Testing
```bash
# Test locally first
python -m pytest tests/

# Run server
uvicorn app.main:app --reload

# Test admin endpoints
./test_admin_api.sh
```

### 2. Staging Deployment
```bash
# Deploy to Modal staging
modal deploy modal_app.py --env staging

# Run smoke tests
./smoke_tests.sh https://staging-app.modal.run
```

### 3. Production Deployment
```bash
# Backup production database
pg_dump hvac_agent > backup_$(date +%Y%m%d).sql

# Deploy to Modal production
modal deploy modal_app.py --env production

# Monitor logs
modal logs hvac-voice-agent
```

### 4. Post-Deployment Verification
```bash
# Check health
curl https://your-app.modal.run/health

# Verify tenants loaded
curl https://your-app.modal.run/admin/tenants

# Test call with real Twilio number
# (make actual phone call)
```

---

## SUPPORT & TROUBLESHOOTING

### Common Issues

**Issue 1: "No tenant context available"**
```
Cause: Tenant middleware not running or phone number not found
Fix: Check tenant_resolver middleware is enabled
     Verify phone number exists in database
```

**Issue 2: "Foreign key constraint violation"**
```
Cause: Trying to create record without tenant_id
Fix: Ensure all new records include tenant_id from TenantContext
```

**Issue 3: "Tenant not found for phone number"**
```
Cause: Phone number not configured in tenants table
Fix: Add tenant with that phone number via admin API
```

### Debug Mode
```python
# Add to main.py for debugging
import logging
logging.getLogger("tenant_resolver").setLevel(logging.DEBUG)
```

---

## NEXT STEPS AFTER MIGRATION

1. ✅ Test with 2-3 test tenants
2. ✅ Onboard first real client
3. ✅ Monitor for issues
4. ✅ Build admin dashboard (Week 4)
5. ✅ Document onboarding process
6. ✅ Create video tutorials
7. ✅ Launch to more clients

**Need Help?** Review the full roadmap in `MULTI_TENANT_ROADMAP.md`
