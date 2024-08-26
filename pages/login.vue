<template>
  <v-container fluid>
    <v-row class="align">
      <v-col md="6">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(Login)" />
          <v-card class="elevation-12">
            <v-toolbar color="greem" dark flat>
              <v-toolbar-title>
                Login
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <validation-observer>
                <v-form>
                  <v-row>
                    <v-col md="12">
                      <validation-provider v-slot="{ errors }" name="email" rules="required">
                        <v-text-field
                          v-model="users"
                          label="Email"
                          placeholder="Email"
                          :error-messages="errors"
                          prepend-icon="mdi-email"
                          required
                        />
                      </validation-provider>
                    </v-col>
                    <v-col md="12">
                      <validation-provider v-slot="{ errors }" name="password" rules="required">
                        <v-text-field
                          v-model="password"
                          label="Password"
                          placeholder="Password"
                          :error-messages="errors"
                          prepend-icon="mdi-lock"
                          type="password"
                          required
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        class="mr-4"
                        color="primary"
                        @click.prevent="Login"
                      >
                        Login
                      </v-btn>
                      <v-btn
                        class="mr-4"
                        color="primary"
                        @click.prevent="register"
                      >
                        Register
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  layout: 'test',
  data () {
    return {
      users: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    Login () {
      this.$axios.post(process.env.API_LOGINMEMBER, {
        users: this.users,
        password: this.password
      }).then((user) => {
        this.$router.push('/home')
        console.log(user)
        localStorage.setItem('token', user.data.token)
        localStorage.setItem('user', JSON.stringify(user.data.user))
      }).catch((err) => {
        console.log(err)
        this.$swal({
          position: 'top-end',
          icon: 'error',
          title: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(err)
      })
      console.log(this.users)
    }

  }
}
</script>

<style scoped>
    .align {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100vh;
    }

</style>
