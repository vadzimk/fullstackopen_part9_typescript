export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

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