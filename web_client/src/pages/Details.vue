<template>
  <div class="details">
    <header-view state="2"></header-view>
    <div class="details-content">
      <div class="content-head">
        <div class="title">{{details.name || details.title}}</div>
        <div class="date"><span>发布时间：{{formatDate}}</span><span v-if="type == 1">客户：{{details.customer}}</span>
          <!--<span v-if="type == 1">项目类型：</span>--></div>
      </div>
      <!--<div class="content-info">
        {{details.smallText}}
      </div>-->
      <div class="content-txt" v-html="details.content || details.newsText">
        {{details.content || details.newsText}}
      </div>
      <div class="content-like clearfix">
        <div class="info-left"><span>{{details.likeNum}} 个喜欢</span><span>{{details.browseNum}} 次浏览</span></div>
        <div class="info-right">
          <a href="javascript:void(0)" @click="thumbUp" title="点赞" style="position: relative"
             v-bind:class="{ active: isActive }"><i class="iconfont icon-dianzan"></i><span class="jiao">+1</span></a>
          <a href="javascript:void(0);" title="分享" @click="showShare"><i class="iconfont icon-fenxiang"></i></a>
        </div>

      </div>

      <router-link :to="{path: path}" class="link"><i class="iconfont icon-fenlei"></i> 查看所有</router-link>
    </div>
    <footer-view></footer-view>
    <share @close="closeShare" v-if="isShare"></share>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  ConceptItem from '../components/ConceptItem.vue'
  import  FooterView from '../components/FooterView.vue'
  import util from '../common/js/util'
  import Share from '../components/Share'
  import  {
    confingDetails,
    getWorksDetails,
    getNewsDetails,
    newsBrowse,
    worksBrowse,
    worksThumbUp,
    newsThumbUp
  } from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'concept',
    data(){
      return {
        type: 1,
        details: {},
        id: '',
        isActive: false,
        isShare : false
      }
    },
    components: {
      HeaderView,
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
      getDetails(){
        NProgress.start();
        if (this.type == 1) {
          getWorksDetails({ ids: this.id }).then((res) => {
            this.details = res.data.data[0];
            document.title = this.details.name + '_扬清' ;
            NProgress.done();
          });
        } else {
          getNewsDetails({ ids: this.id }).then((res) => {
            this.details = res.data.data[0];
            document.title = this.details.title + '_扬清' ;
            NProgress.done();
          });
        }

      },
      detailsBrowse(){
        if (this.type == 1) {
          worksBrowse({ id: this.id }).then((res) => {
            NProgress.done();
          });
        } else {
          newsBrowse({ id: this.id }).then((res) => {
            NProgress.done();
          });
        }
      },
      worksThumbUp(){
        NProgress.start();
        worksThumbUp({ id: this.id }).then((res) => {
          NProgress.done();

        });
      },
      newsThumbUp(){
        NProgress.start();
        newsThumbUp({ id: this.id }).then((res) => {
          NProgress.done();
        });
      },
      thumbUp(){
        let isThumbUp;
        if (this.type == 1) {
          isThumbUp = sessionStorage.getItem('thumbUp');
        } else if (this.type == 2) {
          isThumbUp = sessionStorage.getItem('thumbUpNews');
        }else{
          isThumbUp = sessionStorage.getItem('thumbUpConcept');
        }

        if (isThumbUp === null) {
          isThumbUp = this.id;
          this.type == 1 ? this.worksThumbUp(this.id) : this.newsThumbUp(this.id);
          this.getDetails();
        } else {
          let newIsThumbUp = isThumbUp.split(',');
          if (newIsThumbUp.indexOf(String(this.id)) == -1) {
            isThumbUp = isThumbUp + ',' + this.id;
            this.type == 1 ? this.worksThumbUp(this.id) : this.newsThumbUp(this.id);
            this.getDetails();
          }
        }

        if (this.type == 1) {
          sessionStorage.setItem('thumbUp', isThumbUp);
        } else if (this.type == 2) {
          sessionStorage.setItem('thumbUpNews', isThumbUp);
        }else{
          sessionStorage.setItem('thumbUpConcept',isThumbUp);
        }

        this.isActive = true;


      }
    },
    computed: {
      formatDate(){
        return util.formatDate.format(new Date(this.details.createTime), 'yyyy-MM-dd');
      },
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
    mounted() {
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
      this.detailsBrowse();
      this.getDetails();
    }
  }
</script>
<style scoped>
  .details-content {
    padding:10% 30% 10% 10%;
    margin-top: 65px;
  }

  .details-content .link {
    display: inline-block;
    font-size: 16px;
    background-color: #2e2e2e;
    color: #fff;
    padding: 8px 20px 5px 20px;
    border-radius: 3px;

    margin-top: 100px;
    transition: all .5s;
  }

  .details-content .link:hover {
    background-color: #666;
  }

  .details-content .link i {
    font-size: 30px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }

  .content-head {

  }

  .content-head .title {
    font-size: 24px;
    color: #000;
    padding-bottom: 15px;
  }

  .content-head .date {
    color: #999;
  }

  .content-head .date span {
    margin-right: 30px;
  }

  .content-info {
    border-bottom: 1px solid #ddd;
    padding-bottom: 25px;
  }

  .content-like {
    font-size: 13px;
    padding-top:15px;
  }

  .content-like .info-left {
    float: left;
  }

  .content-like .info-left span {
    margin-right: 15px;
  }

  .content-like .info-right {
    float: right;
  }

  .content-like .info-right a {
    display: inline-block;
    margin-left: 10px;
  }

  .content-like .info-right i {
    font-size: 18px;
  }

  .content-like .info-right a:hover i {
    color: #fabe00;
  }

  .content-like .active .iconfont {
    color: #fabe00;
  }

  .content-like .jiao {
    position: absolute;
    left: 0;
    opacity: 0;
    color: #fabe00;
    font-size: 18px;

  }

  .active .jiao {
    animation: move 2s;
  }

  .content-txt {
    font-family: PingFang SC;
    color:#333;
    padding: 30px 0;
    border-bottom:1px solid #ddd;
    overflow: hidden;
  }

  @keyframes move {
    0% {
      top: 0;
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

  @media screen and (max-width: 768px) {
    .details-content {
      padding:10% 5%;
      margin-top: 0;
    }
    .details-content .link{
      display: none;
    }
  }
</style>
<style>
  .content-txt img{
    max-width: 100%;
  }
</style>
