import { Permission } from "./types";

export const permissions: Permission[] = [
  // Dashboard permissions
  {
    resource: "dashboard",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
  },

  // Branches permissions
  {
    resource: "branches",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin"],
  },
  {
    resource: "branches",
    action: "create",
    allowedRoles: ["center"],
    centerSpecific: true,
  },
  {
    resource: "branches",
    action: "edit",
    allowedRoles: ["center"],
    centerSpecific: true,
  },
  {
    resource: "branches",
    action: "delete",
    allowedRoles: ["center"],
    centerSpecific: true,
  },
  {
    resource: "branches",
    action: "edit",
    allowedRoles: ["branch_admin"],
    branchSpecific: true,
  },

  // Children permissions
  {
    resource: "children",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
    centerSpecific: true,
  },
  {
    resource: "children",
    action: "create",
    allowedRoles: ["parent"],
  },
  {
    resource: "children",
    action: "edit",
    allowedRoles: ["parent"],
  },
  {
    resource: "children",
    action: "delete",
    allowedRoles: ["parent"],
  },

  // Bookings permissions
  {
    resource: "bookings",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
    centerSpecific: true,
  },
  {
    resource: "bookings",
    action: "manage",
    allowedRoles: ["admin", "center", "branch_admin"],
    centerSpecific: true,
  },

  // Reports permissions
  {
    resource: "reports",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin"],
    centerSpecific: true,
  },

  // Notifications permissions
  {
    resource: "notifications",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
  },
  {
    resource: "notifications",
    action: "manage",
    allowedRoles: ["admin", "center", "branch_admin"],
  },

  // Team permissions
  {
    resource: "team",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin"],
    centerSpecific: true,
  },
  {
    resource: "team",
    action: "create",
    allowedRoles: ["center", "branch_admin"],
    branchSpecific: true,
  },
  {
    resource: "team",
    action: "edit",
    allowedRoles: ["center", "branch_admin"],
    branchSpecific: true,
  },
  {
    resource: "team",
    action: "delete",
    allowedRoles: ["center", "branch_admin"],
    branchSpecific: true,
  },

  // Advertisements permissions
  {
    resource: "advertisements",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
  },
  {
    resource: "advertisements",
    action: "manage",
    allowedRoles: ["admin", "center"],
  },

  // Blogs permissions
  {
    resource: "blogs",
    action: "view",
    allowedRoles: ["admin", "center", "branch_admin", "parent"],
  },
  {
    resource: "blogs",
    action: "manage",
    allowedRoles: ["admin", "center"],
  },
];
