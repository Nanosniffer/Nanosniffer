from enum import Enum
from typing import List, Set


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    INVESTIGATOR = "INVESTIGATOR"
    ANALYST = "ANALYST"


class Permission(str, Enum):
    # User permissions
    MANAGE_USERS = "manage_users"
    VIEW_USERS = "view_users"
    
    # Case permissions
    MANAGE_CASES = "manage_cases"
    VIEW_CASES = "view_cases"
    ASSIGN_CASES = "assign_cases"
    
    # Entity & Relationship permissions
    CREATE_ENTITIES = "create_entities"
    UPDATE_ENTITIES = "update_entities"
    DELETE_ENTITIES = "delete_entities"
    VIEW_ENTITIES = "view_entities"
    MANAGE_RELATIONSHIPS = "manage_relationships"
    
    # AI & Analytics permissions
    TRIGGER_AI_ANALYSIS = "trigger_ai_analysis"
    VIEW_ANALYTICS = "view_analytics"
    
    # Reports & Evidence
    GENERATE_REPORTS = "generate_reports"
    UPLOAD_EVIDENCE = "upload_evidence"
    
    # Alerts & Audit
    MANAGE_ALERTS = "manage_alerts"
    VIEW_AUDIT_LOGS = "view_audit_logs"


# Mapping from UserRole to granted Permissions
ROLE_PERMISSIONS: dict[UserRole, Set[Permission]] = {
    UserRole.ADMIN: {
        Permission.MANAGE_USERS,
        Permission.VIEW_USERS,
        Permission.MANAGE_CASES,
        Permission.VIEW_CASES,
        Permission.ASSIGN_CASES,
        Permission.CREATE_ENTITIES,
        Permission.UPDATE_ENTITIES,
        Permission.DELETE_ENTITIES,
        Permission.VIEW_ENTITIES,
        Permission.MANAGE_RELATIONSHIPS,
        Permission.TRIGGER_AI_ANALYSIS,
        Permission.VIEW_ANALYTICS,
        Permission.GENERATE_REPORTS,
        Permission.UPLOAD_EVIDENCE,
        Permission.MANAGE_ALERTS,
        Permission.VIEW_AUDIT_LOGS,
    },
    UserRole.INVESTIGATOR: {
        Permission.VIEW_USERS,
        Permission.MANAGE_CASES,
        Permission.VIEW_CASES,
        Permission.CREATE_ENTITIES,
        Permission.UPDATE_ENTITIES,
        Permission.VIEW_ENTITIES,
        Permission.MANAGE_RELATIONSHIPS,
        Permission.TRIGGER_AI_ANALYSIS,
        Permission.VIEW_ANALYTICS,
        Permission.GENERATE_REPORTS,
        Permission.UPLOAD_EVIDENCE,
        Permission.MANAGE_ALERTS,
    },
    UserRole.ANALYST: {
        Permission.VIEW_CASES,
        Permission.VIEW_ENTITIES,
        Permission.CREATE_ENTITIES,
        Permission.UPDATE_ENTITIES,
        Permission.MANAGE_RELATIONSHIPS,
        Permission.TRIGGER_AI_ANALYSIS,
        Permission.VIEW_ANALYTICS,
        Permission.GENERATE_REPORTS,
    },
}


def has_permission(user_role: str, permission: Permission) -> bool:
    """Check if a given role string holds the specified permission."""
    try:
        role_enum = UserRole(user_role.upper())
        return permission in ROLE_PERMISSIONS.get(role_enum, set())
    except (ValueError, KeyError):
        return False
