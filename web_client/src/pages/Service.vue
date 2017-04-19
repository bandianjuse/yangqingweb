<template>
  <div class="server">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <server-block></server-block>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  BannerView from '../components/BannerView.vue'
  import  ServerBlock from '../components/ServerBlock.vue'
  import  FooterView from '../components/FooterView.vue'
  import NProgress from 'nprogress'
  import  {  confingDetails } from '../api/api'
  export default {
    name : 'server',
    data(){
      return {
        banner : {
          bgSrc : '',
          minTitle : 'SERVICE',
          bigTitle : '扬清 · 服务 _'
        },

      }
    },
    methods : {
      confingDetails(){
        NProgress.start();
        confingDetails({id : 4}).then((res) => {
          this.banner.bgSrc = JSON.parse(res.data.data.content).service[0].url;
          NProgress.done();
        });
      }
    },
    components : {
      HeaderView,
      BannerView,
      ServerBlock,
      FooterView
    },
    mounted() {
      this.confingDetails();
    }

  }
</script>
