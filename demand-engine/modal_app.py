"""
Modal deployment wrapper for Demand Engine FastAPI application
"""

import modal

# Create Modal image with all dependencies
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install_from_requirements("requirements.txt")
)

# Create Modal app
modal_app = modal.App("demand-engine-api", image=image)

# Define secrets that will be available to the app
@modal_app.function(
    secrets=[
        modal.Secret.from_name("demand-engine-secrets"),
    ],
    container_idle_timeout=300,
    timeout=600,
)
@modal.asgi_app()
def fastapi_app():
    """
    Modal ASGI wrapper for FastAPI application
    """
    from app import app
    return app
