<template>
  <div class="banner" v-bind:style="{backgroundImage:'url('+banner.bgSrc+')',backgroundColor:''+banner.bgColor+''}">
    <div class="head"></div>
    <div class="title-block">
      <div class="title">
        <div class="min-title">{{banner.minTitle}}</div>
        <div class="big-title web-font">{{banner.bigTitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name : 'banner',
    data(){
      return {

      }
    },
    props : ['banner']
  }
</script>
<style scoped>
  .banner{

    position: relative;
    height: 592px;
    background-size: cover ;
    background-repeat: no-repeat;
    background-color: #fabe00;
    background-position: center 65px;
  }
  .head{
    height:65px;
    background-color: #333;
  }
  .title-block{

    margin: 0 5%;
  }
  .title{
    width: 360px;
    position: absolute;
    bottom:0;
    background-color: #fff;
    height: 60px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding:20px 40px;
  }
  .min-title{
    color:#999;
  }
  .big-title{
    padding-top:5px;
    font-size:33px;
    color:#000;
  }

  @media screen and (max-width: 768px) {
    .title{
      width: 200px;
    }
    .banner{
      height: 300px;
      background-position: center 0;

    }
    .head{
      display: none;
    }
  }
</style>
