<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="firstname" rules="required">
              <v-text-field
                v-model="form.firstname"
                label="ชื่อ"
                placeholder="ชื่อ"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="lastname" rules="required">
              <v-text-field
                v-model="form.lastname"
                label="นามสกุล"
                placeholder="นามสกุล"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="age" rules="required|numeric">
              <v-text-field
                v-model="form.age"
                label="อายุ"
                placeholder="อายุ"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              class="mr-4"
              type="submit"
            >
              submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        // firstname: this.$store.state.user?.firstname,
        firstname: this.$store.state.user ? this.$store.state.user.firstname : '',
        lastname: this.$store.state.user ? this.$store.state.user.lastname : '',
        age: this.$store.state.user ? this.$store.state.user.age : ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.commit('PostUserData', this.form)
      this.$router.push('/test2')
    }
  }
}
</script>
