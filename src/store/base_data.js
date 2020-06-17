// import router from '@/router'
import Axios from 'axios'

export default {
    state: {
        base_data: []
    },
    mutations: {
        base_data(state, payload) {
            state.base_data = payload
        },
        drop_base_data(state) {
            state.base_data = []
        }
    },
    actions: {
        drop_base_data({ commit }) {
            try {
                commit('drop_base_data')
            } catch (e) {
                console.error(e)
            }
        },
        async base_data({ commit }, base_id) {
            try {
                let form_data = new FormData()
                form_data.append('id', parseInt(base_id))
                let response = await Axios.post(
                    "http://ivan-tactical.conf/base/attach_get.php",
                    form_data
                )
                let data = response.data.data
                for (let i = 0; i < data.length; i++) {
                    if (parseInt(data[i].parent_part_point_id) === 0) {
                        delete data[i].parent_part_point_id
                    }
                    if (parseInt(data[i].skeleton_point_id) === 0) {
                        delete data[i].skeleton_point_id
                    }
                }
                commit('base_data', data)
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        base_data(state) {
            return state.base_data
        }
    }
}