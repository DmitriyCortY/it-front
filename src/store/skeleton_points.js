// import router from '@/router'
import Axios from 'axios'

export default {
    state: {
        skeleton_points: [],
    },
    mutations: {
        skeleton_points(state, payload) {
            state.skeleton_points = payload
        },
    },
    actions: {
        async skeleton_points({ commit }, skeleton_id) {
            try {
                commit('skeleton_points', [])
                let form_data = new FormData()
                form_data.append('id', parseInt(skeleton_id))
                let response = await Axios.post(
                    'http://ivan-tactical.conf/skeletons_points/get.php',
                    form_data
                )
                let data = response.data.data
                commit('skeleton_points', data)
            } catch (e) {
                console.error(e)
            }
        },
    },
    getters: {
        skeleton_points(state) {
            return state.skeleton_points
        },
    }
}