// import Axios from "axios"

export default {
    state: {
        add_to_card_ids: []
    },
    mutations: {
        add_to_card(state, payload) {
            state.add_to_card_ids = payload
        }
    },
    actions: {
        async add_to_card({ commit }, payload) {
            try {
                // let form_data = new FormData()
                // form_data.append('products_ids', JSON.stringify(payload))
                // let response = await Axios.post(
                //     'url',
                //     form_data
                // )
                commit('add_to_card', payload)
                console.log(payload)
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {}
}