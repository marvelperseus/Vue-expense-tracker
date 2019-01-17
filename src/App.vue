<template>
  <div id="app">
     <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <Header/>
   
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';


export default {
  name: 'App',
  components: {
    Header
  }
}

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


</style>
