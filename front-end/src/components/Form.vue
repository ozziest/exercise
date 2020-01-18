<template>
  <div>
    <h4 ref="form-title">Create new author</h4>
    <div class="row justify-content-md-center">
      <div class="col col-md-6">
        <ValidationObserver ref="formValidationObserver">
          <form @submit.prevent="save">
            <h5 class="group-title">Author</h5>
            <ValidationProvider rules="required|max:50" name="Author Name" v-slot="{ errors }" ref="authorNameProvider">
              <div class="form-group">
                <label for="author-name">Name</label>
                <input class="form-control" type="text" id="author-name" v-model="form.author.name" />
                <div class="text-danger">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|min_value:0|max_value:120" name="Author Age" v-slot="{ errors }" ref="authorAgeProvider">
              <div class="form-group">
                <label for="author-age">Age</label>
                <input class="form-control" type="number" id="author-age" v-model="form.author.age" />
                <div class="text-danger">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|max:255" name="Author Address" v-slot="{ errors }" ref="authorAddressProvider">
              <div class="form-group">
                <label for="address">Address</label>
                <textarea class="form-control" rows="3" id="author-address" v-model="form.author.address"></textarea>
                <div class="text-danger">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>

            <h5 class="group-title">Book</h5>
            <ValidationProvider rules="required|max:50" name="Book Name" v-slot="{ errors }" ref="bookNameProvider">
              <div class="form-group">
                <label for="book-name">Name</label>
                <input class="form-control" type="text" id="book-name" v-model="form.book.name" />
                <div class="text-danger">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required" name="Book Release Date" v-slot="{ errors }" ref="bookReleaseDateProvider">
              <div class="form-group">
                <label for="book-release-date">Release Date</label>
                <input class="form-control" type="date" id="book-release-date" v-model="form.book.release_date" />
                <div class="text-danger">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>

            <button type="submit" class="btn btn-primary">
              Save!
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      },
      result: null
    }
  },

  methods: {
    async save () {
      if (await this.$refs.formValidationObserver.validate() === false) {
        return
      }

      const { data } = await axios.post('api/authors', this.form)
      this.result = data
      this.$emit('added')
    }
  }
}
</script>
