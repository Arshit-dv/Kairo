"""
Kairo App - Profile API Routes (Phases 1 & 2)
"""
import json
import os
from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from models.schemas import UnifiedCareerProfile, CareerKnowledgeGraph
from clients.engine_client import KairoEngineClient

router = APIRouter(prefix="/profile", tags=["Profile"])

SAMPLE_PROFILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../sample_data/sample_profile.json"))

_in_memory_profile: UnifiedCareerProfile = None
engine_client = KairoEngineClient()


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
    for proj in profile.projects:
        proj.evidence_sources.append(f"github.com/{username} (synced)")
    return {
        "status": "success",
        "message": f"Successfully ingested and verified 3 repositories from GitHub user @{username}.",
        "profile": profile
    }


@router.post("/sync-kaggle")
def sync_kaggle_profile(username: str = "alexchen_ml"):
    """Phase 2: Ingest Kaggle profile, tier badges, notebooks, and extract verified ML skills."""
    profile = get_current_profile()
    updated_profile = engine_client.ingest_kaggle(profile, username)
    return {
        "status": "success",
        "message": f"Successfully synced Kaggle profile for @{username} ({updated_profile.kaggle_profile.tier}).",
        "kaggle_profile": updated_profile.kaggle_profile,
        "profile": updated_profile
    }


@router.get("/knowledge-graph", response_model=CareerKnowledgeGraph)
def get_career_knowledge_graph():
    """Phase 2: Build and return the candidate's career knowledge graph."""
    profile = get_current_profile()
    return engine_client.build_knowledge_graph(profile)
