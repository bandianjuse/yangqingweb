<template>
  <div class="layer">
    <div class="layer-main">
      <div class="share_title">分享到</div>
      <div class="jiathis_style_32x32 jiathis_box ">
        <a class="jiathis_button_tsina tsina"  ><i  class="iconfont icon-unie61d"></i>新浪微博</a>
        <a class="jiathis_button_weixin weixin"><i class="iconfont icon-weixin"></i>微信</a>
        <a class="jiathis_button_fb fb"><i class="iconfont icon-web_fb"></i>Facebook</a>
        <a class="jiathis_button_googleplus googleplus"><i class="iconfont icon-google"></i>Google+</a>
      </div>
      <div class="share_loading">加载中……</div>
    </div>
    <div class="layer-box" @click="close"></div>
  </div>
</template>
<script>
  import  $ from 'jquery'
  export default {
    name: 'share',
    data(){
      return {}
    },
    //props : ['jobDetails'],
    methods : {
      close(){
        $('#jiathis').remove();
        this.$emit('close')
      },
      init: function () {
        let url = 'http://v3.jiathis.com/code/jia.js?uid=2130661';
        let script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('id', 'jiathis');
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },
    mounted(){

      this.init();
      var layerBox = $(".layer-box");
      var layerMain = $(".layer-main");
      layerBox.css({
        width: $(document).width(),
        height: $(document).height()
      });
      layerMain.css({
        left : ($(window).width() - layerMain.width()) / 2,
        top : $(document).scrollTop() + ($(window).height() - layerMain.height())/2
      })
      setTimeout(function(){
        $('.share_loading').hide();
      },2000)
    }

  }
</script>

<style>
  .layer-box {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9000;
  }
  .layer-main{
    position: absolute;
    top: 0;
    left: 0;
    background-color:#fff;
    width: 260px;
    height: 320px;
    z-index: 9990;
    border-radius:5px;
  }
  .jiathis_box{

  }
  .share_loading{
    position: absolute;
    top:0;
    left:0;
    background: #fff;
    z-index: 9991;
    width: 240px;
    height: 300px;
    padding:10px;
  }
  .jiathis_box a{
    display: block;
    clear: both;
    color:#333;
    padding:20px 0;
  }
  .jiathis_box a i{
    font-size:22px;
    border: 1px solid #ddd;
    padding: 4px;
    border-radius: 20px;
    margin-right:10px;
  }
  .jiathis_box a.tsina i{
    color:#e56464;
  }
  .jiathis_box a.weixin i{
    color:#88b04b;
  }
  .jiathis_box a.fb i{
    color:#33599d;
  }
  .jiathis_box a.googleplus i{
    color:#ee2e2c;
  }
  .jiathis_box a span{
    font-size:14px !important;
  }
  .jiathis_style_32x32 .jtico_tsina{
    background-position: 0 32px !important;
  }
  .jiathis_style_32x32 .jtico_weixin{
    background-position: 0 32px !important;
  }
  .jiathis_style_32x32 .jtico_fb{
    background-position: 0 32px !important;
  }
  .jiathis_style_32x32 .jtico_googleplus{
    background-position: 0 32px !important;
  }
  .share_title{
    padding: 20px 40px;
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    .layer-main{
      width: 90%;
    }
    .apply-btn{
      left:26%;
    }
  }
</style>
