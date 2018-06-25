const ch = new Vue({
    el: '#app',
    data: {
        movements: [],
        choreographies: [],
        choreography_id: null,
        choreography_form_name: null,
        choreography_form_time: null,
        count_movements: 1
    },
    mounted() {
        axios.get("http://localhost:3000/choregraphies", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
            this.choregraphies = response.data
        });

        axios.get("http://localhost:3000/movements", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
            this.movements = response.data
        });

        $('#movementParams').hide();
    },
    methods: {
        formValues: function (choreography) {
            this.choreography_id = choreography._id;
            this.choreography_form_name = choreography.name;
            // this.choreography_form_time = choreography.btMac;
            // this.choreography_form_btPw = choreography.btPw;
        },

        createChoreography: function () {

            data = {
                name: this.choreography_form_name
            };

            axios.post("http://localhost:3000/choregraphies/create", data);

            window.location.replace("/CocotteProject/views/moves.html");
        },

        updateChoreography: function () {
            data = {
                name: this.choreography_form_name
            };

            axios.put("http://localhost:3000/choregraphies/" + this.choreography_id + "/update", data);

            //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');
            location.reload();
        },

        deleteChoreography: function (choreography) {
            axios.delete("http://localhost:3000/choregraphies/" + choreography._id + "/delete");
            window.location.replace("/CocotteProject/views/moves.html");
        },

        addMovement: function () {
            this.count_movements++;
        },

        showParams: function () {
            let element = $(event.target).parent().parent().parent().parent().parent();
            let params = element.children("#movementParams");

            if (params.is(":visible")) {
                $(event.target).removeClass('fa-arrow-circle-up');
                $(event.target).addClass('fa-arrow-circle-down');

                params.slideUp();
            } else {
                $(event.target).removeClass('fa-arrow-circle-down');
                $(event.target).addClass('fa-arrow-circle-up');

                params.slideDown();
            }
        },
    }
});
