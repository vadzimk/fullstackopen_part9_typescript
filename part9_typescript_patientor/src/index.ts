import express from 'express';
import patientRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter)

let pingCount: number = 0
app.get('/api/ping', (_req, res) => {
    pingCount++;
    console.log(`pinged${pingCount}`);
    res.send("pong");
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});