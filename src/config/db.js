import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAZEif6F0yz1Fyg4G5mqj_MYDF1_71kN2E",
    authDomain: "expense-tracker-b673c.firebaseapp.com",
    databaseURL: "https://expense-tracker-b673c.firebaseio.com",
    projectId: "expense-tracker-b673c",
    storageBucket: "expense-tracker-b673c.appspot.com",
    messagingSenderId: "931046277207"
  };

  let app = Firebase.initializeApp(config)
  export const db = app.database()