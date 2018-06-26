const ch = new Vue({
    el: '#app',
    data: {
        movements: [],
        choreographies: [],
        choreography_id: null,
        choreography_form_name: null,
        choreography_form_time: null,
        count_movements: 1,
        movement_form_name: null,
        movement_form_time: null,
        movement_form_steps: null,
        movement_form_direction: null,
        movement_form_height: null,
        movements_form: [],
        to_update: window.location.search.substr(4)
    },
    mounted() {
        axios.get("http://localhost:3000/choregraphies", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //console.log(response.data)
            this.choreographies = response.data
            // $.each(response.data, function(index, chore) {
            //     $.each(chore, function(key, move) {
            //         if (key === "_id") {
            //             axios.get("http://localhost:3000/movements/" + move, { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //                 console.log(response.data);
            //             });
            //         }
            //     });
            // });
        });

        axios.get("http://localhost:3000/movements", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            //console.log(response.data)
            this.movements = response.data
        });

        $('#movementParams').hide();
    },

    methods: {
        movementValues: function (movement) {
            // this.movements_form[index].push(object);
        },

        movementValuesSelect: function (e) {

            let object = JSON.parse(e.target.value);

            let id = $(event.target).parent().children("label").html().substr(12);

            this.movements_form[id] = object;

            console.log(this.movements_form);

            this.movement_form_name = object.name;
            this.movement_form_time = object.time;
            this.movement_form_steps = object.steps;
            this.movement_form_direction = object.direction;
            this.movement_form_height = object.height;
        },

        createChoreography: function () {

            let create_array = [];

            $.each(this.movements_form, function(index, value) {
                $.each(value, function(key, val) {
                    if (key === "_id" && val !== null) {
                        create_array.push(val);
                    }
                });
            });

            data = {
                name: this.choreography_form_name,
                movement: create_array
            };

            axios.post("http://localhost:3000/choregraphies/create", data);

            window.location.replace("/CocotteProject/views/choreographies.html");
        },

        updateChoreography: function () {
            data = {
                name: this.choreography_form_name
            };

            axios.put("http://localhost:3000/choregraphies/" + this.choreography_id + "/update", data);

            location.reload();
        },

        deleteChoreography: function (choreography) {
            axios.delete("http://localhost:3000/choregraphies/" + choreography._id + "/delete");
            window.location.replace("/CocotteProject/views/choreographies.html");
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
        }
    }
});
