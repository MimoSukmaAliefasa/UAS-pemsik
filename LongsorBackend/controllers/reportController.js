import { getDocs, addDoc, collection, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';


export const addReport = async (req, res, next) => {
    try {
        const report = req.body;
        const docRef = await addDoc(collection(db, 'report'), report);
        res.status(201).send({ message: 'Report added successfully', reportId: docRef.id });
    } catch (error) {
        console.error('Error in addReport:', error);
        res.status(400).send(error.message);
    }
};

export const getReports = async (req, res, next) => {
    try {
        const q = query(collection(db, 'report'));
        const querySnapshot = await getDocs(q);
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).send(reports);
    } catch (error) {
        console.error('Error in getReports:', error);
        res.status(400).send(error.message);
    }
};

export const updateReport = async (req, res, next) => {
    try {
        const { reportId, report } = req.body;
        await updateDoc(doc(db, 'report', reportId), report);
        res.status(200).send({ message: 'Report updated successfully' });
    } catch (error) {
        console.error('Error in editReport:', error);
        res.status(400).send(error.message);
    }
};

export const deleteReport = async (req, res, next) => {
    try {
        const { reportId } = req.params;
        await deleteDoc(doc(db, 'report', reportId));
        res.status(200).send({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error in deleteReport:', error);
        res.status(400).send(error.message);
    }
};