<template>
  <div id="app">
    <Header msg="This is header"/>
    <!-- <div id="nav" class="page-container md-layout-column">
      <md-content>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
      </md-content>
    </div> -->
    <router-view/>
    <Footer msg="This is footer"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Footer, Header
  },
})
export default class App extends Vue {}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.footer {
  background-color: #0275d8;
  color: white;
}
.header {
  background-color: #0275d8;
  color: white;
}

</style>
