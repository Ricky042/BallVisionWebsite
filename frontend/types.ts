
export enum OnboardingPhase {
  IDENTITY = 'IDENTITY',
  ORGANIZATION = 'ORGANIZATION',
  SECURITY = 'SECURITY',
  COMPLETE = 'COMPLETE'
}

export enum UserRole {
  SCOUT = 'SCOUT',
  COACH = 'COACH',
  PLAYER = 'PLAYER'
}

export interface SignupState {
  firstName: string;
  lastName: string;
  role: UserRole;
  orgName: string;
  region: string;
  email: string;
  password?: string;
}

export type View = 'SIGNUP' | 'LOGIN' | 'DASHBOARD';
