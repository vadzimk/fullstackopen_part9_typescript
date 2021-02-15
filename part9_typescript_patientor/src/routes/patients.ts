import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry} from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.json(patientService.getPatientNonSensitiveData());
});

patientRouter.post('/',
    (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

        res.json(addedPatient);
    });


export default patientRouter;