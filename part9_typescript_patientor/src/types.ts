export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

// export type Gender = "male" | "female";
export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{

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