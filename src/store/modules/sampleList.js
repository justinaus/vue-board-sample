import { SAMPLE_LIST_MUTATION } from '../mutation-types'
import { GET_SAMPLE_LIST_ACTION } from '../action-types'

export default {
  state: {
    dataList: []
  },
  actions: {
    async [ GET_SAMPLE_LIST_ACTION ] ( context, urlRest ) {
      const TEMP_URL = 'https://jsonplaceholder.typicode.com/' + urlRest;

      const result = await fetch( TEMP_URL )
      .then( response => response.json() )
      .catch( e => {
        console.log( 'error: ' + e.message );
      } );
      
      this.commit({
        type: SAMPLE_LIST_MUTATION,
        dataList: result || []
      });
    }
  },
  mutations: {
    [ SAMPLE_LIST_MUTATION ] (state, payload) {
      const arrRaw = payload.dataList;

      const arrPretty = arrRaw.map( ( row ) => {
        const titleRaw = row.title;
        const cutoff = 20;
        const titleEllipsis = titleRaw.length < cutoff ? titleRaw : titleRaw.substr(0, cutoff-1) + '...';

        const ret = {
          id: row.id,
          userId: row.userId,
          title: titleEllipsis,
          date: '2019-06-06'
        }
        return ret;
      });

      state.dataList = arrPretty;
    }
  }
}