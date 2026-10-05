"""
Kairo App - Engine Client (Phases 1 & 2)
"""
import sys
import os
from typing import Dict, Any, Optional

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../kairo-engine")))

from models.schemas import (
    UnifiedCareerProfile,
    JobDescriptionAnalysis,
    ResumeConstraints,
    JobMatchAnalysis,
    TailoredResume,
    EvaluationReport,
    CareerKnowledgeGraph,
    GrowthVelocityReport,
    CareerRecommendation
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

    def build_knowledge_graph(self, profile: UnifiedCareerProfile) -> CareerKnowledgeGraph:
        return self.orchestrator.build_career_knowledge_graph(profile)

    def ingest_kaggle(self, profile: UnifiedCareerProfile, username: str) -> UnifiedCareerProfile:
        return self.orchestrator.ingest_kaggle_footprint(profile, username)

    def get_growth_velocity(self) -> GrowthVelocityReport:
        return self.orchestrator.analyze_growth_velocity()

    def get_career_recommendations(self, profile: UnifiedCareerProfile, role: str) -> CareerRecommendation:
        return self.orchestrator.get_career_recommendations(profile, role)
