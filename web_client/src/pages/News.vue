<template>
  <div class="news">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <div class="concept-title">
      <div class="big-title">动态·资讯</div>
      <div class="small-title">来自珠宝行业的精彩资讯</div>
    </div>
    <div class="main-block">
      <works-item v-bind:data="item" v-for="item in news" v-on:thumbUp="thumbUp" @showShare="showShare"></works-item>
    </div>
    <footer-view></footer-view>
    <share @close="closeShare" v-if="isShare"></share>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  WorksItem from '../components/WorksItem.vue'
  import  BannerView from '../components/BannerView.vue'
  import  FooterView from '../components/FooterView.vue'
  import  {getNewsList, worksThumbUp, newsThumbUp , confingDetails } from '../api/api'
  import NProgress from 'nprogress'
  import Share from '../components/Share'
  export default {
    name: 'concept',
    data(){
      return {
        banner: {
          bgSrc: '',
          minTitle: 'NEWS',
          bigTitle: '动态 · 资讯 _'
        },
        news: [],
        isShare : false
      }
    },
    components: {
      HeaderView,
      BannerView,
      WorksItem,
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
          categoryId: categoryId,
          size: 20
        };
        NProgress.start();
        getNewsList(para).then((res) => {
          if (categoryId == 1) {
            this.news = res.data.data;
          } else {
            this.concept = res.data.data;
          }
          NProgress.done();
        });
      },
      thumbUp(categoryId){
        if (categoryId) {
          this.getNewsList(1);
        }

      },
      confingDetails(){
        NProgress.start();
        confingDetails({id : 4}).then((res) => {
          this.banner.bgSrc = JSON.parse(res.data.data.content).news[0].url;
          NProgress.done();
        });
      }
    },
    mounted() {
      this.getNewsList(1);
      this.confingDetails();
    }
  }
</script>
<style scoped>
  .concept-title{
    padding: 0 15%;
  }

  .big-title {
    padding-top: 80px;
    font-size: 24px;
    color: #000;
    padding-bottom: 5px;
  }

  .small-title {
    color: #999;
  }

  .main-block {
    column-count: 3;
    column-gap: 30px;
    padding : 5% 15%;
  }

  @media screen and (max-width: 1440px) {
    .main-block{
      column-count: 2;
    }
  }
  @media screen and (max-width: 768px) {
    .concept-title {
      display: none;
    }

    .main-block {
      column-count: 1;
      padding : 10% 5%;
    }
  }
</style>
