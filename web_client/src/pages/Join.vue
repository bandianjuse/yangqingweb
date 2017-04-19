<template>
  <div class="join">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <div class="miaosu" v-html="joinUs">
      {{joinUs}}
    </div>
    <div class="join-text">
      <div class="text-main">
        <div class="big-title">职位空缺</div>
        <div class="text-content">
          <a href="javascript:void(0)" @click="open(item.id)" v-for="item in join"><img :src="item.imagePath"/></a>
        </div>
      </div>
    </div>
    <div class="team">
      <div class="team-block">
        <div class="team-title">团队风采</div>
        <ul>
          <li v-for="item in team">
            <a href="javascript:void(0)"><img :src="item.imagePath"/>
              <div class="team-name"><span>{{item.name}}</span>{{item.job}}</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <layer v-if="isOpen" v-on:close="close" :jobDetails="jobDetails"></layer>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  BannerView from '../components/BannerView.vue'
  import  ServerBlock from '../components/ServerBlock.vue'
  import  FooterView from '../components/FooterView.vue'
  import  Layer from '../components/Layer.vue'
  import  {confingDetails, getJobList, getJobDetails, getTeamList  } from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'server',
    data(){
      return {
        banner: {
          bgSrc: '',
          minTitle: 'JOIN YANGQING',
          bigTitle: '加入 · 我们 _'
        },
        joinUs: '',
        join: [],
        jobDetails: '',
        team: [],
        isOpen: false
      }
    },
    components: {
      HeaderView,
      BannerView,
      ServerBlock,
      FooterView,
      Layer
    },
    methods: {
      confingDetails(){
        NProgress.start();
        confingDetails({id : 2}).then((res) => {
          this.joinUs = res.data.data.content;
          NProgress.done();
        });
        confingDetails({id : 4}).then((res) => {
          this.banner.bgSrc = JSON.parse(res.data.data.content).join[0].url;

        });
      },
      getJobList(){
        let para = {
          size: 4
        };
        NProgress.start();
        getJobList(para).then((res) => {
          this.join = res.data.data;
        });
      },
      getJobDetails(id){
        let para = {
          ids: id
        };
        NProgress.start();
        getJobDetails(para).then((res) => {
          this.jobDetails = res.data.data[0];
        });
      },
      getTeamList(){
        let para = {
          size: 24
        };
        NProgress.start();
        getTeamList(para).then((res) => {
          this.team = res.data.data;
        });
      },
      open(id){
        this.getJobDetails(id);
        this.isOpen = true;
      },
      close(){
        this.isOpen = false;
      }
    },

    mounted() {
      this.confingDetails();
      this.getJobList();
      this.getTeamList();
    }
  }
</script>
<style scoped>
  .miaosu {
    padding: 5% 10%;
    line-height: 30px;
  }

  .text-main {
    padding:3% 0 5% 0;
  }

  .join-text {
    background-color: #f9f9f9;
  }

  .big-title {
    font-size: 28px;
    padding: 0 10%;
    color: #333;
  }

  .big-title span {
    display: block;
    width: 26px;
    margin-top: 10px;
    height: 2px;
    background-color: #333;
  }

  .text-content {
    padding: 5% 15% 0 15%;
    display:flex;
  }

  .text-content img {
    width: 100%;
    border-radius: 3px;
  }

  .text-content a {
    margin: 0 15px;
    flex:0 1 25%;
  }

  .text-content h3 {
    font-weight: normal;
    padding-bottom: 5px;
  }

  .text-content p {
    padding-bottom: 20px;
  }

  .team {
    background-color: #fabe00;
    color: #2e2e2e;
  }

  .team-block {
    padding-top: 5%;
  }

  .team-title {
    text-align: center;
    font-size: 28px;
  }

  .team-block ul {
    padding: 5% 15%;
    display: flex;
    flex-wrap: wrap;
  }

  .team-block ul li {
    flex: 0 1 30%;
    margin: 15px;
  }

  .team-block ul li img {
    width: 100%;
  }

  .team-name {
    padding: 20px;

    font-size: 14px;
    background-color: #fff;
    position: relative;
    top: -5px;
  }

  .team-name span {
    color: #333;
    font-size: 18px;
    padding-right: 20px;
  }

  @media screen and (max-width: 768px) {
    .big-title {
      text-align: center;
      padding-top: 5%;
    }

    .big-title span {
      display: none;
    }

    .team-block ul {
      padding: 10% 5%;
    }

    .team-block ul li {
      flex: 1 1 100%;
    }

    .text-content {
      padding:10% 5% 0 5% ;
      flex-wrap: wrap;
    }
    .text-content a {
      margin: 0 10px 15px 10px;
      flex: 0 1 43%;
    }
    .team-block {
      padding-top: 10%;
    }
  }
</style>
