<template>
  <fragment>
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
      :paginationCount='paginationCount'
      :startPageIndex='currentPageGroupIndex * paginationCount' 
      :selectedPageIndex='currentPageIndex' 
      @onClickPageNum='onClickPageNum' />
  </fragment>
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'Board',
  components: {
    Pagination
  },
  props: {
    dataList: Array
  },
  data() {
    return {
      currentPageIndex: -1,
      currentPageGroupIndex: 0,
      paginationCount: 10
    }
  },
  mounted() {
    this.changePageNum( 0 );
  },
  methods: {
    onClickPageNum( pageIndex ) {
      this.changePageNum( pageIndex );
    },
    changePageNum( pageIndex ) {
      this.currentPageIndex = pageIndex;

      this.currentPageGroupIndex = Math.floor( this.currentPageIndex / this.paginationCount );

      // 값을 바꾸지 말고, 데이터가 정상인 거 확인하고 나서 인덱스를 바꾸자.

      this.$emit( 'onChangedPageIndex', this.currentPageIndex );
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
