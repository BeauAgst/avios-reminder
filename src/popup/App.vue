<template>
  <div class="container">
    <h1>Avios Reminder</h1>
    <input type="text" v-model="searchTerm" placeholder="Search for Retailer">
    <scroller :list="filtered" />
  </div>
</template>

<script>
import storage from '../utils/storage'
import Scroller from './components/scroller.vue'

export default {
  name: 'App',
  components: {
    Scroller
  },
  data: () => ({
    searchTerm: '',
    retailers: [],
  }),
  computed: {
    sorted() {
      return this.retailers.sort((a, b) => a.merchant_url.localeCompare(b.merchant_url))
    },
    filtered() {
      return this.searchTerm ? this.sorted.filter(({ merchant_url }) => merchant_url.toLowerCase().includes(this.searchTerm.toLowerCase())) : this.sorted
    }
  },
  created() {
    const { retailers } = storage('local').get('retailer_list') || { retailers: [] }
    this.retailers = retailers
  },
  methods: {},
}
</script>

<style>
body {
  padding: .5em;
  margin: 0;
	background: #f5f5f5;
	-webkit-font-smoothing: antialiased;
	font-size: 16px;
}

h1 {
  margin: .1em 0 .5em; 
  line-height: 1;
}

input {
  box-sizing: border-box;
  margin: 0 0 1em;
  padding: 0 20px;
  width: 100%;
  line-height: 50px;
  border: 1px solid rgba(0,0,0,.38);
  border-radius: .3em;
  font-size: 18px;
}

.container {
  min-width: 300px;
  height: 400px;
}
</style>