<template>
  <div>
    <v-row>
      <v-col md="4">
        ชื่อ: {{ form.firstname }}
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        นามสกุล: {{ form.lastname }}
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        อายุ: {{ form.age }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        firstname: this.$store.this.state.user.firstname,
        lastname: this.$store.this.state.user.lastname,
        age: this.$store.this.state.user.age
      }
    }
  },
  methods: {
    onedit () {
      this.$store.push('/test1')
    }
  }
}
</script>
