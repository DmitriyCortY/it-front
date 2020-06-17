// import router from '@/router'
import Axios from 'axios'

export default {
    state: {
        kit_data: []
    },
    mutations: {
        kit_data(state, payload) {
            state.kit_data = payload
        },
        drop_kit_data(state) {
            state.kit_data = []
        }
    },
    actions: {
        drop_kit_data({ commit }) {
            try {
                commit('drop_kit_data')
            } catch (e) {
                console.error(e)
            }
        },
        async kit_data({ commit }, kit_id) {
            try {
                let form_data = new FormData()
                form_data.append('id', parseInt(kit_id))
                let response = await Axios.post(
                    "http://ivan-tactical.conf/admin_kit_builder/get_attach_by_kit_id.php",
                    form_data
                )
                let data = response.data.data
                for (let i = 0; i < data.length; i++) {
                    if (parseInt(data[i].parent_product_point_id) === 0) {
                        delete data[i].parent_product_point_id
                    }
                    if (parseInt(data[i].parent_skeleton_point_id) === 0) {
                        delete data[i].parent_skeleton_point_id
                    }
                }
                commit('kit_data', data)
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        kit_data(state) {
            return state.kit_data
        }
    }
}