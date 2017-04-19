<template>
  <div class="layer">
    <div class="layer-m">
      <a href="javascript:void(0)" class="close" v-on:click="close">✕</a>
      <div class="content">
        <div class="title">
          {{jobDetails.name}}
        </div>
        <div class="time">发布时间：{{formatDate}}</div>
        <div class="text" v-html="jobDetails.content">
          {{jobDetails.content}}
        </div>
        <button class="apply-btn" @click="close">申请该职位</button>
      </div>
    </div>
    <div class="layer-box"></div>
  </div>
</template>
<script>
  import  $ from 'jquery'
  import util from '../common/js/util'
  export default {
    name: 'layer',
    data(){
      return {}
    },
    props : ['jobDetails'],
    methods : {
      close(){
        this.$emit('close')
      }
    },
    computed : {
      formatDate(){

        return  util.formatDate.format(new Date(this.jobDetails.createTime), 'yyyy-MM-dd');
      }
    },
    mounted(){
      var layerBox = $(".layer-box");
      var layerMain = $(".layer-m");
      layerBox.css({
        width: $(document).width(),
        height: $(document).height()
      });
      layerMain.css({
        left : ($(window).width() - layerMain.width()) / 2,
        top : $(document).scrollTop() + ($(window).height() - layerMain.height())/2
      })
    }

  }
</script>
<style scoped>
  .layer-box {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 900;
  }
  .layer-m{
    position: absolute;
    top: 0;
    left: 0;
    background-color:#fff;
    width: 50%;
    z-index: 999;
    border-radius:5px;
  }
  .close{
    position: absolute;
    background-color: #000;
    top:-55px;
    left:46%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    color:#fff;
    font-size:28px;
    text-align: center;
    border-radius: 25px;
    transition: all .5s;
  }
  .close:hover{
    background-color: #333;
    transform:rotate(180deg);
  }
  .content{
    padding:5%;
  }
  .content .title{
    font-size:24px;
    color:#000;
    padding-bottom:10px;
  }
  .content .time{
    font-size:13px;
    color:#999;
  }
  .content .text{
    padding-bottom: 30px;
    padding-top:30px;
    color:#333;
    font-size:16px;
    overflow: hidden;
    word-wrap: break-word;
  }
  .content .text p{
    padding-bottom: 10px;
  }
  .apply-btn{
    width: 150px;
    line-height: 50px;
    background-color: #fabe00;
    color:#333;
    font-size:16px;
    border: 0;
    border-radius:3px;
    cursor: pointer;
  }
  .apply-btn:hover{
    transition: all .5s;
    background-color: #fcca2c;
  }

  @media screen and (max-width: 768px) {
    .layer-m{
      width: 90%;
    }
    .apply-btn{
      width:100%;
    }
  }
</style>
