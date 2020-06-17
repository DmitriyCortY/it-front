import router from '@/router'

export default {
    state: {
        current_base_data: {
            base_id: null,
            skeleton_id: null
        },
        selected_kit: {
            category: null,
            description: null,
            id: null,
            name: null,
            skeleton_id: null
        },
        selected_base: {
            category: null,
            description: null,
            id: null,
            name: null,
            skeleton_id: null
        }
    },
    mutations: {
        current_base_data(state, payload) {
            state.current_base_data.base_id = payload.base_id
            state.current_base_data.skeleton_id = payload.skeleton_id
        },
        selected_kit(state, payload) {
            state.selected_kit.category = payload.category ? payload.category : null
            state.selected_kit.description = payload.description ? payload.description : null
            state.selected_kit.id = payload.id ? payload.id : null
            state.selected_kit.name = payload.name ? payload.name : null
            state.selected_kit.skeleton_id = payload.skeleton_id ? payload.skeleton_id : null
        },
        selected_base(state, payload) {
            state.selected_base.category = payload.category ? payload.category : null
            state.selected_base.description = payload.description ? payload.description : null
            state.selected_base.id = payload.id ? payload.id : null
            state.selected_base.name = payload.name ? payload.name : null
            state.selected_base.skeleton_id = payload.skeleton_id ? payload.skeleton_id : null
        },
        drop_selected_kit(state) {
            state.selected_kit.category = null
            state.selected_kit.description = null
            state.selected_kit.id = null
            state.selected_kit.name = null
            state.selected_kit.skeleton_id = null
        },
        drop_selected_base(state) {
            state.selected_base.category = null
            state.selected_base.description = null
            state.selected_base.id = null
            state.selected_base.name = null
            state.selected_base.skeleton_id = null
        }
    },
    actions: {
        current_base_data({ commit }, payload) {
            try {
                commit('current_base_data', payload)
                router.push({ path: '/step-2' })
            } catch (e) {
                console.error(e)
            }
        },
        selected_kit({ commit, dispatch }, payload) {
            try {
                dispatch('drop_selected_kit')
                dispatch('drop_selected_base')

                commit('selected_kit', payload)
                router.push({ path: '/step-3' })
            } catch (e) {
                console.error(e)
            }
        },
        selected_base({ commit, dispatch }, payload) {
            try {
                dispatch('drop_selected_kit')
                dispatch('drop_selected_base')

                commit('selected_base', payload)
                router.push({ path: '/step-3' })
            } catch (e) {
                console.error(e)
            }
        },
        drop_selected_kit({ commit }) {
            try {
                commit('drop_selected_kit')
            } catch (e) {
                console.error(e)
            }
        },
        drop_selected_base({ commit }) {
            try {
                commit('drop_selected_base')
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        current_base_data(state) {
            return state.current_base_data
        },
        selected_kit(state) {
            return state.selected_kit
        },
        selected_base(state) {
            return state.selected_base
        },
        kit_or_base_data(state) {
            if (
                state.selected_base.category === null,
                state.selected_base.description === null,
                state.selected_base.id === null,
                state.selected_base.name === null,
                state.selected_base.skeleton_id === null
            ) {
                return {
                    ...state.selected_kit,
                    type: 'kit'
                }
            } else if (
                state.selected_kit.category === null,
                state.selected_kit.description === null,
                state.selected_kit.id === null,
                state.selected_kit.name === null,
                state.selected_kit.skeleton_id === null
            ) {
                return {
                    ...state.selected_base,
                    type: 'base'
                }
            }
        }
    }
}