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

    constructor (props) {
        super(props);
        this.state = {
            index: null,
            data: Object
        };
        
        console.disableYellowBox = true;
        // console.ignoredYellowBox = ['Setting a timer'];

        this.fireBase = firebase.database();
        this.fireStorage = firebase.storage();

    }

    queryData = async(path, orderByPath) => {

        const result = [];

        const baseRef = this.fireBase.ref(path);

        if( orderByPath == undefined || orderByPath == '' ){
            baseRef.orderByKey();
        }else{
            baseRef.orderByChild(orderByPath);
        }

        return baseRef.once('value').then(snapshot => {

            let object = Object.values(snapshot.val());

            object.map((item, index) => {
                result.push(item);
            });
            
        }).then(() => {
            return result;
        })

    }

    queryFileStorage = async(path) => {

        let result = "";

        const ref = this.fireStorage.ref(path);

        return ref.getDownloadURL().then(data => {
            result = data;
            }).then(() => {
                return result;
            }).catch(error => {
                console.log("Exception : " + error.message_)
            })

    }

    queryRealTime = async(path, orderByPath) => {

        const result = [];

        const baseRef = this.fireBase.ref(path);

        if( orderByPath == undefined || orderByPath == '' ){
            baseRef.orderByKey();
        }else{
            baseRef.orderByChild(orderByPath);
        }

        baseRef.on('value', async function(snapshot) {

            let object = Object.values(snapshot.val());

            object.map((item, index) => {
                result.push(item);
            });

        })

    }

}

const helper = new FirebaseHelper();
export default helper;