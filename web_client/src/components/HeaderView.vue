<template>
  <header id="head">
    <div class="logo"><router-link to="/"><img src="../assets/logo.svg"/></router-link></div>
    <div class="mobile-logo">
      <router-link to="/" v-if="!menuState"><img src="../assets/logo.svg"/> </router-link>
      <router-link :to="{path: path}" class="return-link" v-else><i class="iconfont icon-fanhui"></i> 查看所有</router-link>

    </div>

    <nav class="menu clearfix" :class="{ anim : isShowMenu}">
      <div class="menu-head">
        <a href="javascript:void(0)" @click="hidePcMenu" v-if="isShowPcMenu"><i class="iconfont icon-error"></i></a>
        <a href="javascript:void(0)" @click="showPcMenu" v-else><i class="iconfont icon-caidan"></i></a>

      </div>
      <ul :class="{active : isShowPcMenu}">
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
        <li>
          <router-link to="/join">JOIN</router-link>
          <span class="bt"></span>
        </li>
        <li>
          <router-link to="/contact">CONTACT</router-link>
          <span class="bt"></span>
        </li>
      </ul>
    </nav>
    <div class="mobile-head">
      <a href="javascript:void(0)" @click="open"><i class="iconfont icon-caidan"></i></a>
    </div>
    <div class="mobile-layer" @click="close" v-show="isShowMenu"></div>
  </header>

</template>
<script>
  import $ from 'jquery';
  export default {
    name: 'headerView',
    data(){
      return {
        type: 1,
        isShowMenu: false,
        menuState: '',
        isShowPcMenu : false
      }
    },
    props: ['state'],
    methods: {
      open(){
        let docHeight = $(document).height() - 65;
        $('.mobile-layer').width($(document).width());
        $('.mobile-layer').height(docHeight);
        $('.menu').height(docHeight);

        this.isShowMenu = !this.isShowMenu;
      },
      close(){
        this.isShowMenu = !this.isShowMenu;
      },
      showPcMenu(){
        sessionStorage.setItem('pcmenu',1);
        this.isShowPcMenu = true;
      },
      hidePcMenu(){
        sessionStorage.setItem('pcmenu',0);
        this.isShowPcMenu = false;
      }
    },
    computed: {
      path(){

        let path;
        if (this.type == 1) {
          path = '/works';
        } else if (this.type == 2) {
          path = '/news';
        } else if (this.type == 3) {
          path = '/concept'
        }
        return path;
       }
    },
    mounted(){
      this.type = this.$route.params.type;

      this.menuState = this.state;

      /*let pcmenu = sessionStorage.getItem('pcmenu');

      if(pcmenu == 1){
        this.isShowPcMenu = true;
        $('.menu ul li').addClass('active')
      }else{
        this.isShowPcMenu = false;
        sessionStorage.setItem('pcmenu',0);
        $('.menu ul li').removeClass('active')
      }*/

      let isAnimate = true;
      $(document).scroll(function() {
        let docTop = $(this).scrollTop();

          if(docTop < 65){
            isAnimate = true;
          }else{
            if(isAnimate){
              isAnimate = false;
              $('#head').stop().animate({top : '-65'}, 200,function(){
                $(this).stop().animate({top : '0'}, 500);

              })
            }
          }

      })
    }
  }
</script>
<style scoped>

  header {
    height: 65px;
    background-color: #333;
    padding: 0 0 0 5%;
    display: flex;
    overflow: hidden;
    position : fixed;
    top: 0;
    left: 0;
    width: 95%;
    z-index: 5000;
    /*transition: all .5s;*/
  }

  .logo, .mobile-logo {
    padding-top: 8px;
    flex: 1;
  }

  .mobile-logo {
    display: none;
  }

  .logo img, .mobile-logo img {
    width: 80px;
    position: relative;
    top: -15px;

  }
  .menu-head{
    width: 120px;
    float: right;
    text-align: right;
    display: block;
  }
  .menu-head i{
    font-size: 24px;
  }
  .mobile-layer {
    position: absolute;
    top: 65px;
    left: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, .3);
  }

  .mobile-head {
    display: none;
  }

  .return-link {
    display: block;
    color: #fff;
    padding-top: 12px;
    font-size: 16px;
  }
  @media screen and (min-width: 769px) {
    nav.menu {
      flex: 5;
    }

    nav.menu ul {
      display: flex;
      float: right;
    }

    nav.menu li {
      flex: 1;
      text-align: center;
      position: relative;
      transition-property: all;
      top:-80px;
      opacity: 0;
    }
    nav.menu li:nth-child(1){
      transition-duration : .5s;
    }
    nav.menu li:nth-child(2){
      transition-duration : .7s;
    }
    nav.menu li:nth-child(3){
      transition-duration : .8s;
    }
    nav.menu li:nth-child(4){
      transition-duration : 1.1s;
    }
    nav.menu li:nth-child(5){
      transition-duration : 1.3s;
    }
    nav.menu li:nth-child(6){
      transition-duration : 1.5s;
    }
    nav.menu ul.active li{
      top:0;
      opacity: 1;
    }
    nav.menu a {
      display: block;
      color: #fff;
      font-size: 18px;
      padding: 20px;
      transition: all 1s;
    }
    nav.menu li a{
      padding-top:22px;
    }
    nav.menu .bt {
      display: block;
      height: 2px;
      background: #fff;
      width: 0;
      position: relative;
      left: 50%;
      transition: all .5s;
    }

   /* nav.menu .router-link-active + */.bt, nav li:hover .bt {
      width: 100%;
      left: 0;
    }
  }

  @media screen and (max-width: 768px) {
    header{
      padding: 0 5%;
      width: 90%;
      position: static;
    }
    .logo {
      display: none;
    }
    .menu-head{
      display: none;
    }
    .mobile-logo {
      display: block;
    }

    .mobile-head {
      display: block;
      flex: 1;
      text-align: right;
    }

    .mobile-head a {
      display: block;
      color: #fff;
      padding-top: 20px;
    }

    .mobile-head a i {
      font-size: 26px;

    }

    nav.menu {
      position: absolute;
      width: 0;
      top: 65px;
      right: 0;
      z-index: 3000;
      background: #333;
      padding-top: 10px;
      transition: all .5s;
      overflow: hidden;
    }

    nav.menu.anim {
      width: 100px;
    }

    nav.menu a {
      text-align: center;
      display: block;
      padding: 15px;
      color: #fff;
      transition: all .5s;
    }

    nav.menu a:active {
      background: #666;
    }
  }

</style>
