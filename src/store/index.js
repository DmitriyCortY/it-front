import Vue from 'vue'
import Vuex from 'vuex'
// 
import start_load from "./start_load";
import base_data from "./base_data";
import kits_data from "./kits_data";
import skeleton_points from "./skeleton_points";
import communication from "./communication";
import add_to_card from "./add_to_card";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        start_load,
        base_data,
        kits_data,
        skeleton_points,
        communication,
        add_to_card
    }
})