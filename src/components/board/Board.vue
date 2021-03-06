<template>
  <div>
    <table>
      <thead>
        <slot name="tr" />
      </thead>
      <tbody>
        <slot name="rows"></slot>
      </tbody>
    </table>
    <Pagination 
      :startPageIndex='startPageIndex'
      :showPageCount='showPageCount'
      :selectedPageIndex='currentPageIndex'
      :enabledFirst='enabledFirst'
      :enabledEnd='enabledEnd'
      :enabledPrevPage='enabledPrevPage'
      :enabledNextPage='enabledNextPage'
      :enabledPrevGroup='enabledPrevGroup'
      :enabledNextGroup='enabledNextGroup'
      @onClickPageNum='onClickPageNum'
      @onClickEndPage='onClickEndPage'
      @onClickPrevGroup='onClickPrevGroup'
      @onClickNextGroup='onClickNextGroup' />
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
    startPageIndex() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      const result = paginationGroupIndex * this.maxPaginationCount;
      return result;
    },
    showPageCount() {
      const endPageIndex = this.getEndPageIndex( this.startPageIndex );

      if( endPageIndex < 0 )  return 0;

      const result = endPageIndex - this.startPageIndex + 1;
      return result;
    },
    enabledFirst() {
      return this.currentPageIndex !== 0;
    },
    enabledEnd() {
      const lastPageIndex = this.getLastPageIndex();
      
      return this.currentPageIndex !== lastPageIndex;
    },
    enabledPrevPage() {
      return this.currentPageIndex > 0;
    },
    enabledNextPage() {
      const lastPageIndex = this.getLastPageIndex();
      
      return this.currentPageIndex < lastPageIndex;
    },
    enabledPrevGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      return paginationGroupIndex > 0;
    },
    enabledNextGroup() {
      const currentGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      const lastPageIndex = this.getLastPageIndex();
      const lastPageGroupIndex = this.getPaginationGroupIndex( lastPageIndex );

      return currentGroupIndex < lastPageGroupIndex;
    }
  },
  methods: {
    getPaginationGroupIndex( pageIndex ) {
      const result = Math.floor( pageIndex / this.maxPaginationCount );
      return result;
    },
    getEndPageIndex( startPageIndex ) {
      if( this.totalItemCount < 0 ) return -1;

      const lastPageIndex = this.getLastPageIndex();
      
      let maxPageIndex = startPageIndex + this.maxPaginationCount - 1;

      const result = Math.min( lastPageIndex, maxPageIndex );

      return result;
    },
    getLastPageIndex() {
      if( this.totalItemCount < 0 ) return 0;

      const result = Math.floor( ( this.totalItemCount - 1 ) / this.maxRowCount );
      return result;
    },
    onChangePage( pageIndex ) {
      this.$emit( 'onChangePage', pageIndex );
    },
    onClickPageNum( pageIndex ) {
      this.onChangePage( pageIndex );
    },
    onClickEndPage() {
      const lastPageIndex = this.getLastPageIndex();

      if( lastPageIndex < 0 ) {
        return;
      }

      this.onChangePage( lastPageIndex );
    },
    onClickPrevGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );
      const toGroupIndex = paginationGroupIndex - 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
    },
    onClickNextGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );
      const toGroupIndex = paginationGroupIndex + 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
    }
  }
}
</script>

<style scoped>

</style>
