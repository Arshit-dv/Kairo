"""
Kairo App - Jobs API Routes
"""
import json
import os
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel

from models.schemas import JobDescriptionAnalysis, JobMatchAnalysis
from clients.engine_client import KairoEngineClient
from routes.profile import get_current_profile

router = APIRouter(prefix="/jobs", tags=["Jobs"])

SAMPLE_JDS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../sample_data/sample_jds.json"))
engine_client = KairoEngineClient()

_jds_cache: List[Dict[str, Any]] = []


def load_sample_jds():
    global _jds_cache
    if not _jds_cache:
        with open(SAMPLE_JDS_PATH, "r", encoding="utf-8") as f:
            _jds_cache = json.load(f)
    return _jds_cache


class AnalyzeJDRequest(BaseModel):
    title: str = "Machine Learning Engineer"
    company: str = "Nexus AI Labs"
    raw_text: str


@router.get("/list")
def list_sample_jobs():
    """List preset sample job opportunities."""
    return load_sample_jds()


@router.post("/analyze", response_model=JobDescriptionAnalysis)
def analyze_job_description(req: AnalyzeJDRequest):
    """Analyze and extract structured competencies from a raw job description."""
    analysis = engine_client.analyze_job(req.raw_text, title=req.title, company=req.company)
    return analysis


@router.post("/match", response_model=JobMatchAnalysis)
def match_job_with_profile(req: AnalyzeJDRequest):
    """Analyze JD and run full evidence-backed candidate matching & project ranking."""
    profile = get_current_profile()
    jd_analysis = engine_client.analyze_job(req.raw_text, title=req.title, company=req.company)
    match_result = engine_client.match_job(profile, jd_analysis)
    return match_result
