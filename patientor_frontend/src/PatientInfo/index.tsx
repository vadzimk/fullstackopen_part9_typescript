import React, {useEffect} from 'react';
import {Entry, EntryType, isPublicPatient, NewEntry, Patient} from '../types';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {addEntryToPatient, setPatient, useStateValue} from '../state';
import {Button, Icon} from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import {EntryFormValues} from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';



const PatientInfo: React.FC<{ id: string }> = ({id}) => {
    const [state, dispatch] = useStateValue();
    const patient = state.patients[id];

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        let valuesToSubmit: NewEntry;
        switch (values.type) {
            case EntryType.OccupationalHealthcare: {
                const sickLeave = {
                    startDate: values.sickLeaveStartDate,
                    endDate: values.sickLeaveEndDate
                };
                delete values.sickLeaveStartDate;
                delete values.sickLeaveEndDate;
                valuesToSubmit = {
                    ...values,
                    sickLeave
                } as NewEntry;
                break;
            }
            case EntryType.HealthCheck: {
                valuesToSubmit = values as NewEntry;
                break;
            }
            case EntryType.Hospital: {
                const discharge = {
                    date: values.dischargeDate,
                    criteria: values.dischargeCriteria,
                }
                delete values.dischargeDate;
                delete values.dischargeCriteria;
                valuesToSubmit = {
                    ...values,
                    discharge
                } as NewEntry;
                break
            }
            default:
                throw new Error(`Invalid entry type ${values.type}`);
        }

        try {
            const {data: newEntry} = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                valuesToSubmit
            );
            dispatch(addEntryToPatient(id, newEntry));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };


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
        <div className="App">
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
                    <EntryDetails key={ent.id} entry={ent}/>
                )}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};


export default PatientInfo;