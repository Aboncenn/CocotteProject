const mo = new Vue({
    el: '#app',
    data: {
        movements: [],
        movements_name: [],
        movement_id: null,
        movement_form_name: "",
        movement_form_time: null,
        movement_form_steps: null,
        movement_form_direction: null,
        movement_form_height: null,
        error: null
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

        axios.get("https://chicken-api.herokuapp.com/movements", config).then((response) => {
            this.movements = response.data
            let names = [];

            $.each(this.movements, function (index, value) {
                if($.inArray(value.name, names) === -1)
                    names.push(value.name);
            });

            this.movements_name = names;
        });

        $('#updateForm').hide();
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

        formValues: function (movement) {
            $('#updateForm').slideDown();

            this.movement_id = movement._id;
            this.movement_form_name = movement.name;
            this.movement_form_steps = movement.steps;
            this.movement_form_time = movement.time;
            this.movement_form_direction = movement.direction;
            this.movement_form_height = movement.height;
            // this.movement_form_time = movement.btMac;
            // this.movement_form_btPw = movement.btPw;
        },

        createMovement: function () {
            this.error = null;

            if (this.movement_form_height !== null) {
                this.movement_form_height = (this.movement_form_height === "") ? null : this.movement_form_height;
                if (this.movement_form_height > 25 || this.movement_form_height < 5) {
                    this.error = "La hauteur doit être comprise entre 5 et 25";
                    console.log(this.movement_form_height);
                }
            }

            if (this.movement_form_direction !== null) {
                this.movement_form_direction = (this.movement_form_direction === "") ? null : this.movement_form_direction;
                if (this.movement_form_direction > 1 || this.movement_form_direction < -1 || this.movement_form_direction == 0) {
                    this.error = "La direction ne peut être égale qu'à -1 ou 1";
                }
            }

            if (this.movement_form_time !== null) {
                this.movement_form_time = (this.movement_form_time === "") ? null : this.movement_form_time;
                if (this.movement_form_time > 2000 || this.movement_form_time < 600) { console.log('ok');
                    this.error = "La vitesse doit être comprise entre 600 et 2000";
                }
            }

            if (this.movement_form_steps !== null) {
                this.movement_form_steps = (this.movement_form_steps === "") ? null : this.movement_form_steps;
                if (this.movement_form_steps > 10 || this.movement_form_steps < 1) {
                    this.error = "Le nombre de pas doit être compris entre 1 et 10";
                }
            }

            if (this.movement_form_name === "") {
                this.error = "Veuillez choisir un nom";
            }

            if (!this.error) {
                data = {
                    name: this.movement_form_name,
                    steps: this.movement_form_steps,
                    time: this.movement_form_time,
                    direction: this.movement_form_direction,
                    height: this.movement_form_height
                };

                axios.post("https://chicken-api.herokuapp.com/movements/create", data).then((response) => {
                    window.location.replace("/CocotteProject/views/moves.html");
                });
            }
        },

        updateMovement: function () {
            this.error = null;

            if (this.movement_form_height !== null) {
                this.movement_form_height = (this.movement_form_height === "") ? null : this.movement_form_height;
                if (this.movement_form_height > 25 || this.movement_form_height < 5) {
                    this.error = "La hauteur doit être comprise entre 5 et 25";
                    console.log(this.movement_form_height);
                }
            }

            if (this.movement_form_direction !== null) {
                this.movement_form_direction = (this.movement_form_direction === "") ? null : this.movement_form_direction;
                if (this.movement_form_direction > 1 || this.movement_form_direction < -1 || this.movement_form_direction == 0) {
                    this.error = "La direction ne peut être égale qu'à -1 ou 1";
                }
            }

            if (this.movement_form_time !== null) {
                this.movement_form_time = (this.movement_form_time === "") ? null : this.movement_form_time;
                if (this.movement_form_time > 2000 || this.movement_form_time < 600) { console.log('ok');
                    this.error = "La vitesse doit être comprise entre 600 et 2000";
                }
            }

            if (this.movement_form_steps !== null) {
                this.movement_form_steps = (this.movement_form_steps === "") ? null : this.movement_form_steps;
                if (this.movement_form_steps > 10 || this.movement_form_steps < 1) {
                    this.error = "Le nombre de pas doit être compris entre 1 et 10";
                }
            }

            if (this.movement_form_name === "") {
                this.error = "Veuillez choisir un nom";
            }

            if (!this.error) {
                $('#updateForm').slideDown();

                data = {
                    name: this.movement_form_name,
                    steps: this.movement_form_steps,
                    time: this.movement_form_time,
                    direction: this.movement_form_direction,
                    height: this.movement_form_height
                };

                axios.put("https://chicken-api.herokuapp.com/movements/" + this.movement_id + "/update", data).then((response) => {
                    location.reload();
                });

                //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');

            }
        },

        deleteMovement: function (movement) {
            axios.delete("https://chicken-api.herokuapp.com/movements/" + movement._id + "/delete").then((response) => {
                window.location.replace("/CocotteProject/views/moves.html");
            });
        },

        assignName: function () {

        }
    }
});
