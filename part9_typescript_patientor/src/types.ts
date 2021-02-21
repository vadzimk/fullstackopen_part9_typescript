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

export interface BaseEntry{
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
// export type NewEntry = Omit<Entry, 'id'>

// type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
// export type NewEntry = DistributiveOmit<Entry, 'id'>

type RemoveIdField<T>={
    [K in keyof T as Exclude<K, 'id'>]:T[K];
}

export type NewEntry = RemoveIdField<Entry>;