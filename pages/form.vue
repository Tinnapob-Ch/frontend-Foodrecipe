<template>
  <div>
    <validation-observer>
      <v-form>
        <v-row>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="firstname" rules="required">
              <v-text-field
                v-model="firstname"
                label="ชื่อ"
                placeholder="ชื่อ"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="lastname" rules="required">
              <v-text-field
                v-model="lastname"
                label="นามสกุล"
                placeholder="นามสกุล"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-col md="4">
            <validation-provider v-slot="{ errors }" name="age" rules="required|numeric">
              <v-text-field
                v-model="age"
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
      firstname: '',
      lastname: '',
      age: ''
    }
  },
  methods: {
    onSubmit () {
      console.log(`${this.firstname} ${this.lastname} ${this.age}`)
    }
  }
}
</script>
