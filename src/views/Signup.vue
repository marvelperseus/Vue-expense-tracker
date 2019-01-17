<template>
  <div class="signup container">
    <md-card md-with-hover>
      <md-ripple>
      <md-card-header>
        <h3>Sign Up</h3>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <md-field>
              <label>First Name</label>
              <md-input v-model="newAdmin.firstname" @blur="validate()" @input="validate()" @touchstart="touched = true" name="eamil" type="text" required></md-input>  
          </md-field>
          <div class="wrap">
          <small v-show="(dirty || touched) && firstinValid" class="alert alert-danger">First Name is required(minimum 2 characters)</small>
          </div>
          <md-field>
              <label>Last Name</label>
              <md-input v-model="newAdmin.lastname" type="text" @blur="validate1()" @input="validate1()" @touchstart="touched = true" required></md-input>
          </md-field>
           <div class="wrap">
          <small v-show="(dirty || touched) && lastinValid" class="alert alert-danger">Last Name is required(minimum 3 characters)</small>
          </div>
          <md-field>
            <label>Email</label>
            <md-input v-model="newAdmin.email" type="email" @blur="validate2()" @input="validate2()" @touchstart="touched = true" required></md-input>
          </md-field>
           <div class="wrap">
          <small v-show="(dirty || touched) && emailinValid" class="alert alert-danger">Valid email is required</small>
          </div>
          <md-field>
            <label>Password</label>
            <md-input v-model="newAdmin.password" type="password" @blur="validate3()" @input="validate3()" @touchstart="touched = true" required></md-input>
          </md-field>
           <div class="wrap">
          <small v-show="(dirty || touched) && passinValid" class="alert alert-danger">Password length must be 6 characters</small>
          </div>
          <md-button class="md-raised md-primary" @click="register()" :disabled="(!newAdmin.firstname || !newAdmin.lastname ||!newAdmin.email || !newAdmin.password)">REGISTER</md-button>
        </div>
      </md-card-content>
      <md-card-actions>
        <div>
          <span>Go to Login <router-link to="/login">Login</router-link></span>
        </div>
      </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script lang="js">
import firebase from 'firebase';
import { db } from '../config/db'

export default {
  name: 'Signup',
  data() {
    return {
      dirty: false,
      touched: false,
      firstinValid: false,
      lastinValid: false,
      emailinValid: false,
      passinValid: false,
      newAdmin: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }
  },firebase: {
    admins: db.ref('admins')
  },
  methods: {
     validate () {
      if((this.newAdmin.firstname).length<2){
        this.firstinValid = true
        this.dirty = true
      }else if (this.newAdmin.firstname == '') {
        this.firstinValid = true
        this.dirty = true
      }else{
        this.firstinValid = false
        this.dirty = false
        this.touched = false
      }
    },
     validate1 () {
       if((this.newAdmin.lastname).length<2){
        this.lastinValid = true
        this.dirty = true
      }else if (this.newAdmin.lastname == '') {
        this.lastinValid = true
        this.dirty = true
      }else{
        this.lastinValid = false
        this.dirty = false
        this.touched = false
      }
     },
      validate2 () {
       if((this.newAdmin.email).length<7){
        this.emailinValid = true
        this.dirty = true
      }else if (this.newAdmin.email == '') {
        this.emailinValid = true
        this.dirty = true
      }else{
        this.emailinValid = false
        this.dirty = false
        this.touched = false
      }
     },
      validate3 () {
       if((this.newAdmin.password).length<6){
        this.passinValid = true
        this.dirty = true
      }else if (this.newAdmin.password == '') {
        this.passinValid = true
        this.dirty = true
      }else{
        this.passinValid = false
        this.dirty = false
        this.touched = false
      }
     },
    register() {
       firebase.auth().createUserWithEmailAndPassword(this.newAdmin.email, this.newAdmin.password).catch(function() {
        // Handle Errors here.
        }).then(() => {
          firebase.auth().onAuthStateChanged(user => {
            db.ref('/admins/').push().set({

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
.signup {
     margin-top: 4.5em;
}
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
.wrap {
  width: 100%;
}
small {
  display: flex;
}

</style>
