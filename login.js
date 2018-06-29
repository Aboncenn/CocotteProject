const lo = new Vue({
    el: '#app',
    data: {
        email: null,
        password: null,
        check_email: null,
        check_password: null,
        error: null
    },
    methods: {

        confirmLogin: function () {
            this.check_email = null;
            this.check_password = null;

            if (this.email !== null) {
                var checkemail = this.validEmail(this.email);
                console.log(checkemail);
            } else {
                this.check_email = "Veuillez saisir un email.";
            }

            if (this.password !== null) {
                var checkpassword = true;
            } else {
                this.check_password = "Veuillez saisir un mot de passe";
            }

            if (checkemail && checkpassword) {
                data = {
                    email: this.email,
                    password: this.password
                };

                document.cookie = "login=" + data.email;

                axios.post("http://localhost:3000/login", data).then((response) => {
                    console.log(response.data);
                    document.cookie = "token=" + response.data.token;
                    window.location.replace("/CocotteProject/views/puppets.html");
                }).catch((error) => {
                    if (error) { console.log('erreur');
                        this.error = "Vos identifiants sont incorrectes";
                    }
                });


            } else {
                if (!checkemail) { console.log('email ok');
                    this.check_email = "Veuillez entrer un email valide."
                }
                if (!checkpassword) { console.log('pass ok');
                    this.check_password = "Mot de passe erroné."
                }
            }

        },

        validEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
});
