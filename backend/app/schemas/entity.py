from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class LocationCoords(BaseModel):
    address: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""
    country: Optional[str] = "USA"
    coordinates: List[float] = Field(default_factory=lambda: [40.7128, -74.0060])


class PersonalDetails(BaseModel):
    dob: Optional[str] = None
    bloodGroup: Optional[str] = None
    fingerprintId: Optional[str] = None
    eyeColor: Optional[str] = None
    heightCm: Optional[int] = None
    distinguishingMarks: Optional[List[str]] = Field(default_factory=list)


class EntityBase(BaseModel):
    entity_id: str
    name: str
    alias: Optional[str] = ""
    type: str = "person"
    sub_type: Optional[str] = None
    crime_category: Optional[str] = None
    risk_score: float = 50.0
    risk_level: str = "MEDIUM"
    status: str = "UNDER_SURVEILLANCE"
    photo_url: Optional[str] = None
    age: Optional[str] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    biography: Optional[str] = None
    ai_threat_summary: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = "USA"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    active_warrants: Optional[str] = "0"
    tags: Optional[List[str]] = Field(default_factory=list)
    personal_details: Optional[Dict[str, Any]] = Field(default_factory=dict)
    type_specific_data: Optional[Dict[str, Any]] = Field(default_factory=dict)


class EntityCreate(EntityBase):
    pass


class EntityUpdate(BaseModel):
    name: Optional[str] = None
    alias: Optional[str] = None
    type: Optional[str] = None
    sub_type: Optional[str] = None
    crime_category: Optional[str] = None
    risk_score: Optional[float] = None
    risk_level: Optional[str] = None
    status: Optional[str] = None
    photo_url: Optional[str] = None
    age: Optional[str] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    biography: Optional[str] = None
    ai_threat_summary: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    active_warrants: Optional[str] = None
    tags: Optional[List[str]] = None
    personal_details: Optional[Dict[str, Any]] = None
    type_specific_data: Optional[Dict[str, Any]] = None


class EntityRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    entity_id: str
    criminalId: Optional[str] = None
    name: str
    alias: Optional[str] = ""
    type: str
    sub_type: Optional[str] = None
    crimeCategory: Optional[str] = None
    crime_category: Optional[str] = None
    riskScore: float
    risk_score: float
    riskLevel: str
    risk_level: str
    status: str
    photoUrl: Optional[str] = None
    photo_url: Optional[str] = None
    age: Optional[Any] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    biography: Optional[str] = None
    aiThreatSummary: Optional[str] = None
    ai_threat_summary: Optional[str] = None
    lastKnownLocation: Optional[Dict[str, Any]] = None
    lastActivity: Optional[str] = None
    last_activity: Optional[datetime] = None
    knownAssociatesCount: int = 0
    activeWarrants: int = 0
    active_warrants: Optional[str] = "0"
    tags: List[str] = Field(default_factory=list)
    personalDetails: Optional[Dict[str, Any]] = Field(default_factory=dict)
    knownAssociates: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    vehicles: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    phoneNumbers: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    financialAccounts: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    timeline: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    connectedOrganizations: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime


class EntitySearchFilter(BaseModel):
    query: Optional[str] = None
    type: Optional[str] = None
    crimeType: Optional[str] = None
    crime_category: Optional[str] = None
    riskLevel: Optional[str] = None
    risk_level: Optional[str] = None
    city: Optional[str] = None
    status: Optional[str] = None
    limit: int = 50
    offset: int = 0
