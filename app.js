var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors({
  origin: 'http://localhost:8888',
  credentials: true
}));

const vm = new Vue({
  el: '#app',
  data: {
    puppets: []
  },
  mounted() {
    // axios.get("http://localhost:3000/puppets")
    // .then(response => {this.puppets = response.data.results});

    axios.get("http://localhost:3000/puppets", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
      console.log(response.data)
    })
  }
});
