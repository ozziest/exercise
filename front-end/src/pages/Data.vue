<template>
  <div>
    <h4>
      Showing Data
    </h4>
    <div v-if="result !== null" class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th width="1%">#</th>
            <th><OrderTitle @change="onChangeOrderType" :params="params" title="Author" field="name"></OrderTitle></th>
            <th><OrderTitle @change="onChangeOrderType" :params="params" title="Age" field="age"></OrderTitle></th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(author, index) in result.data">
            <tr :key="'row' + author.id">
              <td><b>{{ ((result.current_page - 1) * result.per_page ) + index + 1 }})</b></td>
              <td>{{ author.name }}</td>
              <td>{{ author.age }}</td>
              <td>{{ author.address }}</td>
              <td class="text-right">
                <button class="btn btn-secondary btn-sm" @click="openDetail(author)">
                  {{ author._is_detail_opened ? 'Hide' : 'Show' }} Books
                </button>
              </td>
            </tr>
            <tr :key="'detail' + author.id" v-if="author._is_detail_opened">
              <td></td>
              <td colspan="4">
                <div class="alert alert-warning" v-if="author.books.length === 0">
                  There is not any book of {{ author.name }} yet.
                </div>
                <table class="table table-dark" v-if="author.books.length > 0">
                  <tbody>
                    <tr v-for="(book, bookIndex) in author.books" :key="book.id">
                      <td width="1%">{{ bookIndex + 1 }})</td>
                      <td>{{ book.name }}</td>
                      <td>{{ book.release_date }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <Paginator :source="result" @change="onChangePage"></Paginator>
    </div>
  </div>
</template>

<script>
import Paginator from '@/components/Paginator'
import OrderTitle from '@/components/OrderTitle'
import axios from 'axios'

export default {
  name: 'Data',

  components: {
    Paginator,
    OrderTitle
  },

  data () {
    return {
      params: {
        page: 1,
        order_by: 'id',
        order_type: 'ASC'
      },
      result: null
    }
  },

  mounted () {
    this.fetch()
  },

  methods: {
    async fetch () {
      const { data } = await axios.get('api/authors', {
        params: this.params
      })
      data.data.forEach(author => { author._is_detail_opened = false })
      this.result = data
    },

    onChangePage (page) {
      this.params.page = page
      this.fetch()
    },

    onChangeOrderType (orderBy, orderType) {
      this.params.order_by = orderBy
      this.params.order_type = orderType
      this.fetch()
    },

    openDetail (author) {
      author._is_detail_opened = !author._is_detail_opened
    }
  }
}
</script>
