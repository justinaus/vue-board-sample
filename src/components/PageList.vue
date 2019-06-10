<template>
  <div>
    <Board 
      :dataList='list' 
      :currentPageIndex='currentPageIndex'
      :maxRowCount='MAX_ROW_COUNT'
      :maxPaginationCount='MAX_PAGINATION_COUNT'
      :totalItemCount='totalCount'
      @onChangePage='onChangePage'>
      <div slot="rows" v-for="item in list" :key="item.id">
        <slot name="row" :rowData="item" />
      </div>
    </Board>
  </div>
</template>

<script>
import Board from '@/components/board/Board'
import SampleService from '@/services/SampleService'

export default {
  name: 'PageList',
  components: {
    Board
  },
  props: {
    apiName: String
  },
  data() {
    return {
      MAX_ROW_COUNT: 5,
      MAX_PAGINATION_COUNT: 10,
      list: [],
      totalCount: -1,
      currentPageIndex: 0
    }
  },
  mounted() {
    this.checkPageByQuery();

    this.getData();
  },
  methods: {
    checkPageByQuery() {
      const currentPage = this.$route.query.page;
      if( !currentPage )  return;

      const nCurrentPage = parseInt( currentPage );
      if( !nCurrentPage ) return;

      const pageIndex = nCurrentPage - 1;

      this.currentPageIndex = pageIndex;

      // if( this.totalCount < 0 ) return;

      // const pageIndex = nCurrentPage - 1;

      // const lastPageIndex = Math.floor( ( this.totalCount - 1 ) / this.MAX_ROW_COUNT );

      // if( pageIndex < 0 || pageIndex > lastPageIndex ) {
      //   this.changeCurrentPageWithQuery( 0 );
      // } else {
      //   this.currentPageIndex = pageIndex;
      // }
    },
    getData: async function () {
      const startItemIndex = this.currentPageIndex * this.MAX_ROW_COUNT;

      // const urlRest = `/posts?_start=${ startItemIndex }&_limit=${ this.MAX_ROW_COUNT }`;
      const urlRest = `${ this.apiName }?_start=${ startItemIndex }&_limit=${ this.MAX_ROW_COUNT }`;

      const result = await SampleService.shared.getData( urlRest );

      this.list = result.list;
      this.totalCount = parseInt( result.totalCount );

      this.$emit( 'onChangedList', this.list );
    },
    onChangePage( nPageIndex ) {
      this.changeCurrentPageWithQuery( nPageIndex );

      this.getData();
    },
    changeCurrentPageWithQuery( nPageIndex ) {
      const params = {
        page: nPageIndex + 1
      }

      let query = Object.assign({}, this.$route.query, params)
      this.$router.replace({ query: query })

      this.currentPageIndex = nPageIndex;
    }
  }
}
</script>