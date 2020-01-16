<template>
  <div>
    <h4 ref="form-title">Create new author</h4>
    <div class="form-container">
      <ValidationObserver ref="formValidationObserver">
        <form @submit.prevent="save">
          <h4 class="group-title">Author</h4>
          <ValidationProvider rules="required|max:50" name="Author Name" v-slot="{ errors }" ref="authorNameProvider">
            <div class="form-group">
              <label for="author-name">Name</label>
              <input type="text" id="author-name" v-model="form.author.name" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required|min_value:0|max_value:120" name="Author Age" v-slot="{ errors }" ref="authorAgeProvider">
            <div class="form-group">
              <label for="author-age">Age</label>
              <input type="number" id="author-age" v-model="form.author.age" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required|max:255" name="Author Address" v-slot="{ errors }" ref="authorAddressProvider">
            <div class="form-group">
              <label for="address">Address</label>
              <textarea rows="3" id="author-address" v-model="form.author.address"></textarea>
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <h4 class="group-title">Book</h4>
          <ValidationProvider rules="required|max:50" name="Book Name" v-slot="{ errors }" ref="bookNameProvider">
            <div class="form-group">
              <label for="book-name">Name</label>
              <input type="text" id="book-name" v-model="form.book.name" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" name="Book Release Date" v-slot="{ errors }" ref="bookReleaseDateProvider">
            <div class="form-group">
              <label for="book-release-date">Release Date</label>
              <input type="date" id="book-release-date" v-model="form.book.release_date" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <button type="submit">
            Save!
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',

  data () {
    return {
      form: {
        author: {
          name: null,
          age: null,
          address: null
        },
        book: {
          name: null,
          release_date: null
        }
      }
    }
  },

  methods: {
    async save () {
      if (await this.$refs.formValidationObserver.validate() === false) {
        return
      }
      console.log('ok')
    }
  }
}
</script>

<style>
div.form-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

div.form-group {
  margin-bottom: 10px;
}

h4.group-title {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 3px;
  cursor: pointer;
}

input,
textarea {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  width: 100%;
}

button {
  background-color: #fe0000;
  color: white;
  border: 1px solid #fe0000;
  padding: 5px 10px;
  font-weight: bold;
}

div.error-text {
  font-size: 12px;
  color: #fe0000;
}
</style>
