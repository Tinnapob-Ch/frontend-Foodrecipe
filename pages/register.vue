<template>
  <div class="register-container">
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <v-toolbar class="toolba" color="greem" dark flat>
        <v-toolbar-title>register</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col md="12">
            <validation-provider v-slot="{ errors }" name="firstname" rules="required">
              <v-text-field
                v-model="firstname"
                label="ชื่อ"
                placeholder="ชื่อ"
                :error-messages="errors"
                outlined
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </v-col>
          <v-col md="12">
            <validation-provider v-slot="{ errors }" name="lastname" rules="required">
              <v-text-field
                v-model="lastname"
                label="นามสกุล"
                placeholder="นามสกุล"
                :error-messages="errors"
                outlined
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </v-col>
          <v-col md="12">
            <validation-provider v-slot="{ errors }" name="users" rules="required|email">
              <v-text-field
                v-model="users"
                label="email"
                placeholder="email"
                :error-messages="errors"
                outlined
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </v-col>
          <v-col md="12">
            <validation-provider v-slot="{ errors }" name="password" rules="required|numeric">
              <v-text-field
                v-model="password"
                label="password"
                placeholder="password"
                :error-messages="errors"
                outlined
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </v-col>
          <v-col md="12">
            <validation-provider v-slot="{ errors }" name="phone" rules="required|numeric">
              <v-text-field
                v-model="phone"
                label="โทรศัพท์"
                placeholder="โทรศัพท์"
                :error-messages="errors"
                outlined
              />
              <span class="error-message">{{ errors[0] }}</span>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn class="submit-button" type="submit">
              submit
            </v-btn>
            <v-btn class="black-button" color="primary" @click.prevent="blackToLogin">
              blackToLogin
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>

export default {
  layout: 'test',
  data () {
    return {
      firstname: '',
      lastname: '',
      users: '',
      password: '',
      phone: ''
    }
  },
  methods: {
    blackToLogin () {
      this.$router.push('/login')
    },
    onSubmit () {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          try {
            this.$axios.post(process.env.API_POSTUSER, {
              users: this.users,
              password: this.password
            }).then((res) => {
              console.log(res)
              const id = res.data.result.insertId
              console.log(id)
              this.$axios.post(process.env.API_POSTREGISTER, {
                firstname: this.firstname,
                lastname: this.lastname,
                phone: this.phone,
                s_id: id
              }).then((res) => {
                console.log(res)
                // this.firstname = ''
                // this.lastname = ''
                // this.users = ''
                // this.password = ''
                // this.phone = ''
                this.$router.push('/login')
              }).catch((err) => {
                console.log(err)
              })
            }).catch((err) => {
              console.log(err)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    }

  }
}
</script>

<style scoped>
  .register-container {
    display: flex;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-shadow: 0px 0px 10px;
    border: 1px solid #ccc;
  }
  .submit-button {
    color: green;
  }
  .v-form {
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    border-radius: 2px;
  }
  .black-button {
    right: -3%;
  }
</style>
