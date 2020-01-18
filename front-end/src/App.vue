<template>
  <div class="container">
    <h1>
      Sportradar Exercise
      <div class="menu">
        <a @click="setAction('Form')" ref="form-link">Add</a>
        <a @click="setAction('Data')" ref="data-link">Show Data</a>
      </div>
    </h1>
    <div>
      <component :is="activeComponent" @added="onAdded"></component>
    </div>
    <notifications position="bottom right"/>
  </div>
</template>

<script>
import Form from '@/pages/Form'
import Data from '@/pages/Data'

export default {
  name: 'App',

  data () {
    return {
      currentAction: 'Form'
    }
  },

  computed: {
    activeComponent () {
      if (this.currentAction === 'Form') {
        return Form
      }
      return Data
    }
  },

  methods: {
    setAction (value) {
      this.currentAction = value
    },

    onAdded () {
      this.currentAction = 'Data'
    }
  }
}
</script>

<style>
div.container > h1 {
  border-bottom: 1px solid #fe0000;
}

div.container > h1 > div.menu {
  float: right;
}

div.container > h1 > div.menu > a {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
  text-decoration: none;
  cursor: pointer;
}

div.container > h1 > div.menu > a:hover {
  color: #fe0000;
  text-decoration: underline;
}
</style>
