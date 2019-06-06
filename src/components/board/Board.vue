<template>
  <fragment>
    <table>
      <thead>
        <slot name="tr" />
      </thead>
      <tbody>
        <fragment v-for="item in dataList" :key='item.id'>
          <slot name="row" :rowData='item'></slot>
        </fragment>
      </tbody>
    </table>
    <Pagination :selectedPageNum='currentPageNum' @onClickPageNum='onClickPageNum' />
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
      currentPageNum: -1
    }
  },
  mounted() {
    this.changePageNum( 1 );
  },
  methods: {
    onClickPageNum( pageNum ) {
      this.changePageNum( pageNum );
    },
    changePageNum( pageNum ) {
      this.currentPageNum = pageNum;

      this.$emit( 'onChangedPageNum', this.currentPageNum );
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
