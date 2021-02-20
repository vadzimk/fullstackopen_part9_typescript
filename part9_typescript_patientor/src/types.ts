export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// export type Gender = "male" | "female";
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

interface BaseEntry{
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][]; // array of code parameter of Diagnosis interface
}

export enum HealthCheckRating{
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3
}

interface HealthCheckEntry  extends BaseEntry{
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry{
    type: "OccupationalHealthcare",
    employerName: string,
    description: string,
    sickLeave?: {
        startDate: string,
        endDate: string,
    }
}

interface HospitalEntry extends BaseEntry{
    type: "Hospital",
    discharge: {
        date: string,
        criteria: string
    }
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'|'entries'>;