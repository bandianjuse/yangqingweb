<template>
  <div class="concept">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <div class="main-block" v-html="contact">
      {{contact}}
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  ConceptItem from '../components/ConceptItem.vue'
  import  BannerView from '../components/BannerView.vue'
  import  FooterView from '../components/FooterView.vue'
  import  { confingDetails } from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'concept',
    data(){
      return {
        banner: {
          bgSrc: require('../assets/contact.jpg'),
          minTitle: 'CONTACT US',
          bigTitle: '联系·我们_'
        },
        contact : ''
      }
    },
    components: {
      HeaderView,
      BannerView,
      FooterView,
    },
    methods: {
      confingDetails(){
        let para = {
          id: 3
        };
        NProgress.start();
        confingDetails(para).then((res) => {
          this.contact = res.data.data.content;
          NProgress.done();
        });
      },
    },
    mounted() {
      this.confingDetails();
    }
  }
</script>
<style scoped>
  .main-block {
    padding:0 10%
  }

  .big-title{
    padding-top:80px;
    font-size:24px;
    color:#000;
    padding-bottom: 5px;
  }
  .small-title{
    color:#999;
  }
.main-block{
  padding-top:80px;
  padding-bottom: 150px;
}
</style>
