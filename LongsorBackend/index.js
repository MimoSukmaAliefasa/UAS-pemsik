import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/authController.js';
import { addReport, getReports, deleteReport, updateReport } from './controllers/reportController.js';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signin', signIn);
app.post('/signup', signUp);
app.post('/report', addReport);
app.get('/report', getReports);
app.delete('/report/:reportId', deleteReport);
app.put('/report', updateReport);

const PORT = 3000;
app.listen(PORT, console.log(`listening on  https://localhost:${PORT}`));