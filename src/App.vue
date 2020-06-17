<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
    <!-- <div class="b-constructor-steps b-main__steps">
      <div class="b-constructor-steps__inner">
        <div class="b-constructor-steps__col-left">
          <div class="b-constructor-steps__counter">
            <div class="b-constructor-steps__item" :class="[$router.currentRoute === 1 ? 'active' : '', $router.currentRoute <= 1 ? 'b-step-button-disable' : '']" @click="select_step(1)">
              1
            </div>
            <div class="b-constructor-steps__item" :class="[$router.currentRoute === 2 ? 'active' : '', $router.currentRoute <= 2 ? 'b-step-button-disable' : '']" @click="select_step(2)">
              2
            </div> 
            <div class="b-constructor-steps__item" :class="[$router.currentRoute === 3 ? 'active' : '', $router.currentRoute <= 3 ? 'b-step-button-disable' : '']" @click="select_step(3)">
              3
            </div>
          </div>
        </div> 
        <div class="b-constructor-steps__col-right">
          <div class="b-constructor-steps__vertical-text">
            Step
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  destroyed(){
    this.$store.dispatch('drop_start_load')
  },
  created(){
    this.$store.dispatch('load_all_start_datas')
    this.$router.push({path: '/'})
  },
  watch: {
    
  },
  methods: {
    select_step(int){
      this.$router.push({
        path: `/step-${int}`
      })
    },
  },
  computed: {
    categoryes(){
      return this.$store.getters.categoryes
    },

    classes(){
      return this.$store.getters.classes
    },

    all_skeletons(){
      return this.$store.getters.all_skeletons
    },

    all_parts(){
      return this.$store.getters.all_parts
    },

    all_products(){
      return this.$store.getters.all_products
    },

    all_parts_points(){
      return this.$store.getters.all_parts_points
    },

    all_products_points(){
      return this.$store.getters.all_products_points
    },

    all_bases(){
      return this.$store.getters.all_bases
    },

    all_kits(){
      return this.$store.getters.all_kits
    },

    start_load_status(){
      return this.$store.getters.start_load_status
    },
  }
};
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>