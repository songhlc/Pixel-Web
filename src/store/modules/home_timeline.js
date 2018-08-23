import {
    HOME_TIMELINE,
    HOME_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/home-timeline'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    option: {
        refresh: false,
        page: 0
    }
}

const mutations = {

    [HOME_TIMELINE](state, data) {
    	debugger
        //save in state
        state.statuses = data
        state.option.page++
        logger('home-timeline', 'save store succeed !')
    },

    [HOME_REFRESH](state, refresh) {
        if(refresh){
            state.option.page = 0
        }
        state.option.refresh = refresh
        logger('home-timeline-refresh', state.option.refresh)
    }
}

const actions = {

    getHomeTimeline: ({ commit }, page) => {
        console.log('getHomeTimeline')
        if (page == 0) {
            commit(HOME_REFRESH, true)
        }else {
            commit(HOME_REFRESH, false)
        }
        api.getHomeTimeline(
            page,
            response => {
                commit(HOME_TIMELINE, response.list)
                commit(HOME_REFRESH, false)
            },
            err => {
                alert(err);
            }
        )
    }
}

export default {
    state,
    actions,
    mutations
}
