import type { Role } from "@/lib/auth/roles";

export type Me = {
  publicId: string;
  email: string;
  role: Role;
  status: string;
  emailVerified: boolean;
  mfaRequired: boolean;
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  verificationStatus?: string;
};

export type JobPosting = {
  id: string;
  organizationId: string;
  slug: string;
  title: string;
  description: string;
  sport: string | null;
  roleType: "PLAYER_TRIAL" | "PLAYER_SEASON" | "COACH_STAFF" | "OTHER" | string;
  city: string | null;
  state: string | null;
  remoteFlag: boolean;
  compensationNotes: string | null;
  visaStance: string;
  startsOn: string | null;
  applyBy: string | null;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED" | string;
  publishedAt: string | null;
  metadata: Record<string, unknown> | null;
};

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
};

export type OpsPlacement = {
  id: string;
  organizationId: string;
  coachUserId: string;
  jobId: string | null;
  status: string;
  startsOn: string | null;
  endsOn: string | null;
};

export type Placement = {
  id: string;
  organizationId: string;
  coachUserId: string;
  billRate?: number;
  payRate?: number;
};

export type Timesheet = {
  id: string;
  organizationId: string;
  placementId: string | null;
  coachUserId: string;
  shiftId: string | null;
  periodStart: string;
  periodEnd: string;
  minutesWorked: number;
  notes: string | null;
  rejectionReason: string | null;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "LOCKED";
};

export type Shift = {
  id: string;
  organizationId: string;
  coachUserId: string;
  location: string | null;
  activityType: string | null;
  startsAt: string;
  endsAt: string;
  status: "SCHEDULED" | "CANCELLED";
};

export type Invoice = {
  id: string;
  organizationId: string;
  status: "DRAFT" | "ISSUED" | "PAID" | "PAST_DUE" | "VOID";
  currency: string;
  totalCents: number;
  periodStart: string;
  periodEnd: string;
};

export type VisaPathway = "F_1" | "OPT" | "O_1" | "P_1";

export type OpsSummary = {
  activeJobs: number;
  totalPlacements: number;
  pendingTimesheets: number;
  complianceAlerts: number;
  newLeads: number;
  disclaimer: string;
};

export type OpsLead = {
  id: string;
  audience: "COACH" | "CLUB" | "PLAYER" | string;
  slug: string;
  status: "NEW" | "REVIEWING" | "CLOSED" | string;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  payload: Record<string, unknown>;
};

export type ApplicationStage =
  | "APPLIED"
  | "PHONE_SCREEN"
  | "INTERVIEW"
  | "BACKGROUND_CHECK"
  | "OFFER"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN";

export type OpsApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  organizationId: string | null;
  organizationName: string;
  applicantUserId: string | null;
  displayName: string | null;
  email: string | null;
  status: string;
  createdAt: string;
};

export type PipelineApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  organizationId: string | null;
  organizationName: string;
  applicantUserId: string | null;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  status: ApplicationStage | string;
  averageScore: number | null;
  createdAt: string;
};

export type PipelineStageEvent = {
  id: string;
  fromStatus: ApplicationStage | string | null;
  toStatus: ApplicationStage | string;
  actorUserId: string | null;
  createdAt: string;
};

export type PipelineNote = {
  id: string;
  authorUserId: string;
  body: string;
  createdAt: string;
};

export type PipelineRating = {
  id: string;
  raterUserId: string;
  score: number;
  updatedAt: string;
};

export type PipelineApplicationDetail = PipelineApplication & {
  experience: string | null;
  coverLetter: string | null;
  resumeDownloadUrl: string | null;
  resumeExpiresAt: string | null;
  history: PipelineStageEvent[];
  notes: PipelineNote[];
  ratings: PipelineRating[];
};

export type OpsVisaRow = {
  userId: string;
  email: string;
  currentStatus: VisaPathway | null;
  targetPathway: VisaPathway | null;
  workAuthorizedNow: boolean;
  statusExpiresOn: string | null;
  eadExpiresOn: string | null;
  passportExpiresOn: string | null;
  alert: boolean;
  disclaimer: string;
};

export type OpsDirectory = {
  coaches: Array<{
    id: string;
    email: string;
    role: Role;
    status: string;
    createdAt: string;
  }>;
  clubs: Array<{
    id: string;
    name: string;
    slug: string;
    city: string | null;
    state: string | null;
    verificationStatus: string;
    contactEmail: string | null;
  }>;
};

export type VisaSnapshot = {
  userId: string;
  currentStatus: VisaPathway | null;
  targetPathway: VisaPathway | null;
  workAuthorizedNow: boolean;
  counselEngaged: boolean;
  shareWithClubs: boolean;
  statusStartsOn: string | null;
  statusExpiresOn: string | null;
  eadExpiresOn: string | null;
  passportExpiresOn: string | null;
  petitionStage: string | null;
  notes: string | null;
  disclaimer: string;
};

export type JsonSchema = {
  type?: string;
  title?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: Array<string | number>;
  format?: string;
};

export type FormDefinition = {
  id: string;
  slug: string;
  version: number;
  status: "DRAFT" | "PUBLISHED" | "RETIRED";
  schemaJson: JsonSchema;
};

export type PayrollRun = {
  id: string;
  invoiceId: string;
  organizationId: string;
  status: "PENDING" | "PROCESSED" | "FAILED";
  liveMoneyEnabled: boolean;
  totalPayCents: number;
  currency: string;
};

export type AuthSessionBody = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  role: Role;
  publicId: string;
};
