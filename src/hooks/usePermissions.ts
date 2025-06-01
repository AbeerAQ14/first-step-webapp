import { useCallback } from "react";
import { Role, Resource, Action } from "@/lib/permissions/types";
import { permissions } from "@/lib/permissions/permissions";

interface User {
  role: Role;
  centerId?: string;
  branchId?: string;
}

export const usePermissions = (user: User) => {
  const can = useCallback(
    (
      action: Action,
      resource: Resource,
      centerId?: string,
      branchId?: string
    ) => {
      const permission = permissions.find(
        (p) => p.resource === resource && p.action === action
      );

      if (!permission) return false;

      // Check if user's role is allowed
      if (!permission.allowedRoles.includes(user.role)) {
        return false;
      }

      // Check center-specific permissions
      if (permission.centerSpecific && centerId && user.centerId) {
        if (centerId !== user.centerId) {
          return false;
        }
      }

      // Check branch-specific permissions
      if (permission.branchSpecific && branchId && user.branchId) {
        if (branchId !== user.branchId) {
          return false;
        }
      }

      return true;
    },
    [user]
  );

  return { can };
};
