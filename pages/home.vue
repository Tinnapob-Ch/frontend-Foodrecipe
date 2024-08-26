<template>
  <div>
    <BarpageFoodland />
    <div class="user-info-container">
      <div class="user-info-box">
        <h2>User Information</h2>
        <v-text-field v-model="user.users" class="full-width" label="Users" readonly />
        <v-text-field v-model="user.firstname" class="full-width" label="Firstname" :readonly="!isEditing" />
        <v-text-field v-model="user.lastname" class="full-width" label="Lastname" :readonly="!isEditing" />
        <v-text-field v-model="user.phone" class="full-width" label="Phone" :readonly="!isEditing" />
        <v-btn small color="info" @click="toggleEdit">
          {{ isEditing ? 'Save' : 'Edit' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import BarpageFoodland from '../components/BarpageFoodland.vue'
export default {
  components: {
    BarpageFoodland
  },
  layout: 'test',
  data () {
    return {
      user: {
        users: '',
        firstname: '',
        lastname: '',
        phone: ''
      },
      isEditing: false
    }
  },
  mounted () {
    this.fetchUserData()
  },
  methods: {
    async fetchUserData () {
      try {
        const token = localStorage.getItem('token')
        const response = await this.$axios.$get(process.env.API_GETMEMBER, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        const users = JSON.parse(localStorage.getItem('user'))
        this.user.firstname = response.result[0].firstname
        this.user.lastname = response.result[0].lastname
        this.user.phone = response.result[0].phone
        this.user.users = users.users
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    toggleEdit () {
      this.isEditing = !this.isEditing
      if (!this.isEditing) {
        this.editRegister()
      }
    },
    async editRegister () {
      try {
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
        const response = await this.$axios.$patch(process.env.API_EDITREGISTER, {
          id: JSON.parse(localStorage.getItem('user')).id,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          phone: this.user.phone
        })
        // console.log(response)
        if (response.code === 1) {
          const res = await this.$axios.$patch(process.env.API_EDITSIGN_IN, {
            users: this.user.users,
            id: JSON.parse(localStorage.getItem('user')).id
          })
          console.log(res)
        }
      } catch (error) {
        console.error('Error editing register:', error)
      }
    }
  }
  // async editsign_in () {
  //   try {
  //     const response = await this.$axios.$patch('http://localhost:8000/earth/register/editsign_in', {
  //       users: this.user.users
  //     })
  //     console.log(response)
  //   } catch (error) {
  //     console.error('Error editing register:', error)
  //   }
  // }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

<style scoped>
.user-info-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.user-info-box {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;

}

.user-info-box h2 {
  margin-bottom: 20px;
  color: #cc4646;

}

.user-info-box v-btn {
  align-self: center;
  margin-top: 20px;

}

.full-width {
  width: 80%;
  margin: 10px 0;
}

</style>
