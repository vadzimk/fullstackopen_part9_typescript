import patientData from '../../data/patients'
import {Patient, PublicPatient, NewPatient} from '../types';

const patients: Array<Patient> = patientData as Patient[];



const getPatientNonSensitiveData = (): Array<PublicPatient> =>
    patients.map(({id, name, dateOfBirth, gender, occupation}): PublicPatient => ({
           id, name, dateOfBirth, gender, occupation, entries:[]

        })
    );

const addPatient=(entry: NewPatient): Patient=>{
    const id = Math.ceil(Math.random()*100000000000000).toString();
    const newEntry = {
        ...entry,
        id,
        entries: []
    }
     patients.push(newEntry);
    return newEntry;
}


const findOneEntry=(id: string): Patient =>{

    const matches: Patient[] = patients.filter(p=>p.id===id);
    if(matches.length===0){
        throw new Error(`Not found id: ${id}`);
    }
    return matches[0];
}

export default {
    getPatientNonSensitiveData,
    addPatient,
    findOneEntry
}
