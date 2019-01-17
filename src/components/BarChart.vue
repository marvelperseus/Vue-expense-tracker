<script lang="js">
import firebase from 'firebase';
import { db } from '../config/db'
import { Bar, mixins } from 'vue-chartjs'
import store  from '../config/store'

export default { 
  name: 'BarChart',
  extends: Bar,
  components: {
    'bar-chart':Bar
  },
  data() {
    return {
      totalAmounts:'',
      totalAmount:{},
    }
  },
  methods: {
  
  },
  beforeMount() {
      this.totalAmounts = store.state.message;
      this.totalAmounts.forEach((element, index) => {
       this.totalAmount[index] = element.amount;
       });
       
  },
  mounted() {
   this.renderChart({
     labels:['Dining out','Entertainment','Groceries','Transportation'],
     datasets: [
       {
         backgroundColor: [
           '#7cb5ec', '#434348', '#90ed7d', '#f7a35c'
         ],
           data:[this.totalAmount[0], this.totalAmount[1],this.totalAmount[3],this.totalAmount[2]]
       }
     ]
   },{responsive: true, maintainAspectRatio: false}) 
  }
 }
</script>