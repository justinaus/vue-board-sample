<template>
  <fragment>
    <button>-10</button>
    <button>prev</button>
    <fragment v-for="n in paginationCount" :key='n'>
      <button 
        :class='{ selected: selectedPageIndex === startPageIndex + n - 1 }'
        @click="() => onClickNum( startPageIndex + n - 1 )">{{ startPageIndex + n }}</button>
    </fragment>
    <button @click='onClickNext'>next</button>
    <button>+10</button>
  </fragment>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    paginationCount:Number,
    startPageIndex:Number,
    selectedPageIndex: Number
  },
  methods: {
    onClickNum( pageIndex ) {
      this.$emit( 'onClickPageNum', pageIndex );
    },
    onClickNext() {
      this.$emit( 'onClickPageNum', this.selectedPageIndex + 1 );
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
