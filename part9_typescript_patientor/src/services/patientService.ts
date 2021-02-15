import patientData from '../../data/patients.json'
import {Patient, NonSensitivePatientEntry, NewPatient} from '../types';

const patients: Array<Patient> = patientData as Patient[];


const getPatientNonSensitiveData = (): Array<NonSensitivePatientEntry> =>
    patients.map(({id, name, dateOfBirth, gender, occupation}): NonSensitivePatientEntry => ({
           id, name, dateOfBirth, gender, occupation

        })
    );

const addPatient=(entry: NewPatient): Patient=>{
    const id = Math.ceil(Math.random()*100000000000000).toString();
    const newEntry = {
        ...entry,
        id
    }
    patientData.push(newEntry);
    return newEntry;
}


export default {
    getPatientNonSensitiveData,
    addPatient,
}