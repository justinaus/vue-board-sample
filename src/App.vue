<template>
  <div id="app">
    <Board :dataList='list' @onChangedPageNum='onChangedPageNum'>
      <template slot-scope="{rowData}">
        <SampleRow :rowData="rowData"></SampleRow>
      </template>
    </Board>
  </div>
</template>

<script>
import Board from './components/board/Board'
import SampleRow from './components/SampleRow'
import { mapState } from 'vuex'
import { GET_SAMPLE_LIST_ACTION } from '@/store/action-types'

export default {
  name: 'app',
  components: {
    Board,
    SampleRow
  },
  data() {
    return {
      rowCount: 10
    }
  },
  computed: {
    ...mapState({
      list: state => state.sampleList.dataList,
    })
  },
  methods: {
    onChangedPageNum( nPageNum ) {
      const startIndex = this.rowCount * ( nPageNum - 1 );

      const urlRest = `posts?_start=${ startIndex }&_limit=${ this.rowCount }`;

      this.$store.dispatch( GET_SAMPLE_LIST_ACTION, urlRest );
    }
  }
}
</script>

<style>

</style>
