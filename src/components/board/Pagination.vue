<template>
  <div>
    <button :disabled='!enabledFirst' @click='onClickFirstPage'>first</button>
    <button :disabled='!enabledPrevGroup' @click='onClickPrevGroup'>&#60;</button>
    <button :disabled='!enabledPrevPage' @click='onClickPrevPage'>prev</button>
    <span v-for="n in showPageCount" :key='n'>
      <button 
        :class='{ selected: selectedPageIndex === startPageIndex + n - 1 }'
        @click="() => onClickNum( startPageIndex + n - 1 )">
          {{ startPageIndex + n }}
      </button>
    </span>
    <button :disabled='!enabledNextPage' @click='onClickNextPage'>next</button>
    <button :disabled='!enabledNextGroup' @click='onClickNextGroup'>&#62;</button>
    <button :disabled='!enabledEnd' @click='onClickEndPage'>end</button>
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
    dispatchPageClicked( toPageIndex ) {
      this.$emit( 'onClickPageNum', toPageIndex );
    },
    onClickNum( pageIndex ) {
      this.dispatchPageClicked( pageIndex );
    },
    onClickNextPage() {
      this.dispatchPageClicked( this.selectedPageIndex + 1 );
    },
    onClickPrevPage() {
      this.dispatchPageClicked( this.selectedPageIndex - 1 );
    },
    onClickFirstPage() {
      this.dispatchPageClicked( 0 );
    },
    onClickEndPage() {
      this.$emit( 'onClickEndPage' );
    },
    onClickPrevGroup() {
      this.$emit( 'onClickPrevGroup' );
    },
    onClickNextGroup() {
      this.$emit( 'onClickNextGroup' );
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
