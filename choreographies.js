const ch = new Vue({
    el: '#app',
    data: {
        movements: [],
        choreographies: [],
        movement_names: [],
        choreography_id: null,
        choreography_form_name: null,
        // choreography_form_time: null,
        count_movements: 0,
        count_movements_update: 0,
        count_movements_create: 0,
        movement_form_name: null,
        movement_form_time: null,
        movement_form_steps: null,
        movement_form_direction: null,
        movement_form_height: null,
        movements_form: [],
        to_update: window.location.search.substr(4),
        choreography_update_name: null,
        choreography_update_movements: null,
        user: null,
        script: [],
        error: null
    },
    mounted() {
        let cookie = this.getCookie("token");
        if (!cookie) {
            window.location.replace("/CocotteProject/views/login.html");
        } else {
            this.user = cookie;
        }

        axios.get("https://chicken-api.herokuapp.com/choregraphies", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //console.log(response.data)
            let list_index = 0;

            this.choreographies = response.data
            $.each(this.choreographies, function(index, value) {
                list_index = 0;
                $.each(value.movement, function (key, move) {
                    list_index++;
                    move.index = list_index;
                    //console.log(move);
                });
            });
        });

        axios.get("https://chicken-api.herokuapp.com/movements", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //console.log(response.data)
            this.movements = response.data;

            let checkNames = [];
            let moves2 = this.movements;

            this.movements.sort( function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            console.log(this.movements);
        });

        axios.get("https://chicken-api.herokuapp.com/choregraphies/" + this.to_update, { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //console.log(response.data)
            this.choreography_update_name = response.data.name;
            this.choreography_update_movements = response.data.movement;

            this.count_movements = 0;

            for (var i = 0; i < response.data.movement.length; i++) {
                this.count_movements_update++;
            }

            let update_index = 0;

            $.each(this.choreography_update_movements, function (index, value) {
                update_index++;
                value.index = update_index;
                //console.log(value);
            });

            $('#movements_new').hide();
        });

        $('#movementParams').hide();
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

        movementValuesUpdate: function () {
            this.count_movements_update++;

            this.choreography_update_movements.push({ index: this.count_movements_update, name: null, direction: null, steps: null, height: null, time: null, __v: null, _id: null });

            //console.log(this.choreography_update_movements);
        },

        movementValuesUpdateModif: function (e) {
            let object = JSON.parse(e.target.value);

            let id = $(event.target).parent().children("label").html().substr(12);

            //this.choreography_update_movements[id - 1] = object;

            $.each(this.choreography_update_movements[id - 1], function (index, value) {
                if (index === "index") {
                    object.index = value;
                }
            });

            this.choreography_update_movements[id - 1] = object;

        },

        movementValuesCreate: function () {
            this.count_movements_create++;

            this.movements_form.push({ index: this.count_movements_create, name: null, direction: null, steps: null, height: null, time: null, __v: null, _id: null });
        },

        movementValuesCreateModif: function (e) {
            let object = JSON.parse(e.target.value);

            let id = $(event.target).parent().children("label").html().substr(12);

            $.each(this.movements_form[id - 1], function (index, value) {
                if (index === "index") {
                    object.index = value;
                }
            });

            this.movements_form[id - 1] = object;

        },

        deleteValueUpdate: function (move) {
            this.count_movements_update--;
            this.choreography_update_movements.splice(move.index - 1, 1);

            $.each(this.choreography_update_movements, function (index, value) {
                value.index = index + 1;
            })

            //console.log(this.choreography_update_movements);
        },

        deleteValueCreate: function (move) {
            this.count_movements_create--;

            this.movements_form.splice(move.index - 1, 1);

            $.each(this.movements_form, function (index, value) {
                value.index = index + 1;
            })

            //console.log(this.movements_form);
        },

        createChoreography: function () {
            this.error = null;
            let error = null;

            $.each(this.movements_form, function (index, value) { console.log(value);
                if (value._id === null) { console.log('ok');
                    error = "Certains mouvements n'ont pas été sélectionnés, Veuillez les supprimer ou les sélectionner";
                }
            });

            if (this.choreography_form_name === null) {
                error = "Veuillez entrer un nom";
            }

            if (error) {
                this.error = error;
            }

            if(!this.error) {
                let create_array = [];

                $.each(this.movements_form, function(index, value) {
                    $.each(value, function(key, val) {
                        if (key === "_id" && val !== null) {
                            create_array.push(val);
                        }
                    });
                });

                //console.log(this.user);

                var config = {
                    headers: {'Authorization': "bearer " + this.user}
                };

                data = {
                    name: this.choreography_form_name,
                    user: this.user,
                    movement: create_array
                };

                axios.post("https://chicken-api.herokuapp.com/choregraphies/create", data, config);

                window.location.replace("/CocotteProject/views/choreographies.html");
            }
        },

        updateChoreography: function () {
            this.error = null;
            let error = null;

            $.each(this.choreography_update_movements, function (index, value) { console.log(value);
                if (value._id === null) { console.log('ok');
                    error = "Certains mouvements n'ont pas été sélectionnés, Veuillez les supprimer ou les sélectionner";
                }
            });

            if (error) {
                this.error = error;
            }

            if (!this.error) {
                let update_array = [];

                $.each(this.choreography_update_movements, function(index, value) {
                    $.each(value, function(key, val) {
                        if (key === "_id" && val !== null) {
                            update_array.push(val);
                        }
                    });
                });

                //console.log(JSON.stringify(update_array));

                data = {
                    name: this.choreography_update_name,
                    movement: update_array
                };

                //console.log(data);

                axios.put("https://chicken-api.herokuapp.com/choregraphies/" + this.to_update + "/update", data);

                window.location.replace("/CocotteProject/views/choreographies.html");
            }

        },

        deleteChoreography: function (choreography) {
            let valid = confirm("Êtes vous sûr de vouloir supprimer cette chorégraphie ?");
            if (valid) {
                axios.delete("https://chicken-api.herokuapp.com/choregraphies/" + choreography._id + "/delete");
                window.location.replace("/CocotteProject/views/choreographies.html");
            }
        },

        addMovement: function () {
            this.count_movements++;
        },

        showParams: function () {
            let element = $(event.target).parent().parent().parent().parent().parent();
            let params = element.children("#movementParams");
            let icon = $('.setUp');
            let id = element.children(".form-group").children().children().children("label").html().substr(12);

            if (params.is(":visible")) {

                $(event.target).removeClass('fa-arrow-circle-up');
                $(event.target).addClass('fa-arrow-circle-down');

                params.slideUp();
            } else {
                // console.log(params.children().length);
                // console.log(params.children().children("input")[0]);


                icon.removeClass('fa-arrow-circle-up');
                icon.addClass('fa-arrow-circle-down');
                $(".movementParams").slideUp();

                $(event.target).removeClass('fa-arrow-circle-down');
                $(event.target).addClass('fa-arrow-circle-up');

                params.slideDown();
            }
        },

        goToUpdate: function (choreography) {
            window.location.replace("/CocotteProject/views/updateChoreography.html?id=" + choreography._id);
        },

        toSend: function (chore) {
            if ($(event.target).attr("class").substr(0, 3) === "btn") {
                var element = $(event.target).children();
            } else {
                var element = $(event.target);
            }

            if (element.attr("class") === "far fa-hand-pointer") {
                element.removeClass("fa-hand-pointer");
                element.addClass("fas fa-check");

                this.script.push(chore);
            } else {
                element.removeClass("fas fa-check");
                element.addClass("fa-hand-pointer");

                $.each(this.script, function(index, value) {
                    if (value === chore) {
                        chore= index;
                    }
                });

                this.script.splice(chore, 1);
            }
        },

        sendCode: function () {
            //envoyer vers le script
            console.log(this.script);
            if (this.script.length === 0) {
                this.error = "Veuillez Selectionner une ou plusieurs choregraphies";
            } else {
                this.error = null;

                var data = {
                    choregraphy: this.script
                }

                //console.log(this.script);
                axios.post("https://chicken-api.herokuapp.com/choregraphies/generate", data).then((response) => {
                    let now = Date.now();

                    this.download("choregraphies" + now + ".ino", response.data);
                    window.location.replace("/CocotteProject/views/choreographies.html");
                });
            }
        },

        download: function (filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    }
});
