import os
import sys
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.security import create_access_token, get_password_hash
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models.user import User

# Test in-memory SQLite database
TEST_DB_URL = "sqlite:///./test_criminal_intel.db"
test_engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    
    # Pre-seed test users
    db = TestingSessionLocal()
    try:
        admin_user = User(
            id="test-admin-01",
            email="admin.test@interpol.gov",
            hashed_password=get_password_hash("AdminPass123!"),
            name="Test Admin Commander",
            role="ADMIN",
            clearance_level="TOP SECRET // SCI",
            agency="Test Agency",
            is_active=True,
            is_verified=True,
        )
        inv_user = User(
            id="test-inv-01",
            email="inv.test@interpol.gov",
            hashed_password=get_password_hash("InvPass123!"),
            name="Test Lead Investigator",
            role="INVESTIGATOR",
            clearance_level="SECRET",
            agency="Test Agency",
            is_active=True,
            is_verified=True,
        )
        analyst_user = User(
            id="test-analyst-01",
            email="analyst.test@interpol.gov",
            hashed_password=get_password_hash("AnalystPass123!"),
            name="Test Junior Analyst",
            role="ANALYST",
            clearance_level="CONFIDENTIAL",
            agency="Test Agency",
            is_active=True,
            is_verified=True,
        )
        db.add_all([admin_user, inv_user, analyst_user])
        db.commit()
    finally:
        db.close()

    yield
    
    # Teardown
    Base.metadata.drop_all(bind=test_engine)
    if os.path.exists("./test_criminal_intel.db"):
        try:
            os.remove("./test_criminal_intel.db")
        except Exception:
            pass


@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(db_session):
    def override_get_db():
        try:
            yield db_session
            db_session.commit()
        except Exception:
            db_session.rollback()
            raise

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def admin_headers():
    token = create_access_token(subject="test-admin-01", role="ADMIN")
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def investigator_headers():
    token = create_access_token(subject="test-inv-01", role="INVESTIGATOR")
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def analyst_headers():
    token = create_access_token(subject="test-analyst-01", role="ANALYST")
    return {"Authorization": f"Bearer {token}"}
