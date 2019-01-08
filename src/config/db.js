import Firebase from 'firebase'

let config = {
   
  };

  let app = Firebase.initializeApp(config)
  export const db = app.database()
