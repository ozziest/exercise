<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
        v-for="page in source.last_page"
        :key="page"
        :class="{ 'active': page === source.current_page }"
        @click="goTo(page)">
        <a class="page-link" href="javascript:void(0)">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Paginator',

  props: ['source'],

  methods: {
    goTo (page) {
      this.$emit('change', page)
    }
  }
}
</script>
