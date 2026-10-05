"""
Kairo App - Profile API Routes
"""
import json
import os
from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from models.schemas import UnifiedCareerProfile

router = APIRouter(prefix="/profile", tags=["Profile"])

# Path to sample profile
SAMPLE_PROFILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../sample_data/sample_profile.json"))

_in_memory_profile: UnifiedCareerProfile = None


def get_current_profile() -> UnifiedCareerProfile:
    global _in_memory_profile
    if _in_memory_profile is None:
        with open(SAMPLE_PROFILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            _in_memory_profile = UnifiedCareerProfile(**data)
    return _in_memory_profile


@router.get("", response_model=UnifiedCareerProfile)
def get_profile():
    """Retrieve current unified career profile."""
    return get_current_profile()


@router.post("/update", response_model=UnifiedCareerProfile)
def update_profile(profile_data: UnifiedCareerProfile):
    """Update profile attributes."""
    global _in_memory_profile
    _in_memory_profile = profile_data
    return _in_memory_profile


@router.post("/sync-github")
def sync_github_profile(username: str):
    """Simulates fetching latest repositories, commit activity, and evidence tags from GitHub."""
    profile = get_current_profile()
    # Mock refresh evidence status
    for proj in profile.projects:
        proj.evidence_sources.append(f"github.com/{username} (synced)")
    return {
        "status": "success",
        "message": f"Successfully ingested and verified 3 repositories from GitHub user @{username}.",
        "profile": profile
    }
