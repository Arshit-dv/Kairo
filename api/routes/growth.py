"""
Kairo App - Career Growth API Routes (Phases 1 & 2)
"""
from fastapi import APIRouter
from typing import Dict, Any, List
from clients.engine_client import KairoEngineClient
from routes.profile import get_current_profile

router = APIRouter(prefix="/growth", tags=["Growth"])
engine_client = KairoEngineClient()


@router.get("/velocity")
def get_growth_velocity_report():
    """Phase 2: Retrieve calculated growth velocity report across historical snapshots."""
    return engine_client.get_growth_velocity()


@router.get("/recommendations")
def get_role_recommendations(target_role: str = "Machine Learning Engineer"):
    """Phase 2: Generate targeted upskilling recommendations for specific dream roles."""
    profile = get_current_profile()
    return engine_client.get_career_recommendations(profile, target_role)
