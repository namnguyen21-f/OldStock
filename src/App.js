import React,{useState,useEffect} from 'react';
import Homepage from './pages/Homepage';
import {FirebaseDatabaseProvider,FirebaseDatabaseNode} from '@react-firebase/database';
import './App.scss'
import {database,firebase} from "./firebaseConfig"



const App = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        //writeUserData();
    })
    return (
        <FirebaseDatabaseProvider>
            <Homepage></Homepage>
        </FirebaseDatabaseProvider>   
    )
}


export default App;