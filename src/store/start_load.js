import router from '@/router'
import Axios from 'axios'

export default {
    state: {
        // bases
        categoryes: [],
        classes: [],
        // all
        all_skeletons: [],
        all_parts: [],
        all_parts_points: [],
        all_products: [],
        all_products_points: [],
        all_bases: [],
        all_kits: [],
        // status
        start_load_status: false,
        // loader
        loader_counter: 0,
        output_loading_error: false
    },
    mutations: {
        //  bases
        categoryes(state, payload) {
            state.categoryes = payload
        },
        classes(state, payload) {
            state.classes = payload
        },
        //  all 
        all_skeletons(state, payload) {
            state.all_skeletons = payload
        },
        all_parts(state, payload) {
            state.all_parts = payload
        },
        all_parts_points(state, payload) {
            state.all_parts_points = payload
        },
        all_products(state, payload) {
            state.all_products = payload
        },
        all_products_points(state, payload) {
            state.all_products_points = payload
        },
        all_bases(state, payload) {
            state.all_bases = payload
        },
        all_kits(state, payload) {
            state.all_kits = payload
        },
        // status
        start_load_status(state) {
            state.start_load_status = true
            if (router.currentRoute.name === 'Home') {
                router.push({ path: '/step-1' })
            }
        },
        // drop
        drop_start_load(state) {
            state.categoryes = []
            state.classes = []
            state.all_skeletons = []
            state.all_parts = []
            state.all_parts_points = []
            state.all_products = []
            state.all_products_points = []
            state.all_bases = []
            state.all_kits = []
            state.start_load_status = false
        },
        loader_counter(state) {
            state.loader_counter++
        },
        output_loading_error(state) {
            state.output_loading_error = true
        }
    },
    actions: {
        drop_start_load({ commit }) {
            try {
                commit('drop_start_load')
            } catch (e) {
                console.error(e)
            }
        },
        async load_all_start_datas({ commit, dispatch, state }) {
            try {
                // classes
                let classes_response = await Axios.post("http://ivan-tactical.conf/classes/get_all.php")
                commit('classes', classes_response.data.data)

                // categoryes
                let categoryes_response = await Axios.post("http://ivan-tactical.conf/categoryes/get.php")
                commit('categoryes', categoryes_response.data.data)

                // skeletons
                let skeeltons_response = await Axios.post("http://ivan-tactical.conf/skeleton/get_all.php")
                commit('all_skeletons', skeeltons_response.data.data)

                // parts
                let parts_response = await Axios.post("http://ivan-tactical.conf/part/get_all.php")
                await dispatch('all_parts_points', parts_response.data.data)
                commit('all_parts', parts_response.data.data)

                // products
                let products_response = await Axios.post("http://ivan-tactical.conf/product/get_all.php")
                await dispatch('all_products_points', products_response.data.data)
                commit('all_products', products_response.data.data)

                // bases
                let bases_response = await Axios.post("http://ivan-tactical.conf/base/get_all.php")
                commit('all_bases', bases_response.data.data)

                // kits
                let kits_response = await Axios.post("http://ivan-tactical.conf/admin_kit_builder/get_all.php")
                commit('all_kits', kits_response.data.data)

                // status
                commit('start_load_status')
            } catch (e) {
                console.error(e)
                if (state.loader_counter < 3) {
                    setTimeout(() => {
                        dispatch('load_all_start_datas')
                    }, 5000)
                    dispatch('loader_counter')
                } else {
                    dispatch('output_loading_error')
                }
            }
        },
        async all_parts_points({ commit }, list_ids) {
            try {
                let form_data = new FormData()
                let list = []
                list_ids.forEach(item => {
                    list.push(
                        parseInt(
                            item.id
                        )
                    )
                })
                form_data.append('ids', JSON.stringify(list))
                let response = await Axios.post(
                    'http://ivan-tactical.conf/parts_points/get_by_list_ids.php',
                    form_data
                )
                let data = response.data.data
                commit('all_parts_points', data)
                return true
            } catch (e) {
                console.error(e)
                return false
            }
        },
        async all_products_points({ commit }, list_ids) {
            try {
                let form_data = new FormData()
                let list = []
                list_ids.forEach(item => {
                    list.push(
                        parseInt(
                            item.id
                        )
                    )
                })
                form_data.append('ids', JSON.stringify(list))
                let response = await Axios.post(
                    'http://ivan-tactical.conf/products_points/get_by_list_ids.php',
                    form_data
                )
                let data = response.data.data
                commit('all_products_points', data)
                return true
            } catch (e) {
                console.error(e)
                return false
            }
        },
        loader_counter({ commit }) {
            try {
                commit('loader_counter')
            } catch (e) {
                console.error(e)
            }
        },
        output_loading_error({ commit }) {
            try {
                commit('output_loading_error')
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        // bases
        categoryes(state) {
            return state.categoryes
        },
        classes(state) {
            return state.classes
        },
        // all
        all_skeletons(state) {
            return state.all_skeletons
        },
        all_parts(state) {
            return state.all_parts
        },
        all_products(state) {
            return state.all_products
        },
        all_parts_points(state) {
            return state.all_parts_points
        },
        all_products_points(state) {
            return state.all_products_points
        },
        all_bases(state) {
            return state.all_bases
        },
        all_kits(state) {
            return state.all_kits
        },
        // status
        start_load_status(state) {
            return state.start_load_status
        },
        output_loading_error(state) {
            return state.output_loading_error
        }
    }
}