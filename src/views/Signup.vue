<template>
  <div class="sign-up container">
    <md-card md-with-hover>
      <md-ripple>
      <md-card-header>
        <h3>Sign Up</h3>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <md-field>
              <label>First Name*</label>
              <md-input v-model="newAdmin.firstname" type="text"></md-input>
          </md-field>
          <md-field>
              <label>Last Name*</label>
              <md-input v-model="newAdmin.lastname" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Email*</label>
            <md-input v-model="newAdmin.email" type="email"></md-input>
          </md-field>
          <md-field>
            <label>Password*</label>
            <md-input v-model="newAdmin.password" type="password"></md-input>
          </md-field>
          <md-button class="md-raised md-primary" @click="register()">REGISTER</md-button>
        </div>
      </md-card-content>
      <md-card-actions>
        <div>
          <span>Go to Login<router-link to="/login">Login</router-link></span>
        </div>
      </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import { db } from '../config/db'

export default {
  name: 'Signup',
  data() {
    return {
      newAdmin: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }
  },
  firebase: {
    admins: db.ref('admins')
  },
  methods: {
    register() {
    firebase.auth().createUserWithEmailAndPassword(this.newAdmin.email, this.newAdmin.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    }).then(() => {
      firebase.auth().onAuthStateChanged(user => {
         db.ref('/admins/'+user.uid).push().set({

             firstname: this.newAdmin.firstname,
              lastname: this.newAdmin.lastname,
              email: this.newAdmin.email
         }).then(()=>{
            this.$router.push({ path: 'home' });
        });
      });  
    });
    }
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-card {
  margin: 0 0 7rem;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.3)
}
.md-card-actions {
  div {
    margin: 0 auto;
  }
}
h3 {
  margin: 20px 0 40px;
  float: left;
}
button {
  width: 100%;
}


</style>
