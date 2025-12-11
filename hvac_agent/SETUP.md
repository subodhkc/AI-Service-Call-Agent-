# 🛠️ HVAC Voice Agent - Complete Setup & Deployment Guide

This document provides step-by-step instructions to get the HVAC AI Voice Agent running locally and deployed to production.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Environment Setup](#environment-setup)
4. [Local Development](#local-development)
5. [Testing Locally](#testing-locally)
6. [Twilio Configuration](#twilio-configuration)
7. [Deploy to Vercel](#deploy-to-vercel)
8. [Deploy to Modal](#deploy-to-modal)
9. [Production Checklist](#production-checklist)
10. [Current Capabilities & Features](#current-capabilities--features)
11. [User Call Flow](#user-call-flow)
12. [Future Enhancements](#future-enhancements)

---

## Prerequisites

Before starting, ensure you have:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Python** | 3.11+ | Runtime |
| **Git** | Latest | Version control |
| **OpenAI Account** | - | AI agent brain |
| **Twilio Account** | - | Voice calls |
| **ngrok** (for local testing) | Latest | Expose local server |

### Get Your API Keys

1. **OpenAI API Key**
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new secret key
   - Copy and save it securely

2. **Twilio Credentials**
   - Sign up at [twilio.com](https://www.twilio.com/try-twilio)
   - Get a phone number (Voice-enabled)
   - Note your Account SID and Auth Token from the Console Dashboard

---

## Clone the Repository

```bash
# Clone the repository
git clone https://github.com/subodhkc/AI-Service-Call-Agent-.git

# Navigate to the project
cd AI-Service-Call-Agent-/hvac_agent
```

### Pull Latest Changes (if already cloned)

```bash
cd AI-Service-Call-Agent-
git pull origin main
cd hvac_agent
```

---

## Environment Setup

### Step 1: Create Virtual Environment

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

### Step 4: Edit `.env` File

Open `.env` in your editor and fill in the values:

```env
# ===========================================
# REQUIRED - Must be set
# ===========================================
OPENAI_API_KEY=sk-your-openai-api-key-here

# ===========================================
# APPLICATION SETTINGS
# ===========================================
APP_NAME=HVAC Voice Agent
HVAC_COMPANY_NAME=Your Company Name
DEBUG=true
LOG_LEVEL=INFO

# ===========================================
# DATABASE (SQLite for dev, PostgreSQL for prod)
# ===========================================
DATABASE_URL=sqlite:///./hvac_agent.db

# ===========================================
# OPENAI SETTINGS
# ===========================================
OPENAI_MODEL=gpt-4o-mini

# ===========================================
# TWILIO (Optional for local, required for prod)
# ===========================================
# TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
# STREAM_WEBSOCKET_URL=wss://your-domain.com/twilio/stream
```

### Where to Set Keys

| Key | Where to Get | Where to Set |
|-----|--------------|--------------|
| `OPENAI_API_KEY` | [OpenAI Dashboard](https://platform.openai.com/api-keys) | `.env` file |
| `TWILIO_ACCOUNT_SID` | [Twilio Console](https://console.twilio.com) | `.env` file (optional) |
| `TWILIO_AUTH_TOKEN` | [Twilio Console](https://console.twilio.com) | `.env` file (optional) |
| `DATABASE_URL` | Your database provider | `.env` file |

---

## Local Development

### Start the Server

```bash
# Development mode with auto-reload
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Server Output

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

---

## Testing Locally

### 1. Health Check

```bash
# Basic health
curl http://localhost:8000/health

# Expected response:
# {"status": "ok"}
```

### 2. Detailed Health

```bash
curl http://localhost:8000/health/detailed
```

### 3. List Service Locations

```bash
curl http://localhost:8000/debug/locations
```

### 4. List Appointments

```bash
curl http://localhost:8000/debug/appointments
```

### 5. Get Available Slots

```bash
curl http://localhost:8000/debug/slots/DAL
```

### 6. Create Test Booking

```bash
curl -X POST http://localhost:8000/debug/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "date": "2024-12-15",
    "time": "10:00",
    "issue": "AC not cooling",
    "location_code": "DAL",
    "phone": "555-123-4567"
  }'
```

### 7. View System Stats

```bash
curl http://localhost:8000/debug/stats
```

---

## Twilio Configuration

### Step 1: Expose Local Server with ngrok

```bash
# Install ngrok (if not installed)
# Download from https://ngrok.com/download

# Start ngrok tunnel
ngrok http 8000
```

You'll see output like:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:8000
```

### Step 2: Configure Twilio Webhook

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to **Phone Numbers → Manage → Active Numbers**
3. Click on your phone number
4. Under **Voice Configuration**:
   - **A CALL COMES IN**: Webhook
   - **URL**: `https://YOUR_NGROK_ID.ngrok.io/twilio/voice`
   - **HTTP Method**: POST
5. Click **Save**

### Step 3: Test with a Real Call

1. Call your Twilio phone number
2. You should hear: *"Thank you for calling KC Comfort Air..."*
3. Speak to test the AI agent

### Troubleshooting Twilio

| Issue | Solution |
|-------|----------|
| No audio | Check ngrok is running |
| "Application error" | Check server logs |
| Webhook fails | Verify URL is correct |
| No response | Check OPENAI_API_KEY is set |

---

## Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd hvac_agent
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **hvac-voice-agent**
- Directory? **./**

### Step 4: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENAI_API_KEY` | `sk-xxx...` | Production |
| `HVAC_COMPANY_NAME` | `Your Company` | Production |
| `DATABASE_URL` | `postgresql://...` | Production |
| `LOG_LEVEL` | `INFO` | Production |

### Step 5: Redeploy with Variables

```bash
vercel --prod
```

### Step 6: Update Twilio Webhook

Change your Twilio webhook URL to:
```
https://your-project.vercel.app/twilio/voice
```

---

## Deploy to Modal

### Step 1: Install Modal CLI

```bash
pip install modal
```

### Step 2: Create Modal Account & Login

```bash
modal setup
```

### Step 3: Create Secrets in Modal

1. Go to [Modal Dashboard](https://modal.com/secrets)
2. Click **Create new secret**
3. Name it: `hvac-agent-secrets`
4. Add these key-value pairs:
   - `OPENAI_API_KEY`: Your OpenAI key
   - `HVAC_COMPANY_NAME`: Your company name
   - `DATABASE_URL`: Your database URL (optional)

### Step 4: Deploy to Modal

```bash
cd hvac_agent
modal deploy modal_app.py
```

### Step 5: Get Your Modal URL

After deployment, Modal will show:
```
✓ Created web endpoint: https://your-username--hvac-voice-agent-fastapi-app.modal.run
```

### Step 6: Update Twilio Webhook

Change your Twilio webhook URL to:
```
https://your-username--hvac-voice-agent-fastapi-app.modal.run/twilio/voice
```

---

## Production Checklist

### Before Going Live

- [ ] **OpenAI API Key** - Set in production environment
- [ ] **Twilio Account** - Upgraded from trial (for production calls)
- [ ] **Production Database** - PostgreSQL instead of SQLite
- [ ] **Custom Domain** - (Optional) Point your domain to deployment
- [ ] **SSL Certificate** - Automatically handled by Vercel/Modal
- [ ] **Twilio Webhook** - Updated to production URL
- [ ] **Test Call** - Make a real call to verify everything works

### Recommended Production Database Options

| Provider | Free Tier | Setup |
|----------|-----------|-------|
| [Neon](https://neon.tech) | 512MB | Serverless PostgreSQL |
| [Supabase](https://supabase.com) | 500MB | PostgreSQL + extras |
| [PlanetScale](https://planetscale.com) | 5GB | MySQL compatible |
| [Railway](https://railway.app) | $5 credit | PostgreSQL |

### Production DATABASE_URL Format

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@host:5432/dbname

# With SSL (recommended)
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

---

## Current Capabilities & Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **Voice Conversations** | Natural turn-based voice calls via Twilio |
| **Real-time Streaming** | Low-latency streaming via Twilio Media Streams + OpenAI Realtime |
| **Appointment Booking** | Schedule new HVAC service appointments |
| **Appointment Rescheduling** | Change existing appointment date/time |
| **Appointment Cancellation** | Cancel appointments by customer name |
| **Multi-Location Support** | Dallas (DAL), Fort Worth (FTW), Arlington (ARL) |

### 🚨 Emergency Handling

| Emergency Type | Detection | Action |
|----------------|-----------|--------|
| **Gas Leak** | Keywords: "gas", "smell gas", "leak" | Immediate transfer + safety instructions |
| **Carbon Monoxide** | Keywords: "CO", "carbon monoxide", "detector" | Immediate transfer + evacuation guidance |
| **No Heat (Cold Weather)** | Keywords: "no heat", "freezing", "cold" | Priority escalation |
| **No AC (Hot Weather)** | Keywords: "no AC", "no cooling", "hot" | Priority escalation |
| **Electrical Issues** | Keywords: "sparks", "burning smell", "electrical" | Safety warning + transfer |

### 🎙️ Voice & Tone Features

| Feature | Description |
|---------|-------------|
| **Soft Tone Responses** | Empathetic, calm voice for all interactions |
| **Emotion Detection** | Recognizes frustrated callers and adapts tone |
| **Multiple Voice Personas** | Professional, Friendly, Empathetic, Urgent, Calm |
| **SSML Support** | Advanced speech synthesis markup |

### 💡 HVAC Knowledge Base

| Category | Examples |
|----------|----------|
| **General Tips** | Filter replacement, thermostat settings |
| **Troubleshooting** | AC not cooling, heater not working |
| **Maintenance Schedules** | Seasonal checkups, annual service |
| **Energy Saving** | Efficiency tips, cost reduction |

### 🛡️ Technical Features

| Feature | Description |
|---------|-------------|
| **Robust Error Handling** | Graceful recovery from failures |
| **Structured Logging** | JSON/standard formats with call context |
| **Call State Management** | Maintains conversation context |
| **Smart Date Parsing** | Understands "tomorrow", "next Monday", etc. |
| **SQLAlchemy ORM** | Database abstraction with migrations |
| **Type Hints** | Full Python type annotations |

---

## User Call Flow

### Standard Booking Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER CALLS                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  "Thank you for calling KC Comfort Air. I'm your virtual        │
│   assistant. How can I assist you today?"                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER: "I need to schedule an AC repair"                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "I'd be happy to help you schedule an AC repair.        │
│   May I have your name please?"                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER: "John Smith"                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "Thank you, John. Which location works best for you?    │
│   We have Dallas, Fort Worth, and Arlington."                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER: "Dallas"                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "Great! When would you like to schedule? We have        │
│   availability tomorrow and throughout the week."               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER: "Tomorrow at 2pm"                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "Perfect! I've scheduled your AC repair appointment     │
│   for tomorrow at 2:00 PM at our Dallas location. Is there      │
│   anything else I can help you with?"                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER: "No, that's all"                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "Thank you for calling KC Comfort Air. Have a great     │
│   day, and stay comfortable!"                                   │
│                         [CALL ENDS]                             │
└─────────────────────────────────────────────────────────────────┘
```

### Emergency Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  USER: "I smell gas in my house!"                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  🚨 EMERGENCY DETECTED: Gas Leak (Confidence: 95%)              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT (URGENT TONE): "I understand this is an emergency.       │
│   Please leave your home immediately and avoid using any        │
│   electrical switches. I'm connecting you to our emergency      │
│   line right now. Please stay on the line."                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    [TRANSFER TO HUMAN]                          │
│              Emergency contact: 555-911-HVAC                    │
└─────────────────────────────────────────────────────────────────┘
```

### Human Transfer Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  USER: "I want to speak to a real person"                       │
│  - OR -                                                         │
│  USER: [Presses 0]                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: "Of course! I'm connecting you to a representative      │
│   now. Please hold."                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    [TRANSFER TO HUMAN]                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Future Enhancements

### 🔜 Short-Term (1-2 Months)

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **SMS Confirmations** | Send appointment confirmations via text | High |
| **Appointment Reminders** | Automated reminder calls/texts 24h before | High |
| **Twilio Signature Validation** | Verify webhook authenticity | High |
| **Rate Limiting** | Protect against abuse | Medium |
| **Call Recording** | Record calls for quality assurance | Medium |

### 🔮 Medium-Term (3-6 Months)

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **CRM Integration** | Sync with Salesforce, HubSpot | High |
| **Google Calendar Sync** | Two-way calendar integration | High |
| **Multi-Language Support** | Spanish, French, etc. | Medium |
| **Sentiment Analysis** | Track customer satisfaction | Medium |
| **A/B Testing** | Optimize voice prompts | Medium |
| **Analytics Dashboard** | Call metrics and insights | Medium |

### 🚀 Long-Term (6-12 Months)

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **Outbound Calling** | Proactive appointment reminders | High |
| **Technician Dispatch** | Real-time technician assignment | High |
| **Parts Inventory Check** | Check parts availability during call | Medium |
| **Customer Portal** | Self-service web portal | Medium |
| **Mobile App** | Customer-facing mobile application | Low |
| **Voice Biometrics** | Customer identification by voice | Low |

### 🛠️ Technical Improvements

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **Redis Cache** | Shared call state across replicas | High |
| **PostgreSQL Migration** | Production-ready database | High |
| **Sentry Integration** | Error monitoring and alerting | High |
| **DataDog/NewRelic** | APM and performance metrics | Medium |
| **Kubernetes Deployment** | Container orchestration | Medium |
| **CI/CD Pipeline** | Automated testing and deployment | Medium |
| **Load Testing** | Performance benchmarking | Low |

### 💡 AI Improvements

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **Fine-tuned Model** | Custom model for HVAC domain | Medium |
| **Intent Classification** | ML-based intent detection | Medium |
| **Conversation Memory** | Remember returning customers | Medium |
| **Proactive Suggestions** | Suggest maintenance based on history | Low |
| **Voice Cloning** | Custom brand voice | Low |

---

## Support & Resources

### Documentation
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Twilio Voice Docs](https://www.twilio.com/docs/voice)
- [OpenAI API Docs](https://platform.openai.com/docs)

### Getting Help
- Open a GitHub Issue for bugs
- Check existing issues before creating new ones

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ for HVAC professionals**

*Last updated: December 2024*
