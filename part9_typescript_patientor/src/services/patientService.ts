import patientData from '../../data/patients'
import {Patient, PublicPatient, NewPatient, Entry, NewEntry} from '../types';

let patients: Array<Patient> = patientData as Patient[];

const generateId = (): string => {
    return Math.ceil(Math.random() * 100000000000000).toString();
}

const getPatientNonSensitiveData = (): Array<PublicPatient> =>
    patients.map(({id, name, dateOfBirth, gender, occupation}): PublicPatient => ({
            id, name, dateOfBirth, gender, occupation, entries: []

        })
    );

const addPatient = (entry: NewPatient): Patient => {
    const id = generateId();
    const newEntry = {
        ...entry,
        id,
        entries: []
    }
    patients.push(newEntry);
    return newEntry;
}


const findOneEntry = (id: string): Patient => {

    const match: Patient | undefined = patients.find(p => p.id === id);
    if (!match) {
        throw new Error(`Not found id: ${id}`);
    }

    return match;
}

const addEntry = (id: string, newEntry: NewEntry): Entry => {
    const match = patients.find(p => p.id === id);
    // update the patient with thee new entyr and return the entry with id
    if (!match) {
        throw new Error(`Not found id ${id}`);
    }
    const entry = {id: generateId(), ...newEntry}
    match.entries.push(entry);
    patients = patients.map(p => p.id === id ? match : p);

    return entry;
}

export default {
    getPatientNonSensitiveData,
    addPatient,
    findOneEntry,
    addEntry
}
