import {
    NewPatient,
    Gender,
    Patient,
    PublicPatient,
    BaseEntry,
    HealthCheckRating,
    Diagnosis,
    NewEntry,
} from './types';

export const isString = (text: any): text is string => { // type guard
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}

const isSSN = (param: any): boolean => {
    return isString(param) && param.length < 12 && param.length >= 10;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

export const isPublicPatient = (param: Patient): param is PublicPatient => {
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
    return param.toString();
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

const parseStingField = (param: any, paramName: string): string => {
    if (!param || !isString(param)) {
        throw new Error(`Icorrect or missing ${paramName}: ${param}`);
    }
    return param;
}


const parseDiagnosisCodes = (param: any): Diagnosis['code'][] | undefined => {
    if (!param) {
        return undefined;
    }
    if (!Array.isArray(param)) {
        throw new Error(`Incorrect diagnosis codes data type: Expected string[] got ${typeof param}: ${param}`);
    }
    param.forEach(item => {
        if (!isString(item)) {
            throw new Error(`Incorrect diagnosis codes data type: Expected string[] got ${typeof item}[]: ${param}`);
        }
    })
    return param;
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (param: any): HealthCheckRating => {
    if (param === undefined || !isHealthCheckRating(param)) {
        throw new Error(`Incorrect or missing healthCheckRating: ${param}`);
    }
    return param;
}

const parseSickLeave = (param: any): { startDate: string, endDate: string } | undefined => {
    if (!param) {
        return undefined;
    }
    if (!param.startDate || !param.endDate || !isDate(param.startDate) || !isDate(param.endDate)) {
        throw new Error(`Icorrect seakLeave format expected {startDate, endDate}, got ${param}`);
    }
    return param;

}

const parseDischarge = (param: any): { date: string, criteria: string } => {
    if (!param || !param.date || !param.criteria || !isDate(param.date) || !isString(param.criteria)) {
        throw new Error(`Incorrect or missing discharge: ${param}`);
    }
    return param;
}

export const toNewEntry = (body: any): NewEntry => {

    const type = parseStingField(body.type, 'type');
    const description = parseStingField(body.description, 'description');
    const date = parseDate(body.date);
    const specialist = parseStingField(body.specialist, 'specialist');
    const diagnosisCodes = parseDiagnosisCodes(body.diagnosisCodes);

    let baseEntry: Omit<BaseEntry, 'id'> = {
        description,
        date,
        specialist,
    }

    if (diagnosisCodes) {
        baseEntry.diagnosisCodes = diagnosisCodes;
    }

    switch (type) {
        case "HealthCheck":
            return {
                ...baseEntry,
                type,
                healthCheckRating: parseHealthCheckRating(body.healthCheckRating),
            };
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type,
                employerName: parseStingField(body.employerName, 'employerName'),
                sickLeave: parseSickLeave(body.sickLeave),
            };
        case "Hospital":
            return {
                type,
                ...baseEntry,
                discharge: parseDischarge(body.discharge)
            };
        default:
            throw new Error(`Unknown Entry type ${type}`);
    }
}
