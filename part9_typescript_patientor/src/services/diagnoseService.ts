import diagnoseData from '../../data/diagnoses.json';
import {Diagnose} from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Diagnose[];

const getDiagnoses = (): Array<Diagnose> => diagnoses;

export default {getDiagnoses}