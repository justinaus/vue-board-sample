import Vue from 'vue'
import Vuex from 'vuex'
import sampleList from './modules/sampleList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sampleList
  }
});