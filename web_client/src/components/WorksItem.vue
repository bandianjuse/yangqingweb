<template>
  <div style="padding-top:10px">
    <div class="works-item">
      <router-link :to="{name: 'details',params:{id: data.id,type:data.categoryId == 1 ? 2 : 1 }}" class="pic">
        <img v-bind:src="data.imagePath"/>
      </router-link>
      <div class="content">
        <router-link   :to="{name: 'details',params:{id: data.id,type:data.categoryId == 1 ? 2 : 1 }}" class="title">{{data.name || data.title}}</router-link>
        <div class="lab" v-if="data.categoryId != 1">
          <a href="#" v-for="item in data.category">{{item.name}}</a>
        </div>
        <div class="text">
          {{data.smallText}}
        </div>
        <div class="info clearfix">
          <div class="info-left"><span>{{data.likeNum}} 个喜欢</span><span>{{data.browseNum}} 次浏览</span></div>
          <div class="info-right">
              <a href="javascript:void(0)" @click="thumbUp(data.id,data.categoryId)" title="点赞" style="position: relative"
                 v-bind:class="{ active: isActive }"><i class="iconfont icon-dianzan"></i><span class="jiao">+1</span></a>
              <a href="javascript:void(0);" title="分享" @click="showShare"><i class="iconfont icon-fenxiang"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  { worksThumbUp, newsThumbUp} from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'worksitem',
    data(){
      return {
        isActive: false
      }
    },
    props: ['data'],
    methods: {
      worksThumbUp(id){
        NProgress.start();
        worksThumbUp({ id: id }).then((res) => {
          NProgress.done();

        });
      },
      newsThumbUp(id){
        NProgress.start();
        newsThumbUp({ id: id }).then((res) => {
          NProgress.done();
        });
      },
      thumbUp(id, categoryId){
        if (categoryId != 1) categoryId = 0;

        let isThumbUp;
        if (categoryId) {
          isThumbUp = sessionStorage.getItem('thumbUpNews');
        } else {

          isThumbUp = sessionStorage.getItem('thumbUp');
        }

        if (isThumbUp === null) {
          isThumbUp = id;
          if (categoryId) {
            this.newsThumbUp(id);
          } else {
            this.worksThumbUp(id);
          }
          this.$emit('thumbUpConcept');
        } else {
          let newIsThumbUp = isThumbUp.split(',');
          if (newIsThumbUp.indexOf(String(id)) == -1) {
            isThumbUp = isThumbUp + ',' + id;
            if (categoryId) {
              this.newsThumbUp(id);
            } else {
              this.worksThumbUp(id);
            }
            this.$emit('thumbUp', categoryId);

          }
        }
        if (categoryId) {
          sessionStorage.setItem('thumbUpNews', isThumbUp);
        } else {
          sessionStorage.setItem('thumbUp', isThumbUp);
        }

        this.isActive = true;



      },
      showShare(){
        this.$emit('showShare')
      }
    },
  }
</script>
<style scoped>
  .works-item {
    border: 1px solid #f5f5f5;
    transition: all .5s;
    break-inside: avoid;
    margin-bottom:30px;
  }

  .works-item:hover {
    box-shadow: 0 0 15px #ddd;
  }

  .pic {
    display: block;

  }

  .pic img {
    width: 100%;
  }

  .content {
    padding: 30px;
  }

  .content .title {
    font-size: 24px;
    color: #000;
  }

  .content .title:hover {
    color: #fabe00;
  }

  .content .lab {
    padding-top: 20px;
  }

  .content .lab a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #999;
    color: #999;
    margin-right: 5px;

  }

  .content .lab a:hover {
    border: 1px solid #fabe00;
    color: #fabe00;
  }

  .content .text {
    color: #999;
    font-size: 15px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .info {
    font-size: 15px;
  }

  .info-left {
    float: left;
  }

  .info-left span {
    margin-right: 15px;
  }

  .info-right {
    float: right;
  }

  .info-right a {
    display: inline-block;
    margin-left: 10px;
  }

  .info-right i {
    font-size: 18px;
  }

  .info-right a:hover i {
    color: #fabe00;
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

  }

  .active .jiao {
    animation: move 2s;
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
    .content{
      padding:20px;
    }
  }
</style>
