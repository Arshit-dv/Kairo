"""
Kairo App - Tailored Resume API Routes
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, Optional
from pydantic import BaseModel

from models.schemas import ResumeConstraints, TailoredResume, EvaluationReport
from clients.engine_client import KairoEngineClient
from routes.profile import get_current_profile
from routes.jobs import AnalyzeJDRequest

router = APIRouter(prefix="/resume", tags=["Resume"])
engine_client = KairoEngineClient()


class GenerateResumeRequest(BaseModel):
    job_req: AnalyzeJDRequest
    constraints: Optional[ResumeConstraints] = None


@router.post("/generate")
def generate_tailored_resume(req: GenerateResumeRequest):
    """Generate a 1-page tailored resume adhering to strict constraints and return ATS diagnostics."""
    profile = get_current_profile()
    jd_analysis = engine_client.analyze_job(
        req.job_req.raw_text,
        title=req.job_req.title,
        company=req.job_req.company
    )
    
    constraints = req.constraints if req.constraints else ResumeConstraints()
    result = engine_client.generate_tailored_resume(profile, jd_analysis, constraints)
    return result
