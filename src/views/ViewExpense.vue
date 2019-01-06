<template>
  <div class="container"> 
    <md-card>
      <md-card-header>
        <div class="row">
          <h3> Category Summary</h3>
        </div>
        <div class="row">
          <h6>Click on category to view details</h6>
        </div>
      </md-card-header>
      <md-card-content>
        <md-card-subtitle><h5>All expenses up till {{new Date().toDateString().slice(0, 15)}}</h5></md-card-subtitle>
        <PieChart/>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <div class="row">
          <h3> Monthly Summary</h3>
        </div>
        <div class="row">
          <h6>Select month to view details for 5 month range proceeding selection</h6>
        </div>
      </md-card-header>
      <md-card-content>
        <!-- <vue-monthly-picker v-model="selectedMonth" :monthLabels="locale" :inputClass="{'input': isDisplayInput}"></vue-monthly-picker> -->
        <md-datepicker v-model="summaryDate">
        </md-datepicker>
        <BarChart/>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <div class="row">
          <h3> Detail Summary</h3>
        </div>
        <div class="row">
          <h6>Click on row to edit expense</h6>
        </div>
      </md-card-header>
      <md-card-content>
        <Table/>
      </md-card-content>
    </md-card>
  </div>
</template>


<script lang="ts">
import PieChart  from '../components/PieChart.vue'
import BarChart  from '../components/BarChart.vue'
import Table from '../components/Table.vue'

export default { 
  name: 'View-Expense',
  components: {
    PieChart, BarChart, Table
  },
  data() {
    return {
      summaryDate: new Date().toDateString(),
      isDisplayInput: true,
      selectedMonth: null,
      locale: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  methods: {
  
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-card {
  margin: 0 0 7rem;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.3)
}
.md-card-actions {
  div {
    margin: 0 auto;
  }
}
.md-card-header {
  .row {
    margin: 0;
  }
}
h6 {
  opacity: 0.4;
}
h3 {
  margin: 20px 0 40px;
  float: left;
}
button {
  width: 100%;
}


</style>
