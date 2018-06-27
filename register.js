const re = new Vue({
    el: '#app',
    data: {
        email: null,
        password: null,
        confirm_password: null,
        check_email: null,
        check_password: null
    },
    methods: {
        confirmRegister: function () {
            this.check_email = null;
            this.check_password = null;

            if (this.email !== null) {
                var checkemail = this.validEmail(this.email);
                console.log(checkemail);
            } else {
                this.check_email = "Veuillez saisir un email.";
            }

            if (this.password !== null && this.confirm_password !== null) {
                if (this.password === this.confirm_password) {
                    var checkpassword = true;
                } else {
                    var checkpassword = false;
                }
            }

            if (checkemail && checkpassword) {
                data = {
                    email: this.email,
                    password: this.password
                };

                axios.post("http://localhost:3000/register", data);
                // appel api
                window.location.replace("/CocotteProject/views/login.html");
            } else {
                if (!checkemail) { console.log('email ok');
                    this.check_email = "Veuillez entrer un email valide."
                }
                if (!checkpassword) { console.log('pass ok');
                    this.check_password = "Les mots de passes ne correspondent pas."
                }
            }

        },

        validEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
});
