import React from 'react';
import {Field, Form, Formik} from 'formik';
import {DiagnosisSelection, EntryOption, NumberField, SelectField, TextField} from '../AddPatientModal/FormField';
import {useStateValue} from '../state';
import {Diagnosis, EntryType, HealthCheckRating} from '../types';
import {Button, Grid} from 'semantic-ui-react';

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}

export type EntryFormValues = {
    date: string,
    specialist: string,
    description: string,
    type: EntryType,
    diagnosisCodes: Diagnosis['code'][],
    healthCheckRating: HealthCheckRating,
    employerName: string,
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
    dischargeDate: string;
    dischargeCriteria: string;
};

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({onSubmit, onCancel}) => {
    const [state] = useStateValue();

    const typeOptions: EntryOption[] = [
        {value: EntryType.HealthCheck, label: "Health Check"},
        {value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare"},
        {value: EntryType.Hospital, label: "Hospital"}
    ];


    return (
        <Formik initialValues={{
            date: '',
            specialist: '',
            description: '',
            type: EntryType.HealthCheck,
            diagnosisCodes: [],
            healthCheckRating: 0,
            employerName: '',
            sickLeaveStartDate: '',
            sickLeaveEndDate: '',
            dischargeDate: '',
            dischargeCriteria: '',
        }}
                onSubmit={onSubmit}

                validate={(values => {
                    const requiredError = "Field is required";
                    const invalidDateError = `Invalid date`;
                    const errors: { [field: string]: string } = {};
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if(!isDate(values.date)){
                        errors.date=invalidDateError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.type) {
                        errors.type = requiredError;
                    }
                    if(values.type===EntryType.OccupationalHealthcare && !values.employerName){
                        errors.employerName = requiredError;
                    }
                    if(values.type===EntryType.Hospital && (!values.dischargeDate || !isDate(values.dischargeDate))){
                        errors.dischargeDate = requiredError + " or " + invalidDateError;
                    }
                    if(values.type===EntryType.Hospital && !values.dischargeCriteria){
                        errors.dischargeCriteria = requiredError;
                    }
                    return errors;
                })}
        >
            {
                ({isValid, dirty, setFieldValue, setFieldTouched, values}) => {
                    return (
                        <Form className="form ui">
                            <SelectField
                                name="type"
                                label="Type"
                                options={typeOptions}
                            />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                            />
                            <DiagnosisSelection
                                diagnoses={Object.values(state.diagnosis)}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}/>

                            {
                                values.type === EntryType.HealthCheck
                                && <Field
                                    label="Health Check Rating"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                            }
                            {
                                values.type === EntryType.OccupationalHealthcare
                                && <fieldset className="form-group">
                                    <Field
                                        label="Employer Name"
                                        placeholder="Employer Name"
                                        name="employerName"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Sick leave start date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeaveStartDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Sick leave end date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeaveEndDate"
                                        component={TextField}
                                    />
                                </fieldset>
                            }
                            {// gives me a waring A component is changing a controlled input of type undefined to be uncontrolled on line 156 but i initialized this field ...
                                values.type === EntryType.Hospital
                                && <fieldset className="form-group">
                                    <Field
                                        label="Discharge Date"
                                        placeholder="YYYY-MM-DD"
                                        name="dischargeDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Discharge Criteria"
                                        placeholder="Discharge Criteria"
                                        name="dischargeCriteria"
                                        component={TextField}
                                    />
                                </fieldset>
                            }
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button type="button" onClick={onCancel} color="red">
                                        Cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        floated="right"
                                        color="green"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )
                }
                }
                </Formik>
                )
            }

export default AddEntryForm;