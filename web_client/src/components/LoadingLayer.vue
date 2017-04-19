<template>
  <div>
    <div class="loading-layer">
      <div class="loading-logo">
        <div class="loading-img-b"><img src="../assets/logo2.svg"  /></div>
        <div class="loading-img-t"><img src="../assets/logo.svg"  /></div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    name: 'loading',
    data(){
      return {
        scrollWidth : $(document).width(),
        scrollHeight : $(document).height(),
        tiem : Math.round(Math.random()*10)  * 1000
      }
    },
    mounted(){
      let _this = this;
      $('.loading-layer').width(this.scrollWidth).height(this.scrollHeight);
      $('.loading-img-b,.loading-img-t').css({ left : (this.scrollWidth - 200) /2 , top : (this.scrollHeight - 200) /2});
      $('.loading-img-t').animate({ height : 53}, this.tiem,function(){
        $('.loading-img-b,.loading-img-t').hide();
        $('.loading-layer').animate({opacity : 0},500,function(){
          $(this).remove();
          _this.$emit('close');
        });
      })
    }
  }
</script>
<style scoped>
  .loading-layer {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #333;
  }
  .loading-logo{
    position: relative;
  }
  .loading-img-b{
    position: absolute;
    top:0;
    left:0;
  }
  .loading-img-t{
    position: absolute;
    top:0;
    left:0;
    height: 140px;
    overflow: hidden;
  }
</style>
