<template>
    <div class="header page-container md-layout-column">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
            <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Expense Tracker</span>
        </md-toolbar>

        <md-drawer :md-active.sync="showNavigation">
        <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">Expense Tracker</span>
        </md-toolbar>

        <md-list>
            <router-link to="/home">
            <md-list-item  @click="showNavigation = false">
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Home</span>
            </md-list-item>
             </router-link>
            
            <router-link to="/view-expense">
            <md-list-item @click="showNavigation = false">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">View Expense</span>
            </md-list-item>
            </router-link>
        </md-list>
         <md-toolbar class="md-transparent" md-elevation="0">
           <span class="md-title" @click="logout">Logout</span>
        </md-toolbar>
        </md-drawer>

        <md-content>
            <router-view/>
            <Footer/>
        </md-content>
    </div>

</template>

<script>
import Footer from '../components/Footer.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

  export default {
    name: 'Header',
    components: {
        Footer
    },
    data: () => ({
      showNavigation: false,
      showSidepanel: false
    }),
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
  }
</script>

<style lang="scss" scoped>
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

</style>
