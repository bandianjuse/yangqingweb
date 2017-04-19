<template>
  <div>
    <header>
      <div class="left-side">
        <router-link to="/" class="logo"><img src="../assets/logo.svg"/></router-link>
      </div>
      <div class="right-side">
        <ul class="nav">
          <li>
            <router-link to="/works">WORKS</router-link>
            <span class="bt"></span>
          </li>
          <li>
            <router-link to="/news">NEWS</router-link>
            <span class="bt"></span>
          </li>
          <li>
            <router-link to="/concept">CONCEPT</router-link>
            <span class="bt"></span>
          </li>
          <li>
            <router-link to="/service">SERVICE</router-link>
            <span class="bt"></span>
          </li>
        </ul>
      </div>
    </header>
    <div class="mobile-header">
      <header-view></header-view>
    </div>
   <!-- <a :href="banner.url" target="_blank" class="banner" :style="{ backgroundImage: 'url('+banner.img+')' }"></a>-->
   <div class="banner" >
     <a :href="bannerLeft.url" target="_blank" class="banner_left" :style="{ backgroundImage: 'url('+bannerLeft.img+')' }" ></a>
     <a :href="bannerRight.url" target="_blank" class="banner_right" :style="{ backgroundImage: 'url('+bannerRight.img+')' }" ></a>

   </div>
    <div class="mobile-banner">
      <img :src="bannerLeft.img" />
    </div>
    <div class="main">
      <div class="main-block" id="zp">
        <div class="layout">
          <works-item v-bind:data="item" v-for="item in works"  v-on:thumbUp="thumbUp" @showShare="showShare"></works-item>
        </div>
      </div>
      <div class="main-block news" id="xw" >
        <div class="layout" >
          <works-item v-bind:data="item" v-for="item in news" v-on:thumbUp="thumbUp" @showShare="showShare"></works-item>
        </div>
      </div>
      <div class="main-block concept" id="gd">
        <concept-item v-bind:data="item" v-for="item in concept" v-on:thumbUpConcept="thumbUpConcept" @showShare="showShare"></concept-item>
      </div>
      <div class="server-block" id="fw">
        <server-block :isClose="true"></server-block>
      </div>
    </div>
    <footer-view></footer-view>
    <nav-view></nav-view>
    <share @close="closeShare" v-if="isShare"></share>
  </div>

</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  WorksItem from '../components/WorksItem.vue'
  import  NavView from '../components/NavView.vue'
  import  ConceptItem from '../components/ConceptItem.vue'
  import  ServerBlock from '../components/ServerBlock.vue'
  import  FooterView from '../components/FooterView.vue'
  import  { confingDetails , getWorksList , getCategoryList ,getNewsList } from '../api/api'
  import NProgress from 'nprogress'
  import Share from '../components/Share'
  export default {
    name : 'home',
    data(){
      return {
        works : [],
        news : [],
        concept :[],
        bannerLeft : {},
        bannerRight : {},
        isShare : false
      }
    },
    methods : {
      closeShare(){
        this.isShare = false;
      },
      showShare(){
        this.isShare = true;
      },
      confingDetails(){
        let para = {
          id: 1
        };
        NProgress.start();
        confingDetails(para).then((res) => {
          let banner = JSON.parse(res.data.data.content);
          this.bannerLeft = {
            img : banner[0].fileList[0].url,
            url : banner[0].url,
          };
          this.bannerRight = {
            img : banner[1].fileList[0].url,
            url : banner[1].url,
          };

          NProgress.done();
        });
      },
      getWorksList(){
        let para = {
          size: 4
        };
        NProgress.start();
        getWorksList(para).then((res) => {
          let works = res.data.data;
          getCategoryList({size:100}).then((res) => {
            let categoryList = res.data.data;

            works.forEach((row,index,w) => {
              let categoryIdStr = row.categoryId;
              let categoryIdArr = categoryIdStr.substring(1,categoryIdStr.length-1).split(',');
              let category = [];
              for(let i=0;i<categoryIdArr.length;i++){
                categoryList.forEach((catRow) => {
                  let id = catRow.id;
                  let parentId = catRow.parentId;
                  if(id == parseInt(categoryIdArr[i])){
                    if(parentId){
                      category.push(catRow);
                    }
                  }
                });
              }
              works[index].category = category;

            });
            this.works = works;

            NProgress.done();
          });
        });
      },
      getNewsList(categoryId){
        let para = {
          categoryId: categoryId
        };
        NProgress.start();
        getNewsList(para).then((res) => {
          if(categoryId == 1){
            this.news = res.data.data;
          }else{
            this.concept = res.data.data;
          }
          NProgress.done();
        });
      },
      thumbUp(categoryId){
       if(categoryId){
         this.getNewsList(1);
       }else{
         this.getWorksList();
       }

      },
      thumbUpConcept(){
        this.getNewsList(2);
      }
    },
    components : {
      WorksItem,
      ConceptItem,
      ServerBlock,
      FooterView,
      NavView,
      HeaderView,
      Share,
    },
    mounted() {
      this.confingDetails();
      this.getWorksList();
      this.getNewsList(1);
      this.getNewsList(2);
    }
  }
</script>
<style scoped>
  header{
    display: flex;
  }
  .left-side, .right-side {
    flex: 1;
    height: 592px;
  }

  .left-side {
    background-color: #333;
    text-align: right;
  }
  .logo {
    display: block;
    padding-top: 40px;
    padding-right: 80px;
  }
  .logo img{
    width: 180px;
  }
  .right-side {
    background-color: #fabe00;
  }

  .nav {
    margin-top: 80px;
    margin-left: 80px;
    width: 206px;
    text-align: center;
  }
  .nav a{
    display: block;
    font-size: 28px;
    color:#000;
    padding:10px;
    transition: all .5s;
    text-align: center;
  }
  .nav .bt{
    display: block;
    height: 2px;
    background: #000;
    width: 0;
    margin-top:5px;
    margin-bottom:5px;
    position: relative;
    left: 100px;
    transition: all .5s;
  }
  .nav .active a{
    color:#000;
  }
  .nav .active .bt,.nav li:hover .bt{
    width: 200px;
    left: 0;
  }
  .nav li:hover a{
    color: #000;
  }
  .banner{
    display: flex;
    width: 100%;
    height: 592px;
  }
  .banner_left,.banner_right {
    flex:1;
    background-repeat: no-repeat;
  }
  .banner_left{
    background-image: url("../assets/home_banner_left.jpg");
    background-position: right center;
  }
  .banner_right{
    background-image: url("../assets/home_banner_right.jpg");
    background-position: left center;

  }
  .mobile-banner{
    display: none;
  }
  .main{
      margin : 0 15%;
     }
  .main-block{
    margin-top: 10%;
  }
  .layout{
    column-count: 3;
    column-gap : 30px;
  }

  .mobile-header{
    display: none;
  }

  @media screen and (max-width: 1440px) {
    .layout{
      column-count: 2;
    }
  }
  @media screen and (max-width: 768px) {
    header{
      display: none;
    }
    .main{
      margin : 0 5%;
    }
    .mobile-header{
      display: block;
    }
    .banner{
      display: none;
    }
    .mobile-banner{
      display: block;

    }
    .mobile-banner img{
      width: 100%;
    }
    .layout{
      column-count: 1;
      column-gap : 30px;
    }
  }
</style>
