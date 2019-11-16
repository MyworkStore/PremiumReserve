import * as firebase from 'firebase';
import React from 'react';

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

    constructor(props) {
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

    queryData = async (path, orderByPath) => {

        const result = [];

        const baseRef = this.fireBase.ref(path);

        if (orderByPath != undefined || orderByPath != '') {
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
    // tb_
    //key  
    writeUserData(node, key, obj) {
        return (firebase.database().ref(node).child(key).update(obj));
    }

    updateData(node, key, data) {
        //console.log(node);
        //console.log(key);
        //console.log(data);
        //firebase.database().ref(node).child(key).update(data)
        return new Promise(resolve => {
            resolve(firebase.database().ref(node).child(key).update(data))
        })
    }

    listenerData(node, callback) {
        return firebase.database().ref(node).on('value', snap => callback(snap))
    }
    queryDataObj = async (path) => {

        let result = '';
        const baseRef = this.fireBase.ref(path);
        await baseRef.once('value').then(snapshot => {
            //console.log("XXXXXXXXXXXXXXXXXXXXXXXX"); 
            //  console.log(snapshot.val());           
            //Object.assign(result, snapshot.val().product_code) 
            result = snapshot.val();
            // console.log("1YYYYYYYYYYYYYYYYYYYYYYYYYY"); 
            //   console.log(result);
            //  console.log("2YYYYYYYYYYYYYYYYYYYYYYYYYY");
        });
        //console.log("3YYYYYYYYYYYYYYYYYYYYYYYYYY"); 
        //console.log(result);
        //console.log("4YYYYYYYYYYYYYYYYYYYYYYYYYY"); 
        return result;

    }
    existsDoc= async (path,node)=>{
        //alert("xxxxxxxxxxxxxxxxxxxxxxxxx");
        let result ={
            review:0
        };
        //return result;
        // console.log(path);
        const baseRef = this.fireBase.ref(path);
        await baseRef.once('value', snapshot => {
            //console.log(snapshot);
            if(snapshot.hasChild(node)) {   
                            
                result={
                    review:0
                };
                //alert(result.review);
              
            } else {            
                result={
                    review:1
                };
                //alert(result.review);
           
            }
          });

          return result

       
    }

    queryDataObjII = (path) => {
        //alert('xxxxx');
        return this.fireBase.ref(path).once('value')
    }

    queryFileStorage = async (path) => {

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

    queryRealTime = async (path, orderByPath) => {

        const result = [];

        const baseRef = this.fireBase.ref(path);

        if (orderByPath == undefined || orderByPath == '') {
            baseRef.orderByKey();
        } else {
            baseRef.orderByChild(orderByPath);
        }

        baseRef.on('value', async function (snapshot) {

            let object = Object.values(snapshot.val());

            object.map((item, index) => {
                result.push(item);
            });

        })

    }
    async uploadImageAllmem(key, uri) {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("allmembarcode/" + key);
        return Promise.resolve(ref.put(blob))
    }

}

const helper = new FirebaseHelper();
export default helper;