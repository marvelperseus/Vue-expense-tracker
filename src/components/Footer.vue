<template>
  <div class="footer">
    <h4>Expense Tracker(VUEX)</h4>
    <h5>by marvelperseus</h5>
    <a class="link-text" :href="'https://github.com/marvelperseus'" target="_blank">
    <img src="../assets/github.svg"/>
    </a>
  </div>
</template>

<script lang="js">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
  name: 'Footer',
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
    width: 100%;
    height: 75px;
    background-color: #448aff;
    color: white;
}
img {
    width: 2%;
    margin: 17px 50px;
    float: right;
}

h4 {
    float: left;
    padding:20px;
}
h5 {
    float: left;
    padding:21px 0;
}
</style>
