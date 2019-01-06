<template>
  <div class="home container">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <ExpenseSummary/>
    <EnterExpense/>
    <button @click="logout">Logout</button>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import EnterExpense from '@/components/EnterExpense.vue';
import ExpenseSummary from '@/components/ExpenseSummary.vue';
import firebase from 'firebase';

@Component({
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
})
export default class Home extends Vue {}
</script>
