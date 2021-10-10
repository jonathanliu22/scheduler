import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBBaKwFUWXTUItj7biPqcJKpr5FmGLZa6I",
    authDomain: "scheduler-23c60.firebaseapp.com",
    databaseURL: "https://scheduler-23c60-default-rtdb.firebaseio.com",
    projectId: "scheduler-23c60",
    storageBucket: "scheduler-23c60.appspot.com",
    messagingSenderId: "460598380912",
    appId: "1:460598380912:web:3e05c1a5db0adc84b8e7b5",
    measurementId: "G-WWY7MPM8X8"
};
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
const [data, setData] = useState();
const [loading, setLoading] = useState(true);
const [error, setError] = useState();

useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
    const val = snapshot.val();
    if (devMode) { console.log(val); }
    setData(transform ? transform(val) : val);
    setLoading(false);
    setError(null);
    }, (error) => {
    setData(null);
    setLoading(false);
    setError(error);
    });
}, [path, transform]);

return [data, loading, error];
};
  
