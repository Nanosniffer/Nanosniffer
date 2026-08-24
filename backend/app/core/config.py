import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        extra="allow",
    )

    PROJECT_NAME: str = "AI-Powered Criminal Network Analysis System"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    API_STR: str = "/api"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Security & Auth
    SECRET_KEY: str = "aegis_super_secret_jwt_key_tactical_intelligence_2026_x99"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    PASSWORD_RESET_EXPIRE_MINUTES: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:8000",
        "https://pambhartaxil-debug.github.io",
        "*",
    ]

    # Relational Database (PostgreSQL / SQLite async fallback)
    DATABASE_URL: str = Field(
        default="sqlite:///./criminal_intel.db",
        description="Database connection string.",
    )

    # Graph Database (Neo4j)
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "criminal_intel_password"
    NEO4J_DATABASE: str = "neo4j"
    NEO4J_MAX_CONNECTION_POOL_SIZE: int = 50

    # Redis & Celery
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # Storage
    STORAGE_TYPE: str = "local"
    STORAGE_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "storage")
    S3_ENDPOINT_URL: Optional[str] = None
    S3_ACCESS_KEY: Optional[str] = None
    S3_SECRET_KEY: Optional[str] = None
    S3_BUCKET_NAME: str = "criminal-intel-documents"
    S3_REGION: str = "us-east-1"

    # AI / ML Hyperparameters
    ENTITY_RESOLUTION_SIMILARITY_THRESHOLD: float = 0.82
    ANOMALY_ZSCORE_THRESHOLD: float = 2.5
    LINK_PREDICTION_MIN_SCORE: float = 0.35


settings = Settings()
