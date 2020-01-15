<template>
  <div>
    <h4 ref="form-title">Create new author</h4>
    <div class="form-container">
      <ValidationObserver ref="formValidationObserver">
        <form>
          <h4 class="group-title">Author</h4>
          <ValidationProvider rules="required|max:50" name="Author Name" v-slot="{ errors }" ref="authorNameProvider">
            <div class="form-group">
              <label for="author-name">Name</label>
              <input type="text" id="author-name" v-model="form.author.name" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" name="Author Age" v-slot="{ errors }" ref="authorAgeProvider">
            <div class="form-group">
              <label for="author-age">Age</label>
              <input type="text" id="author-age" v-model="form.author.age" maxlength="3" />
              <div class="error-text">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" name="Author Address" v-slot="{ errors }" ref="authorAddressProvider">
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
          <div class="form-group">
            <label for="book-release-date">Release Date</label>
            <input type="date" id="book-release-date" v-model="form.book.release_date" />
          </div>

          <button>
            Save!
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'

extend('required', required)
extend('max', max)

export default {
  name: 'Form',

  components: {
    ValidationObserver,
    ValidationProvider
  },

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
