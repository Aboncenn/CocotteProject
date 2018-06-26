const mo = new Vue({
    el: '#app',
    data: {
        movements: [],
        movement_id: null,
        movement_form_name: null,
        movement_form_time: null,
        movement_form_steps: null,
        movement_form_direction: null,
        movement_form_height: null
    },
    mounted() {
        axios.get("http://localhost:3000/movements", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
            this.movements = response.data
        })
    },
    methods: {
        formValues: function (movement) {
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

            data = {
                name: this.movement_form_name,
                steps: this.movement_form_steps,
                time: this.movement_form_time,
                direction: this.movement_form_direction,
                height: this.movement_form_height
            };

            axios.post("http://localhost:3000/movements/create", data);

            window.location.replace("/CocotteProject/views/moves.html");
        },

        updateMovement: function () {


            data = {
                name: this.movement_form_name,
                steps: this.movement_form_steps,
                time: this.movement_form_time,
                direction: this.movement_form_direction,
                height: this.movement_form_height
            };

            axios.put("http://localhost:3000/movements/" + this.movement_id + "/update", data);

            //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');
            location.reload();
        },

        deleteMovement: function (movement) {
            axios.delete("http://localhost:3000/movements/" + movement._id + "/delete");
            window.location.replace("/CocotteProject/views/moves.html");
        }
    }
});
