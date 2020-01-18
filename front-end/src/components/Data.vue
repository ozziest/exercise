<template>
  <div>
    <h4>
      Showing Data
    </h4>
    <div v-if="result !== null" class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th width="1%">#</th>
            <th>Author</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in result.data" :key="author.id">
            <td><b>{{ ((result.current_page - 1) * result.per_page ) + index + 1 }})</b></td>
            <td>{{ author.name }}</td>
            <td>{{ author.age }}</td>
            <td>{{ author.address }}</td>
          </tr>
        </tbody>
      </table>
      <Paginator :source="result" @change="fetch"></Paginator>
    </div>
  </div>
</template>

<script>
import Paginator from '@/components/Paginator'
import axios from 'axios'

export default {
  name: 'Data',

  components: {
    Paginator
  },

  data () {
    return {
      result: null
    }
  },

  mounted () {
    this.fetch()
  },

  methods: {
    async fetch (page) {
      const { data } = await axios.get('api/authors', {
        params: {
          page
        }
      })
      this.result = data
    }
  }
}
</script>
