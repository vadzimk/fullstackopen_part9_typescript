import express from 'express';
import diagnoseService from './services/diagnoseService';
const app = express();
app.use(express.json());

let pingCount: number = 0
app.get('/api/ping', (_req, res) => {
    pingCount++;
    console.log(`pinged${pingCount}`);
    res.send("pong");
});

app.get('/api/diagnoses', (_req, res)=>{
    res.send(diagnoseService.getDiagnoses())
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});