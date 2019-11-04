import * as firebase from 'firebase';
import React from 'react';
import QueryString from 'qs';

const firebaseConfig = {
    apiKey: "AIzaSyB6rhiakZ8JzVhAm9EXbG42hcpDEtuEg5E",
    authDomain: "allpremium-8a053.firebaseapp.com",
    databaseURL: "https://allpremium-8a053.firebaseio.com",
    projectId: "allpremium-8a053",
    storageBucket: "allpremium-8a053.appspot.com",
    messagingSenderId: "738447525141",
    appId: "1:738447525141:web:c91ec5e2459226255d951c",
    measurementId: "G-QGJN8CM0NC"
};

firebase.initializeApp(firebaseConfig);

class FirebaseHelper extends React.Component {

    state = {
        index: null,
        data: Object
    }

    readUserData=async(table)=>{

        const result = [];

        return firebase.database().ref(''+table+'/').once('value').then((snapshot) => {
            result.push(snapshot.val());
        }).then(() => {
            return result
        })

    }

}

const helper = new FirebaseHelper();
export default helper;