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
      :enabledFirst='enabledFirst'
      :enabledEnd='true'
      :enabledPrevPage='true'
      :enabledNextPage='true'
      :enabledPrevGroup='true'
      :enabledNextGroup='true'
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
    paginationGroupIndex() {
      const result = Math.floor( this.currentPageIndex / this.maxPaginationCount );
      return result;
    },
    startPageIndex() {
      const result = this.paginationGroupIndex * this.maxPaginationCount;
      return result;
    },
    endPageIndex() {
      if( this.totalItemCount === 0 ) {
        return 0;
      }
      
      let result = this.startPageIndex + this.maxPaginationCount - 1;

      console.log( result );   // 9

      const lastItemIndex = this.totalItemCount - 1;

      if( result > lastItemIndex ) {
        result = lastItemIndex;
      }

      return result;
    },
    showPageCount() {
      const result = this.endPageIndex - this.startPageIndex + 1;
      return result;
    },
    enabledFirst() {
      return this.currentPageIndex !== 0;
    }
  },
  methods: {
    onChangePage( pageIndex ) {
      this.$emit( 'onChangePage', pageIndex );
    },
    onClickPageNum( pageIndex ) {
      this.onChangePage( pageIndex );
    },
    onClickEndPage() {
      if( this.totalItemCount === 0 ) {
        return;
      }

      const lastPageIndex = Math.floor( ( this.totalItemCount - 1 ) / this.maxRowCount );

      this.onChangePage( lastPageIndex );
    },
    onClickPrevGroup() {
      const toGroupIndex = this.paginationGroupIndex - 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
    },
    onClickNextGroup() {
      const toGroupIndex = this.paginationGroupIndex + 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
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
