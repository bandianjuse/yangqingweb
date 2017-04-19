<script src="../../../service/app.js"></script>
<template>
  <div class="concept-item clearfix">
    <router-link :to="{name: 'details' , params : {type:3,id : data.id} }" class="pic"><img v-bind:src="data.imagePath"/></router-link>
    <div class="content">
      <router-link :to="{name: 'details' , params : {type:3,id : data.id} }" class="title">{{data.title}}</router-link>
      <div class="text">
        {{data.smallText}}
      </div>
      <div class="info">
        <div class="info-left"><span>{{data.likeNum}} 个喜欢</span><span>{{data.browseNum}} 次浏览</span></div>
        <div class="info-right">
          <a href="javascript:void(0)" @click="thumbUp(data.id,data.categoryId)" title="点赞" style="position: relative"
             v-bind:class="{ active: isActive }"><i class="iconfont icon-dianzan"></i><span class="jiao">+1</span></a>
          <a href="javascript:void(0);" title="分享" @click="showShare"><i class="iconfont icon-fenxiang"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  { newsThumbUp } from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'conceptItem',
    data(){
      return {
        isActive: false
      }
    },
    props: ['data'],
    methods: {
      newsThumbUp(id){
        NProgress.start();
        newsThumbUp({ id: id }).then((res) => {
          NProgress.done();

        });
      },
      thumbUp(id){
        let isThumbUp;
        isThumbUp = sessionStorage.getItem('thumbUpConcept');

        if (isThumbUp === null) {
          isThumbUp = id;
          this.newsThumbUp(id);
          this.$emit('thumbUpConcept');
        } else {
          let newIsThumbUp = isThumbUp.split(',');
          if (newIsThumbUp.indexOf(String(id)) == -1) {
            isThumbUp = isThumbUp + ',' + id;
            this.newsThumbUp(id);
            this.$emit('thumbUpConcept');
          }
        }
        sessionStorage.setItem('thumbUpConcept', isThumbUp);

        this.isActive = true;



      },
      showShare(){
        this.$emit('showShare')
      }
    }
  }
</script>
<style scoped>
  .concept-item {
    border: 1px solid #f5f5f5;
    margin-bottom: 30px;
    display: flex;
    flex-wrap : wrap;
    height: 280px;
    overflow: hidden;
    transition: all .5s;
  }
  .concept-item:hover{
    box-shadow: 0 0 15px #ddd;
  }
  .pic {
    display: block;
    overflow: hidden;
    flex : 6;
  }
  .pic img{
    width: 100%;
  }
  .content {
    padding:30px;
    flex : 5;
    position: relative;
  }

  .content .title {
    font-size: 24px;
    color: #000;
  }
  .content .title:hover{
    color:#fabe00;
  }

  .content .lab a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #999;
    color: #999;
    margin-right: 5px;

  }

  .content .text {
    color: #999;
    font-size: 15px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .info {
    font-size: 15px;
    display: flex;
    position: absolute;
  }
  .info-left span{
    margin-right:15px;
    flex : 1
  }
  .info-right {
    text-align: right;
    flex : 1
   }
  .info-right a{
    display: inline-block;
    margin-left:10px;
  }
  .info-right i{
    font-size:18px;
  }
  .info-right a:hover i{
    color:#fabe00;
  }
  .active .iconfont {
    color: #fabe00;
  }
  .jiao {
    position: absolute;
    left: 0;
    opacity: 0;
    color: #fabe00;
    font-size: 18px;
    width: 10px;

  }

  .active .jiao {
    animation: move 2s;
  }

  @keyframes move {
    0% {
      top: 0;
      left:0;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      top: -25px;
    }
  }

  @media screen and (min-width: 769px) {
    .info{
      bottom:30px;
      width: 94%;
    }
  }
  @media screen and (max-width: 768px) {

    .concept-item{
      height:100%;
    }
    .pic {
      flex :1 1 100%;
    }
    .pic img{
      width: 100%;
    }
    .content {
      flex :1 1 100%;
      padding:20px;
    }
    .content .text{

    }
    .info {
      position: relative;
    }
  }
</style>
