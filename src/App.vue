<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
    <div class="b-constructor-steps b-main__steps">
      <div class="b-constructor-steps__inner">
        <div class="b-constructor-steps__col-left">
          <div class="b-constructor-steps__counter">
            <router-link class="b-constructor-steps__item" :to="{path: '/step-1'}" :class="[$router.currentRoute.path === '/step-1' ? 'active' : '']">
              1
            </router-link>
            <router-link class="b-constructor-steps__item" :to="{path: '/step-2'}" :class="[$router.currentRoute.path === '/step-2' ? 'active' : '',  $router.currentRoute.path === '/step-1' ? 'b-step-button-disable' : '']">
              2
            </router-link> 
            <router-link class="b-constructor-steps__item" :to="{path: '/step-3'}" :class="[$router.currentRoute.path === '/step-3' ? 'active' : '', $router.currentRoute.path === '/step-1' || $router.currentRoute.path === '/step-2' ? 'b-step-button-disable' : '']">
              3
            </router-link>
          </div>
        </div> 
        <div class="b-constructor-steps__col-right">
          <div class="b-constructor-steps__vertical-text">
            Step
          </div>
        </div>
      </div>
    </div>
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
    setInterval(() => {
      console.log(this.$router.currentRoute.path)
    }, 1000)
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
.b-constructor-steps__item{
  display: block;
}
.b-step-button-disable{
  pointer-events: none;
}
</style>