const vm = new Vue({
    el: '#app',
    data: {
        choreographies: [],
        choreography_id: null,
        choreography_form_name: null,
        choreography_form_time: null

    },
    mounted() {
        axios.get("http://localhost:3000/choreographies", { headers : { "Access-Control-Allow-Origin" : "*" } }).then((response) => {
            console.log(response.data)
            this.choreographies = response.data
        })
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

            axios.post("http://localhost:3000/choreographies/create", data);

            window.location.replace("/CocotteProject/views/moves.html");
        },

        updateChoreography: function () {
            data = {
                name: this.choreography_form_name
            };

            axios.put("http://localhost:3000/choreographies/" + this.choreography_id + "/update", data);

            //$(location).attr('href', '/CocotteProject/views/puppets.html?update=ok');
            location.reload();
        },

        deleteChoreography: function (choreography) {
            axios.delete("http://localhost:3000/choreographies/" + choreography._id + "/delete");
            window.location.replace("/CocotteProject/views/moves.html");
        },

        addMovement: function (movement) {
            
        }
    }
});
