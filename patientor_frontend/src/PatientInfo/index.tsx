import React, {useEffect} from 'react';
import {Patient, isPublicPatient} from '../types';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {setPatient, useStateValue} from '../state';
import {Icon} from 'semantic-ui-react';


const PatientInfo: React.FC<{ id: string }> = ({id}) => {
    const [state, dispatch] = useStateValue();
    const patient = state.patients[id];

    const patientAlreadyInState = (patient: Patient): boolean => {
        return !isPublicPatient(patient);
    }

    useEffect(() => {
        const fetchPatientData = async (id: string): Promise<void> => {
            try {
                const {data: patientData} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientData));
            } catch (e) {
                console.error(e);
            }
        };

        if (patient && !patientAlreadyInState(patient)) {
            fetchPatientData(id);
        }
    }, [dispatch, id, patient])

    if (!patient) {
        return null;
    }

    return (
        <div>
            <h3>{patient.name}
                <Icon
                    name={patient.gender.toLowerCase() === 'male'
                        ? "mars"
                        : (patient.gender.toLowerCase() === 'female' ? "venus" : "genderless")}/>
            </h3>
            <div>ssn: {"ssn" in patient && patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>entries</h3>
            <div>
                {patient.entries.map(ent =>
                    <div key={ent.id}>
                        <p>{ent.date} {ent.description}</p>
                        <ul>
                            {ent.diagnosisCodes?.map(code =>
                                <li key={code}>{code}</li>
                            )}
                        </ul>
                    </div>)}
            </div>
        </div>
    );
};


export default PatientInfo;