import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import VueCharts from 'vue-chartjs'
import { Bar, Line, Pie } from 'vue-chartjs'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import Nprogress from 'nprogress'
import '../node_modules/nprogress/nprogress.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import treeNav from 'vue-tree-nav'


library.add(faCoffee)

 Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueMaterial,VueChartkick, {adapter: Chart})

Vue.config.productionTip = false;
let app = '';

// var config = {
//   apiKey: "AIzaSyAZEif6F0yz1Fyg4G5mqj_MYDF1_71kN2E",
//   authDomain: "expense-tracker-b673c.firebaseapp.com",
//   databaseURL: "https://expense-tracker-b673c.firebaseio.com",
//   projectId: "expense-tracker-b673c",
//   storageBucket: "expense-tracker-b673c.appspot.com",
//   messagingSenderId: "931046277207"
// };
// firebase.initializeApp(config);

// var database = firebase.database();


firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app'); 
  }
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    Nprogress.start()
  }
  next()
})

router.afterEach(() =>{
  Nprogress.done()
})
