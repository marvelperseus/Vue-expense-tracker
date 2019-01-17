<template>
  <div class="home container">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <ExpenseSummary/>
    <EnterExpense/>
    <button @click="logout">Logout</button>

    <md-speed-dial id="viewexpense" class="md-bottom-right">
      <router-link to="/view-expense">
        <md-speed-dial-target>
          <md-icon>assessment</md-icon>
        </md-speed-dial-target>
      </router-link>
      <b-popover target="viewexpense"
                   placement="topleft"
                   title="Viewexpense!"
                   triggers="hover focus"
                   content="Go to View Expense">
        </b-popover>
    </md-speed-dial>
    
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import EnterExpense from '../components/EnterExpense.vue';
import ExpenseSummary from '../components/ExpenseSummary.vue';
import firebase from 'firebase';



export default {
  name: 'Home',
  components: {
     HelloWorld,EnterExpense,ExpenseSummary
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
<style lang="scss">
  .md-speed-dial {
      position: fixed !important;
      bottom: 85px !important;
      right: 25px !important;
  } 
    
</style>
