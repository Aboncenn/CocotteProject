const pu = new Vue({
    el: '#app',
    data: {
        puppets: [],
        puppet_id: null,
        puppet_form_name: null,
        puppet_form_btMac: null,
        puppet_form_btPw: null,
        choregraphy: "",
        user: null
    },
    mounted() {
        let cookie = this.getCookie("token");
        console.log(cookie);
        if (!cookie) {
            window.location.replace("/CocotteProject/views/login.html");
        } else {
            this.user = cookie;
        }

        var config = {
            headers: {'Authorization': "Bearer " + this.user, "Access-Control-Allow-Origin" : "*"}
        };

        axios.get("https://chicken-api.herokuapp.com/puppets", config).then((response) => {
            console.log(response.data)
            this.puppets = response.data
        })
    },
    methods: {
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return false;
        },

        formValues: function (puppet) {
            // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
            //$('#name').val(puppet.name);
            this.puppet_id = puppet._id;
            this.puppet_form_name = puppet.name;
            this.puppet_form_btMac = puppet.btMac;
            this.puppet_form_btPw = puppet.btPw;
        },

        createPuppet: function () {

            var config = {
                headers: {'Authorization': "bearer " + this.user}
           };

            data = {
                name: this.puppet_form_name,
                btMac: this.puppet_form_btMac,
                btPw: this.puppet_form_btPw
            };

            axios.post("https://chicken-api.herokuapp.com/puppets/create", data, config).then((response) => {
                window.location.replace("/CocotteProject/views/puppets.html");
            });
        },

        updatePuppet: function () {
            data = {
                name: this.puppet_form_name,
                btMac: this.puppet_form_btMac,
                btPw: this.puppet_form_btPw
            };

            axios.put("https://chicken-api.herokuapp.com/puppets/" + this.puppet_id + "/update", data).then((response) => {
                location.reload();
            });

            //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');

        },

        deletePuppet: function (puppet) {
            axios.delete("https://chicken-api.herokuapp.com/puppets/" + puppet._id + "/delete").then((response) => {
                window.location.replace("/CocotteProject/views/puppets.html");
            });
        }
    }
});
