import React from "react";
import { Resource, Action } from "@/lib/permissions/types";
import { UserRole as Role } from "@/store/authStore";
import { usePermissions } from "@/hooks/usePermissions";

interface WithPermissionProps {
  user: {
    role: Role;
    centerId?: string;
    branchId?: string;
  };
  action: Action;
  resource: Resource;
  centerId?: string;
  branchId?: string;
  fallback?: React.ReactNode;
}

export const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return ({
    user,
    action,
    resource,
    centerId,
    branchId,
    fallback = null,
    ...props
  }: WithPermissionProps & P) => {
    const { can } = usePermissions();

    const hasPermission = can(action, resource, branchId);

    if (!hasPermission) {
      return <>{fallback}</>;
    }

    return <WrappedComponent {...(props as P)} />;
  };
};
