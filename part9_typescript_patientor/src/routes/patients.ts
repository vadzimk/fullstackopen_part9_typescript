import express from 'express';
import patientService from '../services/patientService';
import {isString, toNewPatientEntry} from '../utils';

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

const parseId = (id: any): string => {
    if (!id || !isString(id)) {
        throw new Error(`Invalid id: ${id}`);
    }
    return id;
}
patientRouter.get('/:id',
    (req, res) => {
        try {
            const patientEntry = patientService.findOneEntry(parseId(req.params.id));
            res.json({...patientEntry, entries:[]});
        } catch (e) {
            res.send(e.message)
        }

    })


export default patientRouter;