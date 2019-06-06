<template>
  <fragment>
    <button>prev end</button>
    <button>prev</button>
    <fragment v-for="n in paginationCount" :key='n'>
      <button 
        :class='{ selected: selectedPageNum === n }'
        @click="() => onClickNum( n )">{{ n }}</button>
    </fragment>
    <button>next</button>
    <button>next end</button>
  </fragment>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    selectedPageNum: Number // start from 1
  }, 
  data() {
    return {
      paginationCount: 10
    }
  },
  methods: {
    onClickNum( n ) {
      this.$emit( 'onClickPageNum', n );
    }
  }
}
</script>

<style scoped>
button {
  background-color: bisque;
  margin: 10px;
}

.selected {
  background-color: aquamarine;
}
</style>
