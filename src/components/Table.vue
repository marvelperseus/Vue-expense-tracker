<template>
  <div class="container">
    <md-table v-model="users" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" md-card @md-selected="onSelect">

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" >
        <md-table-cell md-label="Name" md-sort-by="expense_name">{{ item.expense_name }}</md-table-cell>
        <md-table-cell md-label="Amount" md-sort-by="expense_amount">{{ item.expense_amount }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="expenseDate">{{ item.expenseDate }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="expense_category">{{ item.expense_category }}</md-table-cell>
        <md-table-cell md-label="Type" md-sort-by="payment_type">{{ item.payment_type }}</md-table-cell>
        <md-table-cell md-label="Comments" md-sort-by="comments">{{ item.comments }}</md-table-cell>
      </md-table-row>
    </md-table>
    <!-- <md-table-pagination md-label="Rows per page" 
        :md-size="limit" 
        :md-page="offset + 1" 
        :md-total="users.length"
        :md-page-options="[5, 10, 25]"
        @pagination="onPagination">
    </md-table-pagination> -->
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Manage Expense</md-dialog-title>
        <md-dialog-content  v-if="!update">
          <div>
            <div class="row">
              <div class="col-sm-6">
                <label>Name</label>
                <p>{{this.selected.expense_name}}</p>
              </div>
              <div class="col-sm-6">
                <label>Amount</label>
                <p>{{this.selected.expense_amount}}</p>
              </div>              
            </div>
            <div class="row">
              <div class="col-sm-4">
                <label>Date</label>
                <p>{{this.selected.expenseDate}}</p>
              </div>
              <div class="col-sm-4">
                <label>Category</label>
                <p>{{this.selected.expense_category}}</p>
              </div>
              <div class="col-sm-4">
                <label>Expense Type</label>
                <p>{{this.selected.payment_type}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label>Commments</label>
                <p>{{this.selected.comments}}</p>
              </div>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-content  v-if="update">
           <div class="md-layout md-gutter">
            <div class="md-layout-item">
            <md-field>
                <label>Expense Name*</label>
                <md-input v-model="expense_name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Amount*</label>
                <md-input v-model.number="expense_amount" type="number"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item calender">
              <md-datepicker format="YYYY-MM-DD" v-model="expenseDate">
                  <label>Expense Date</label>
              </md-datepicker>
            </div>
            <div class="md-layout-item category">
              <md-field>
                <label>Expense category*</label>
                <md-select v-model="expense_category">
                    <md-option value="Groceries">Groceries</md-option>
                    <md-option value="Transportation">Transportation</md-option>
                    <md-option value="Enertainment">Enertainment</md-option>
                    <md-option value="Dining out">Dining out</md-option>
                </md-select>
              </md-field>
              <md-field>
                <label>Payment type*</label>
                <md-select v-model="payment_type">
                    <md-option value="Credit">Credit</md-option>
                    <md-option value="Debit">Debit</md-option>
                    <md-option value="Cash">Cash</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter comment">
            <div class="md-layout-item">
              <md-field>
                <label>Commnets</label>
                <md-textarea v-model="comments" md-autogrow></md-textarea>
              </md-field>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button @click="active = false, update=false">CLOSE</md-button>
            <md-button class="md-accent" @click="deleteData"  v-if="!update">DELETE</md-button>
            <md-button class="md-primary"  @click="edit" v-if="!update">EDIT</md-button>
            <md-button class="md-accent" v-if="update" @click="resetData">RESET</md-button>
            <md-button class="md-primary"  v-if="update" @click="updateData">UPDATE</md-button>
        </md-dialog-actions>
    </md-dialog>
    
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import { db } from '../config/db'



export default {
  name: 'Table',
  
  data() {
    return {
      users:[],
      expense:[],
      expense_name: '',
      expense_amount: 0,
      expense_category: '',
      payment_type: '',
      comments: '',
      expenseDate: null,
      update: false,
      selected:{},
      active: false,
      currentSort: 'expense_name',
      currentSortOrder: 'asc'
    }
  },
  firebase: {
    expenseinfos: db.ref('expenseinfos')
  },
  methods: {
      
      getDatas() {
         
          var userId = firebase.auth().currentUser.uid;
          const expenseinfosarray = [];
           db.ref('/expenseinfos/'+userId).on('value',function(snapshot){
             var i = 0;
            snapshot.forEach(function(elem) {
             expenseinfosarray.push(elem.toJSON());
             expenseinfosarray[i].key = elem.key;
             i++;
            });
        }); 
         this.users = [];
         this.users = expenseinfosarray;
         console.log(this.users)

      },
    // onPagination(pagination) {
    //   if (pagination) {
    //     this.limit = pagination.size;
    //     this.offset = (pagination.page - 1) * this.limit;
    //   }
    //   this.find()
    // },
    onSelect (item) {
        this.selected = item;
        this.active = true;
    },
    deleteData() {
        this.active = false;
        this.$router.go(this.$router.currentRoute);

        var userId = firebase.auth().currentUser.uid;
        db.ref('/expenseinfos/'+userId+'/'+this.selected.key).remove()
          .then(function(){
            this.$refs.table.refresh();
            console.log("Remove succeeded..");           
          })
          .catch(function(error){
            console.log("Remove failed...")
          })
    },
    edit(){
      this.update = true;
      this.comments = this.selected.comments;
      this.expense_name = this.selected.expense_name;
      this.expense_amount = this.selected.expense_amount;
      this.expense_category = this.selected.expense_category;
      this.payment_type = this.selected.payment_type;
      this.expenseDate = this.selected.expenseDate;
    },
    updateData() {
       
      this.expense.expense_name = this.expense_name;
      this.expense.expense_amount = this.expense_amount;
      this.expense.expense_category = this.expense_category;
      this.expense.payment_type = this.payment_type;
      this.expense.expenseDate = this.expenseDate.toDateString();
      this.expense.comments = this.comments;

      var userId = firebase.auth().currentUser.uid;
       this.$router.go(this.$router.currentRoute);
      db.ref('/expenseinfos/'+userId+'/'+this.selected.key).set(this.expense);
    },
    resetData() {
      this.comments = this.selected.comments;
      this.expense_name = this.selected.expense_name;
      this.expense_amount = this.selected.expense_amount;
      this.expense_category = this.selected.expense_category;
      this.payment_type = this.selected.payment_type;
      this.expenseDate = this.selected.expenseDate;
    }

  },
  beforeMount() {
      this.getDatas();
  }
 }
</script>
<style scoped lang="scss">
.md-dialog {
  .md-dialog-content {
    label {
      font-weight: 700;
    }
  }
}
</style>
