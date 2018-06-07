const vm = new Vue({
    el: '#app',
    data: {
        puppets: [],
        puppet_form_name: null,
        puppet_form_btMac: null,
        puppet_form_btPw: null
    },
    mounted() {
        axios.get("http://localhost:3000/puppets", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
        })

        axios.get("http://localhost:3000/puppets", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            this.puppets = response.data
        })
    },
    methods: {
        formValues: function (puppet) {
            // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
            //$('#name').val(puppet.name);
            this.puppet_form_name = puppet.name;
            this.puppet_form_btMac = puppet.btMac;
            this.puppet_form_btPw = puppet.btPw;
        }
    }
});
