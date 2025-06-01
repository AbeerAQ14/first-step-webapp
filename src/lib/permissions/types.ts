export type Role = "admin" | "center" | "branch_admin" | "parent";

export type Resource =
  | "dashboard"
  | "branches"
  | "children"
  | "bookings"
  | "reports"
  | "notifications"
  | "team"
  | "advertisements"
  | "blogs";

export type Action = "view" | "create" | "edit" | "delete" | "manage";

export interface Permission {
  resource: Resource;
  action: Action;
  allowedRoles: Role[];
  centerSpecific?: boolean;
  branchSpecific?: boolean;
}
