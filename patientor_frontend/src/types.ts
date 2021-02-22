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

export enum EntryType{
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital',
}

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
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry{
    type: EntryType.OccupationalHealthcare,
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string,
    }
}

interface HospitalEntry extends BaseEntry{
    type: EntryType.Hospital,
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
export const isPublicPatient = (param: Patient): param is PublicPatient => {
    if (!param) {
        throw new Error(`Invalid isPublicPatient param: ${param}`);
    }
    return !Object.keys(param).includes('ssn');
}

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type NewEntry = DistributiveOmit<Entry, 'id'>