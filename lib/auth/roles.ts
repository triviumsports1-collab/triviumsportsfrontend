export const ROLES = [
  "ATHLETE",
  "CANDIDATE",
  "COACH",
  "EMPLOYER",
  "CLUB_DIRECTOR",
  "CLUB_BILLING",
  "TRIVIUM_OPS",
  "TRIVIUM_FINANCE",
  "ADMIN",
  "PLATFORM_ADMIN",
  "SUPER_ADMIN",
] as const;

export type Role = (typeof ROLES)[number];

export const CLUB_ROLES: readonly Role[] = ["EMPLOYER", "CLUB_DIRECTOR", "CLUB_BILLING"];
export const OPS_ROLES: readonly Role[] = ["TRIVIUM_OPS", "ADMIN", "PLATFORM_ADMIN", "SUPER_ADMIN"];
export const FINANCE_ROLES: readonly Role[] = ["TRIVIUM_FINANCE", "SUPER_ADMIN"];
export const FORM_ADMIN_ROLES: readonly Role[] = ["SUPER_ADMIN"];

export function homeForRole(role: Role): string {
  switch (role) {
    case "COACH":
      return "/dashboard/coach";
    case "EMPLOYER":
    case "CLUB_DIRECTOR":
    case "CLUB_BILLING":
      return "/dashboard/club";
    case "TRIVIUM_FINANCE":
      return "/dashboard/finance";
    case "SUPER_ADMIN":
      return "/dashboard/ops";
    case "TRIVIUM_OPS":
    case "ADMIN":
    case "PLATFORM_ADMIN":
      return "/dashboard/ops";
    case "ATHLETE":
    case "CANDIDATE":
    default:
      return "/dashboard/athlete";
  }
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
