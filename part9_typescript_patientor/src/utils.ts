import {NewPatient, Gender, Patient, PublicPatient} from './types';

export const isString = (text: any): text is string => { // type guard
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}

const isSSN = (param: any): boolean => {
    return isString(param) && param.length < 12 && param.length>=10;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

export const isPublicPatient = (param: Patient): param is PublicPatient=>{
    return !Object.keys(param).includes('ssn');
}

const parseName = (param: any): string => {
    if (!param || !isString(param)) {
        throw new Error(`Incorrect or missing name: ${param}`);
    }
    return param;
}

const parseDate = (param: any): string => {
    if (!param || !isDate(param)) {
        throw new Error(`Incorrect or missing date: ${param}`);
    }
    return param;
}

const parseSSN = (param: any): string => {
    if (!param || !isSSN(param)) {
        throw new Error(`Incorrect or missing SSN: ${param}`);
    }
    return param;
}

const parseGender = (param: any): Gender => {
    if (!param || !isGender(param)) {
        throw new Error(`Incorrect or missing gender: ${param}`);
    }
    return param;
}

const parseOccupation = (param: any): string => {
    if (!param || !isString(param)) {
        throw new Error(`Invalid or missing occupation: ${param}`);
    }
    return param;
}
export const toNewPatientEntry = (body: any): NewPatient => {
    return {
        name: parseName(body.name),
        dateOfBirth: parseDate(body.dateOfBirth),
        ssn: parseSSN(body.ssn),
        gender: parseGender(body.gender),
        occupation: parseOccupation(body.occupation),
    };
}

