<template>
  <div class="concept">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <div class="concept-title">
      <div class="big-title">扬清·观点</div>
      <div class="small-title">来自扬清的观点与见解</div>
    </div>
    <div class="main-block">
      <concept-item v-bind:data="item" v-for="item in concept" @showShare="showShare"></concept-item>
    </div>
    <footer-view></footer-view>
    <share @close="closeShare" v-if="isShare"></share>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  ConceptItem from '../components/ConceptItem.vue'
  import  BannerView from '../components/BannerView.vue'
  import  FooterView from '../components/FooterView.vue'
  import  { getNewsList , confingDetails } from '../api/api'
  import NProgress from 'nprogress'
  import Share from '../components/Share'
  export default {
    name: 'concept',
    data(){
      return {
        banner: {
          bgSrc: '',
          minTitle: 'CONCEPT',
          bigTitle: '扬清 · 观点 _'
        },
        concept : [],
        isShare : false
      }
    },
    components: {
      HeaderView,
      BannerView,
      ConceptItem,
      FooterView,
      Share
    },
    methods: {
      closeShare(){
        this.isShare = false;
      },
      showShare(){
        this.isShare = true;
      },
      getNewsList(categoryId){
        let para = {
          size:20,
          categoryId: categoryId
        };
        NProgress.start();
        getNewsList(para).then((res) => {
          this.concept = res.data.data;
          NProgress.done();
        });
      },
      confingDetails(){
        NProgress.start();
        confingDetails({id : 4}).then((res) => {
          this.banner.bgSrc = JSON.parse(res.data.data.content).concept[0].url;
          NProgress.done();
        });
      }
    },
    mounted() {
      this.getNewsList(2);
      this.confingDetails();
    }
  }
</script>
<style scoped>
  .concept-title{
    padding:0 15%;
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
  padding : 5% 15%;
}
  @media screen and (max-width: 768px) {
    .concept-title {
      display: none;
    }
    .main-block{
      padding:10% 5%;
    }
  }
</style>
