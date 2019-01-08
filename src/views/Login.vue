<template>
  <div class="login container">
    <md-card md-with-hover>
        <md-ripple>
        <md-card-header>
            <h3>Login</h3>
        </md-card-header>
        <md-card-content>
            <div class="container">
                <md-field>
                <label>Email*</label>
                <md-input v-model="email" type="email"></md-input>
                </md-field>
                <md-field>
                <label>Password*</label>
                <md-input v-model="password" type="password"></md-input>
                </md-field>
            </div>
        </md-card-content>
        <md-card-actions>
             <div>
                <md-button class="md-raised md-primary" @click="login">LOGIN</md-button>
                <span>You don't have an account? <router-link to="/signup">Signup</router-link></span>
            </div>
        </md-card-actions>
        </md-ripple>
    </md-card>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';

export default {
    name:'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword( this.email, this.password ).then(
                (user) => this.$router.replace('home'),
                (err) => alert('Oops. ' + err.message)
            );
            // this.$router.replace('home')


            // function (user) {
            //         alert('well done! You are connected')
            //     },
            //     function (err) {
            //         alert('Oops. ' + err.message)
            //     }
        }
    }

}
</script>
<style scoped lang="scss">
.md-card {
  margin: 0 0 7rem;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.3)
}
.md-card-actions {
  div {
    margin: 0 auto;
    width: 100%;
    .md-button {
        margin-bottom: 2em;
    }
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
