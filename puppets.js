const pu = new Vue({
    el: '#app',
    data: {
        puppets: [],
        puppet_id: null,
        puppet_form_name: null,
        puppet_form_btMac: null,
        puppet_form_btPw: null,
        choregraphy: "",

    },
    mounted() {

        axios.get("http://localhost:3000/puppets", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
            this.puppets = response.data
        })
    },
    methods: {
        formValues: function (puppet) {
            // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
            //$('#name').val(puppet.name);
            this.puppet_id = puppet._id;
            this.puppet_form_name = puppet.name;
            this.puppet_form_btMac = puppet.btMac;
            this.puppet_form_btPw = puppet.btPw;
        },

        createPuppet: function () {

            data = {
                name: this.puppet_form_name,
                btMac: this.puppet_form_btMac,
                btPw: this.puppet_form_btPw
            };

            axios.post("http://localhost:3000/puppets/create", data);

            window.location.replace("/CocotteProject/views/puppets.html");
        },

        updatePuppet: function () {
            data = {
                name: this.puppet_form_name,
                btMac: this.puppet_form_btMac,
                btPw: this.puppet_form_btPw
            };

            axios.put("http://localhost:3000/puppets/" + this.puppet_id + "/update", data);

            //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');
            location.reload();
        },

        deletePuppet: function (puppet) {
            axios.delete("http://localhost:3000/puppets/" + puppet._id + "/delete");
            window.location.replace("/CocotteProject/views/puppets.html");
        }
    }
});
