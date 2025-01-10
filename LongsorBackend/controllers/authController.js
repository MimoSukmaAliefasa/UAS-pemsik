import { getDocs, addDoc, collection, query, where } from 'firebase/firestore';
import jwt from 'jsonwebtoken';  // Import JWT
import { db } from '../firebase/config.js';

// Secret key untuk JWT (buatlah yang cukup kompleks dan jangan di hardcode dalam kode produksi)
const JWT_SECRET_KEY = 'DWGDEGDEGDEDEWWW22227277sfsafsafwfws222222'; // Pastikan untuk mengganti dengan key yang lebih aman

// Fungsi untuk membuat token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '24h' });  // Token expired dalam 1 jam
};

// SignUp - Register User
export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Cek apakah email sudah ada di Firestore
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(400).send('Email already exists');
    }

    // Menambahkan data pengguna ke Firestore
    const docRef = await addDoc(collection(db, 'user'), { name, email, password });

    // Membuat token untuk pengguna baru
    const token = generateToken(docRef.id);  // ID dokumen Firestore sebagai userId

    res.status(201).send({
      message: 'User created successfully',
      user: { name, email },
      token: token,  // Kirimkan token JWT
    });
  } catch (error) {
    console.error('Error in signUp:', error);
    res.status(400).send(error.message);
  }
};

// SignIn - Login User
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Mencari pengguna berdasarkan email
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(400).send('Invalid email or password');
    }

    const user = querySnapshot.docs[0].data();

    // Cek apakah password cocok
    if (user.password !== password) {
      return res.status(400).send('Invalid email or password');
    }

    // Membuat token untuk pengguna yang berhasil login
    const token = generateToken(querySnapshot.docs[0].id);  // Menggunakan Firestore ID sebagai userId
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password; 

    res.status(200).send({
      message: 'Login successful',
      user: userWithoutPassword,
      token: token,  // Kirimkan token JWT
    });
  } catch (error) {
    console.error('Error in signIn:', error);
    res.status(400).send(error.message);
  }
};
