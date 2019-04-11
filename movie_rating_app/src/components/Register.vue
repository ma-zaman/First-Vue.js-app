<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="fullname" :rules="fullnameRules" required ></v-text-field>
    <v-text-field label="Email" v-model="email" :rules="emailRules" required ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :rules="[rules.required, rules.min, rules.test]"
      :type="show1 ? 'text' : 'password'"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Confirm Password"
      v-model="confirm_password"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-btn @click="test" :disabled="!valid" >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    show1: false,
    rules: {
      required: value => !!value || 'Password is required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    e1: false,
    valid: true,
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
    fullnameRules: [
      (v) => !!v || 'Fullname is required'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      || 'E-mail must be valid'
    ]
  }),
  methods: {

    async submit () {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            fullname: this.fullname,
            email: this.email,
            password: this.password,
            confirm_password: this.confirm_password
          },
          url: '/users/register',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          this.$swal(
          'Great!',
          `You have been successfully registered!`,
          'success'
          )
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh oo!", `${message}`, "error")
        });
      }
    },
    clear () {
      this.$refs.form.reset()
    },

    test () {
      if (this.password === this.confirm_password) {
        submit();
      } else {
        this.$swal(
          'Oups!',
          `Password problem !`,
          'error'
        )
        this.confirm_password= '';
      }
    }
  }
}
</script>