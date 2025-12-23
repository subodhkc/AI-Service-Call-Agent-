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
app = modal.App("demand-engine-api", image=image)

# Define secrets that will be available to the app
@app.function(
    secrets=[
        modal.Secret.from_name("demand-engine-secrets"),
    ],
    scaledown_window=300,
    timeout=600,
)
@modal.asgi_app()
def fastapi_app():
    """
    Modal ASGI wrapper for FastAPI application
    """
    from app import app as fastapi_app
    return fastapi_app
