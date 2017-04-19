<template>
  <div id="app">
    <router-view v-if="open"></router-view>
    <loading-layer @close="close" v-else></loading-layer>
  </div>
</template>

<script>
  import LoadingLayer from './components/LoadingLayer.vue';
  export default {
    name: 'app',
    data(){
      return {
        open : false,
      }
    },
    methods : {
      close(){
        this.open = true;
        sessionStorage.setItem('loading',1);
      }
    },
    components: {
      LoadingLayer
    },
    mounted() {
      var loading = sessionStorage.getItem('loading');
      if(loading == 1){
        this.open = true;
      }
    }
  }
</script>

<style>
  .clearfix:after {
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    zoom: 1;
  }

  @font-face {font-family: 'webfont';
    src: url('//at.alicdn.com/t/zu4l4133vkc07ldi.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/zu4l4133vkc07ldi.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/zu4l4133vkc07ldi.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/zu4l4133vkc07ldi.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/zu4l4133vkc07ldi.svg#思源黑体-粗') format('svg'); /* iOS 4.1- */
  }
  .web-font{
    font-family:"webfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }



</style>
