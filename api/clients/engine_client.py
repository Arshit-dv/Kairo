"""
Kairo App - Engine Client
Abstraction client to communicate with Kairo Intelligence Engine (local Python module or remote service).
"""
import sys
import os
from typing import Dict, Any, Optional

# Add kairo-engine to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../kairo-engine")))

from models.schemas import (
    UnifiedCareerProfile,
    JobDescriptionAnalysis,
    ResumeConstraints,
    JobMatchAnalysis,
    TailoredResume,
    EvaluationReport
)
from agents.orchestrator import KairoOrchestrator


class KairoEngineClient:
    """Provides a standardized client for kairo-app to invoke kairo-engine intelligence."""

    def __init__(self, mode: str = "direct"):
        self.mode = mode
        self.orchestrator = KairoOrchestrator()

    def analyze_job(self, raw_text: str, title: str, company: str) -> JobDescriptionAnalysis:
        return self.orchestrator.process_job_analysis(raw_text, title, company)

    def match_job(self, profile: UnifiedCareerProfile, jd: JobDescriptionAnalysis) -> JobMatchAnalysis:
        return self.orchestrator.process_job_match(profile, jd)

    def generate_tailored_resume(
        self, profile: UnifiedCareerProfile, jd: JobDescriptionAnalysis, constraints: ResumeConstraints
    ) -> Dict[str, Any]:
        return self.orchestrator.generate_tailored_resume(profile, jd, constraints)
