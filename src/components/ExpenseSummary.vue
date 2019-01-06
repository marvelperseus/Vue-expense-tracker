<template>
  <div class="enter-expense container">
    <md-card>
      <md-card-header>
        <div class="row">
          <h3>Expenses Summary</h3>
        </div>
      </md-card-header>
      <md-card-content>
          <div class="md-layout">
              <div class="md-layout-item">
                  <div class="row">
                      <img calss="user-image" src="../assets/logo-user.png">
                  </div>
                  <div class="row">
                      <h6> Logged in as:</h6>
                  </div>
                  <div class="row">
                      <h5> {{currentuser[0].firstname}} {{currentuser[0].lastname}}</h5>
                  </div>
              </div>
              <div class="md-layout-item">
                  <div class="row">
                      <h6>Expenses Logged</h6>
                  </div>
                  <div class="row">
                      <h5> {{expenseinfos.length}}</h5>
                  </div>
                  <div class="row">
                      <h6>First Expense Date</h6>
                  </div>
                  <div class="row">
                      <h4></h4>
                  </div>
                  <div class="row">
                      <h6>View Totals by Category</h6>
                  </div>
                  <div class="row">
                      <md-field>
                        <label>Expense category*</label>
                        <md-select v-model="expense_categories">
                            <md-option v-for="category in totalsByCategory" :value="category.name" :key="category.id">{{category.name}}</md-option>
                        </md-select>
                        </md-field>
                  </div>
              </div>
              <div class="md-layout-item">
                   <div class="row">
                      <h6>Total Amount</h6>
                  </div>
                  <div class="row">
                      <h5>{{totalamounts[0]}}</h5>
                  </div>
                  <div class="row">
                      <h6>Last Expense Date</h6>
                  </div>
                  <div class="row">
                      <h4></h4>
                  </div>
                  <div class="row">
                      <h6>{{expense_categories}} Totals</h6>
                  </div>
                  <div class="row" v-for="category in totalsByCategory" :key="category.id">
                      <h5>{{category.name == expense_categories?category.amount:''}}</h5>
                  </div>
              </div>
          </div>
         </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import { db } from '../config/db'
import store  from '../config/store'


export default {
  name: 'ExpenseSummary',
  data() {
      return {
          expenseinfos: [],
          currentuser:[],
          expense_categories: '',
          totalamounts: '',
          totalsByCategory:''
      }
  },
  methods: {
      getAllDatas() {
           var userId = firebase.auth().currentUser.uid;
           var userEmail = firebase.auth().currentUser.email;
            const currentuserarray = [];
            const expenseinfosarray = [];
            const totals = [];

        
        db.ref('/expenseinfos/'+userId).on('value',function(snapshot){
           
            snapshot.forEach(function(elem) {
                expenseinfosarray.push(elem.toJSON());
            });
            var temps = expenseinfosarray.map(item => item.expense_category).filter((value, index, self) => self.indexOf(value) === index)
            for (let temp of temps) {
                let categorySum = 0;
                for (let value of expenseinfosarray) {
                    if (value.expense_category == temp) {
                        categorySum += value.expense_amount;
                    }
                }
                let dataObj = { name: temp, amount:categorySum.toFixed(2) };
                totals.push(dataObj);
            }
        });     
       
         db.ref('/admins/').orderByChild("email").equalTo(userEmail).on('value', function(snapshot){
           
            snapshot.forEach(function(elem) {
                 currentuserarray.push(elem.val())
            });
         });
       
         this.currentuser = currentuserarray;
         this.expenseinfos = expenseinfosarray;
         this.totalsByCategory = totals;
         store.setMessageAction(totals)
        //  this.$root.$data.totals = totals;
 
      },
      getTotalByUser() {
          const sum = [];
          var totalAmount =0;
          var userId = firebase.auth().currentUser.uid;
        db.ref('/expenseinfos/'+userId).once('value',function(snapshot){
           
            snapshot.forEach(function(elem) {
            //    totalAmount += Number(elem.val().expense_amount);
                totalAmount += elem.val().expense_amount;
            });
            sum.push(totalAmount.toFixed(2))
        });
        this.totalamounts = sum;

      },
      getTotalsByCategory() {

        },
      getUserCategories() {
         

      },
      getdata: function() {
          alert('this is beforeMount');
      }
  },
  created() {
      this.getAllDatas();
      this.getTotalByUser();
    //  this.getTotalsByCategory();
    //  this.getUserCategories();
  },
  beforeMount() {
    //   this.getdata()
  },
}
</script>
<style scoped lang="scss">
.md-card {
  margin: 0 0 7rem;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.3)
}
.md-card-content{
    img {
        width: 30%;
        height: 30%;
        margin: 0 auto;
    }
}
.row {
    text-align: center;
    h6 {
        margin: 3rem auto 1rem;
        font-weight: bold;
    }
    h5 {
        margin: 0 auto;
        color: rgba(0, 0, 0,.8);
    }
    h4 {
        margin: 0 auto;
    }
}
</style>