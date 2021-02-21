import {State} from "./state";
import {Diagnosis, Patient} from "../types";

export type Action =
    | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
}
    | {
    type: "ADD_PATIENT";
    payload: Patient;
}
    | {
    type: "SET_PATIENT";
    payload: Patient;
}
|{
    type:"SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}), //computed property name
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnosis: {
                    ...state.diagnosis,
                    ...action.payload.reduce(
                        (acc, diagnosis)=>({...acc, [diagnosis.code]: diagnosis }), {}
                    )
                }
            }
        default:
            return state;
    }
};


export const setPatientList = (patientListFromApi: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientListFromApi
    };
}

export const addPatient = (newPatient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: newPatient
    };
}

export const setPatient = (patientData: Patient): Action => {
    return {
        type: 'SET_PATIENT',
        payload: patientData
    };
}

export const setDiagnosisList=(diagnosisListFromApi: Diagnosis[]): Action=>{
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisListFromApi
    };
}