<template>
  <a @click="change" href="javascript:void(0)">
    {{ title }}
    <span v-if="!isActive" class="order-direction not-active">
      <span class="table-order-icon">-</span>
    </span>
    <span v-if="isActive" class="order-direction active">
        <span v-if="params.order_type === 'ASC'">A-Z</span>
        <span v-if="params.order_type === 'DESC'">Z-A</span>
    </span>
  </a>
</template>

<script>
export default {
  name: 'OrderTitle',

  props: ['params', 'title', 'field'],

  computed: {
    isActive () {
      return this.field === this.params.order_by
    },

    isASC () {
      return this.params.order_type === 'ASC'
    }
  },

  methods: {
    change () {
      if (!this.isActive) {
        return this.$emit('change', this.field, 'ASC')
      }

      if (this.isASC) {
        return this.$emit('change', this.field, 'DESC')
      }

      this.$emit('change', this.field, 'ASC')
    }
  }
}
</script>

<style>
span.order-direction {
  font-size: 12px;
}
</style>
