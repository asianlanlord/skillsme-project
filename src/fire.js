 import firebase from 'firebase';
 
 var firebaseConfig = {
    apiKey: "AIzaSyDoreSE0JI-FMSQzSViaqzRW_hrP1Kqcuc",
    authDomain: "skillsme-forum.firebaseapp.com",
    projectId: "skillsme-forum",
    storageBucket: "skillsme-forum.appspot.com",
    messagingSenderId: "1069490451757",
    appId: "1:1069490451757:web:fbd3316fe6d348b3284fa4",
    measurementId: "G-Q558E55DND"
  };


  const fire = firebase.initializeApp(firebaseConfig)

export default fire;