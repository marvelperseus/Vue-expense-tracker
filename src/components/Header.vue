<template>
   <div class="page-container md-layout-column">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <md-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="showNavigation = true">
    <md-icon class="fa fa-bars"></md-icon>
   
    </md-button>
    <span class="md-title">My Expense Tracker</span>

    <div class="md-toolbar-section-end">
      <!-- <md-button @click="showSidepanel = true">Home</md-button> -->
      <router-link to="/home"><span class="md-title">Home</span></router-link>
      <router-link to="/view-expense"><span class="md-title">View Expense</span></router-link>
      <span class="md-title" @click="logout">Logout</span>
    </div>
    </md-toolbar>
<!-- 
    <md-drawer :md-active.sync="showNavigation">
    <md-toolbar class="md-transparent" md-elevation="0">
    <span class="md-title">Expense Tracker</span>
    </md-toolbar>

    <md-list>
    <md-list-item>
    <md-icon class="fa fa-home"></md-icon>
    <span class="md-list-item-text"> <router-link to="/">Home</router-link></span>
    </md-list-item>

    <md-list-item>
    <span class="md-list-item-text">View Expense</span>
    </md-list-item>

    <md-list-item>
    <span class="md-list-item-text"><button @click="logout"><router-link to="/login">Log Out</router-link></button></span>
    </md-list-item>

    </md-list>
    </md-drawer>

    <md-drawer class="md-right" :md-active.sync="showSidepanel">
    <md-toolbar class="md-transparent" md-elevation="0">
    <span class="md-title">Favorites</span>
    </md-toolbar>

    <md-list>
    <md-list-item>
    <span class="md-list-item-text">Abbey Christansen</span>

    <md-button class="md-icon-button md-list-action">
    <md-icon class="md-primary">chat_bubble</md-icon>
    </md-button>
    </md-list-item>

    <md-list-item>
    <span class="md-list-item-text">Alex Nelson</span>

    <md-button class="md-icon-button md-list-action">
    <md-icon class="md-primary">chat_bubble</md-icon>
    </md-button>
    </md-list-item>

    <md-list-item>
    <span class="md-list-item-text">Mary Johnson</span>

    <md-button class="md-icon-button md-list-action">
    <md-icon>chat_bubble</md-icon>
    </md-button>
    </md-list-item>
    </md-list>
    </md-drawer> -->
  </div>
</template>
<script src="https://www.gstatic.com/charts/loader.js">
</script>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';


export default {
  name: 'Header',
  components: {

  },
  data(){
    return {
       showNavigation: false,
      showSidepanel: false
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
