"""
Kairo App - FastAPI Main Entrypoint
Serves REST API endpoints and static frontend UI.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routes.profile import router as profile_router
from routes.jobs import router as jobs_router
from routes.resume import router as resume_router
from routes.growth import router as growth_router

app = FastAPI(
    title="Kairo Career Intelligence Engine API",
    description="Evidence-backed career profile analysis, JD matching, dynamic project ranking, and tailored resume generation.",
    version="1.0.0"
)

# Enable CORS for local development and UI integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(profile_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")
app.include_router(resume_router, prefix="/api")
app.include_router(growth_router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Kairo Career Intelligence",
        "version": "1.0.0-phase1"
    }


# Mount frontend static files if they exist
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend"))
if os.path.exists(frontend_dir):
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

    @app.get("/")
    def serve_frontend():
        index_file = os.path.join(frontend_dir, "index.html")
        return FileResponse(index_file)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
