<template>
  <div>
    <table>
      <thead>
        <slot name="tr" />
      </thead>
      <tbody>
        <!-- <fragment v-for="item in dataList" :key='item.id'> -->
        <fragment v-for="(item, index) in dataList" :key='index'>
          <slot name="row" :rowData='item'></slot>
        </fragment>
      </tbody>
    </table>
    <Pagination 
      :startPageIndex='startPageIndex'
      :showPageCount='showPageCount'
      :selectedPageIndex='currentPageIndex'
      :enabledFirst='true'
      :enabledEnd='true'
      :enabledPrevPage='true'
      :enabledNextPage='true'
      :enabledPrevGroup='true'
      :enabledNextGroup='true'
      @onClickPageNum='onClickPageNum' />
  </div>
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'Board',
  components: {
    Pagination
  },
  props: {
    dataList: Array,
    currentPageIndex: Number,
    maxRowCount: Number,
    maxPaginationCount: Number,
    totalItemCount: Number
  },
  computed: {
    paginationGroupIndex() {
      const result = Math.floor( this.currentPageIndex / this.maxPaginationCount );

      return result;
    },
    startPageIndex() {
      const result = this.paginationGroupIndex * this.maxPaginationCount;

      return result;
    },
    showPageCount() {
      if( this.totalItemCount === 0 ) {
        return 0;
      }
      let endPageIndex = this.startPageIndex + this.maxPaginationCount - 1;

      const lastItemIndex = this.totalItemCount - 1;

      if( endPageIndex > lastItemIndex ) {
        endPageIndex = lastItemIndex;
      }

      return endPageIndex - this.startPageIndex + 1;
    }
  },
  methods: {
    onClickPageNum( pageIndex ) {
      this.$emit( 'onClickPageNum', pageIndex );
    }
  }
}
</script>

<style scoped>
td {
  border-bottom: 1px solid green;
  height: 20px;
}
</style>
