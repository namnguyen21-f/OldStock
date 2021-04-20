import firebase from 'firebase/app';
import "firebase/database";
import {config} from './config';
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const database = firebase.database();

export {database,firebase};