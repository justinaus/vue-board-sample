<template>
  <div>
    <button :disabled='!enabledFirst'>first</button>
    <button :disabled='!enabledPrevGroup'>-10</button>
    <button :disabled='!enabledPrevPage'>prev</button>
    <span v-for="n in showPageCount" :key='n'>
      <button 
        :class='{ selected: selectedPageIndex === startPageIndex + n - 1 }'
        @click="() => onClickNum( startPageIndex + n - 1 )">{{ startPageIndex + n }}</button>
    </span>
    <button :disabled='!enabledNextPage' @click='onClickNextPage'>next</button>
    <button :disabled='!enabledNextGroup'>+10</button>
    <button :disabled='!enabledEnd'>end</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    startPageIndex: Number, 
    showPageCount: Number,
    selectedPageIndex: Number,
    enabledFirst: Boolean,
    enabledEnd: Boolean,
    enabledPrevPage: Boolean,
    enabledNextPage: Boolean,
    enabledPrevGroup: Boolean,
    enabledNextGroup: Boolean,
  },
  methods: {
    onClickNum( pageIndex ) {
      this.$emit( 'onClickPageNum', pageIndex );
    },
    onClickNextPage() {
      this.$emit( 'onClickPageNum', this.selectedPageIndex + 1 );
    }
  }
}
</script>

<style scoped>
button {
  background-color: bisque;
  margin: 4px;
}

.selected {
  background-color: aquamarine;
}
</style>
