<template>
  <div>
    <BarpageFoodland />
    <div class="button-container" />
    <button class="add" @click="openAddModal">
      Add Recipe
    </button>
    <table class="table-margin">
      <thead>
        <tr>
          <th>Name</th>
          <th>Recipes</th>
          <th>Food Type</th>
          <th>Food Picture</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recipe, index) in recipes" :key="index">
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.recipes }}</td>
          <td>{{ recipe.food_type }}</td>
          <!-- <td>{{ recipe.food_picture }}</td> -->
          <td>   <img class="my-5" :src="require('@/assets/uploads/food_recipes/' + (recipe.food_picture || 'def.jpg'))" width="300" height="150"></td>
          <td>
            <button @click="openEditModal(recipe)">
              Edit
            </button>
            <button @click="deleteRecipe(recipe.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Recipe</h2>
        <form @submit.prevent="editRecipe">
          <label for="name">Name:</label>
          <input id="name" v-model="selectedRecipe.name" type="text" required>

          <label for="recipes">Recipes:</label>
          <input id="recipes" v-model="selectedRecipe.recipes" type="text" required>

          <label for="food_type">Food Type:</label>
          <input id="food_type" v-model="selectedRecipe.food_type" type="text" required>

          <label for="foodEditImg">Food IMG:</label>
          <input
            v-if="!updatebutton"
            id="foodEditImg"
            v-model="selectedRecipe.food_picture"
            type="text"
            disabled
            required
          >

          <v-file-input
            v-else
            v-model="imgedit"
            accept="image/*"
            label="File input"
          />

          <button v-if="!updatebutton" @click.prevent="updatebutton = true">
            Update Image
          </button>
          <button v-else @click.prevent="updatebutton = false">
            Back
          </button>

          <button type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2>Add Recipe</h2>
        <form @submit.prevent="addRecipe">
          <label for="add-name">Name:</label>
          <input id="add-name" v-model="Addname" type="text" required>

          <label for="add-recipes">Recipes_input:</label>
          <input id="add-recipes" v-model="Addrecipes" type="text" required>

          <label for="add-food_type">Food Type:</label>
          <input id="add-food_type" v-model="Addfood_type" type="text" required>
          <v-file-input
            v-model="Addfood_picture"
            accept="image/*"
            label="File input"
          />
          <button type="submit">
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'test',
  data () {
    return {
      recipesa: [],
      showEditModal: false,
      updatebutton: false,
      showAddModal: false,
      selectedRecipe: {},
      imgedit: '',
      name: '',
      recipes: '',
      food_type: '',
      food_picture: '',
      Addname: '',
      Addrecipes: '',
      Addfood_type: '',
      Addfood_picture: null
    }
  },
  mounted () {
    this.fetchRecipes()
  },
  methods: {
    async fetchRecipes () {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log('test')
        const response = await this.$axios.$get(`${process.env.API_GETFOOD_RECIPS}/${user.id}`)
        this.recipes = response.result
        console.log(response)
      } catch (error) {
        console.error('Error getting recipes:', error)
      }
    },
    deleteRecipe (id) {
      this.$swal({
        title: 'แน่ใจหรอนุ่ม?',
        text: 'ถ้ามั่นใจแล้วกด OK นะจ๊ะ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.$axios.$delete(`${process.env.API_DELETERECIPES}/${id}`)
            console.log(response)
            this.fetchRecipes()
            this.$swal({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            })
            this.fetchRecipes()
          } catch (error) {
            console.error('Error deleting recipe:', error)
          }
        }
      })
    },
    openEditModal (recipe) {
      this.selectedRecipe = { ...recipe }
      this.showEditModal = true
    },
    closeEditModal () {
      this.showEditModal = false
    },
    async editRecipe () {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const fromData = new FormData()
        fromData.append('id', this.selectedRecipe.id)
        fromData.append('name', this.selectedRecipe.name)
        fromData.append('recipes', this.selectedRecipe.recipes)
        fromData.append('food_type', this.selectedRecipe.food_type)
        if (this.updatebutton) {
          fromData.append('food_picture', this.imgedit)
        } else {
          fromData.append('food_picture', this.selectedRecipe.food_picture)
        }
        fromData.append('sign_id', user.id)
        const response = await this.$axios.$put(process.env.API_EDITRECIPES, fromData)
        console.log(response)
        this.$swal({
          title: 'Success!',
          text: 'Recipe has been updated.',
          icon: 'success'
        })
        // this.fetchRecipes()
        this.closeEditModal()
        location.reload()
      } catch (error) {
        console.error('Error editing recipe:', error)
      }
    },
    openAddModal () {
      this.showAddModal = true
    },
    closeAddModal () {
      this.showAddModal = false
    },
    async addRecipe () {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const fromData = new FormData()
        fromData.append('name', this.Addname)
        fromData.append('recipes', this.Addrecipes)
        fromData.append('food_type', this.Addfood_type)
        fromData.append('food_picture', this.Addfood_picture)
        fromData.append('sign_id', user.id)
        const response = await this.$axios.$post(process.env.API_CREATERECIPES, fromData)
        console.log(response)
        this.$swal({
          title: 'Success!',
          text: 'Recipe has been added.',
          icon: 'success'
        })
        this.fetchRecipes()
        this.closeAddModal()
      } catch (error) {
        console.error('Error adding recipe:', error)
      }
    }
  }
}
</script>

<style scoped>
.button-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.table-margin {
  margin-top: 10px;
  width: 98%;
  margin-left: 20px;
  border-collapse: collapse;

}
.add{
  margin-top: 80px;
  margin-left: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;

}

th, td {
  border: 1px solid #ddd;
  padding: 8px;

}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #080808;
  color: white;

}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 50%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

label {
  display: block;
  margin-top: 10px;

}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button[type="submit"], button {
  background-color: #724caf;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button[type="submit"]:hover, button:hover {
  background-color: #4CAF50;
}
</style>
