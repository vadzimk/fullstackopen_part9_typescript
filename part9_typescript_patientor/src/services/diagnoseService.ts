import diagnoseData from '../../data/diagnoses.json';
import {Diagnosis} from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData as Diagnosis[];

const getDiagnoses = (): Array<Diagnosis> => diagnoses;

export default {getDiagnoses}