<template>
  <div>
    <ul class="server-block" :class="{'home' : isClose}">
      <li v-for="(item, index) in service" @click="isActive(index)"><img :src="item.imagePath" class="head-img"/>
        <div class="head-txt">{{item.name}}</div>
      </li>
    </ul>
    <div v-if="!isClose">
      <div v-for="(item,index) in service" class="server-content" v-if="item.active">
        <div class="server-text" :style="bgTextChange(index)">
          <div class="text-main">
            <div class="big-title">{{item.name}}</div>
            <div class="text-content" v-html="item.content">
              {{item.content}}
            </div>
          </div>
        </div>
        <div class="case" :style="bgBlockChange(index)">
          <div class="case-block">
            <div class="case-title">相关案例</div>
            <ul>
              <li v-for="item in works">
                <router-link :to="{path: '/details/1/'+item.id}">
                  <img :src="item.imagePath"/>
                  <div class="case-name"><span>项目名称</span>{{item.name}}</div>
                </router-link >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  {getServiceList, getWorksDetails} from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'serverBlock',
    data(){
      return {
        service: [],
        works: []
      }
    },
    props: ['isClose'],
    methods: {
      getWorksDetails(ids){
        let para = {
          ids: ids
        };
        NProgress.start();
        getWorksDetails(para).then((res) => {
          this.works = res.data.data;
          NProgress.done();
        });

      },
      getServiceList(index){
        let para = {
          size: 5
        };
        NProgress.start();
        getServiceList(para).then((res) => {
          this.service = res.data.data;
          NProgress.done();
          for (let i = 0; i < this.service.length; i++) {
            this.service[i].active = false;
          }
          this.service[index].active = true;
          let worksId = this.service[index].worksId;
          this.getWorksDetails(worksId.substring(1, worksId.length - 1))
        });

      },
      isActive(index){
        if (!this.isClose) {
          this.getServiceList(index);

        }

      },
      bgTextChange: function (index) {
        let bgColor;
        switch(index)
        {
          case 1:
            bgColor = '#3d5afe';
            break;
          case 2:
            bgColor = '#9c27b0';
            break;
          case 3:
            bgColor = '#0097a7';
            break;
          case 4:
            bgColor = '#7dac37';
            break;
          default:
            bgColor = '#ef6c00';
        }
        return {backgroundColor:bgColor}
      },
      bgBlockChange: function (index) {
        let bgColor;
        switch(index)
        {
          case 1:
            bgColor = '#1c37aa';
            break;
          case 2:
            bgColor = '#7b1fa2';
            break;
          case 3:
            bgColor = '#006064';
            break;
          case 4:
            bgColor = '#4d8100';
            break;
          default:
            bgColor = '#c14907';
        }
        return {backgroundColor:bgColor}
      }
    },
    mounted(){
      this.getServiceList(0);

    }
  }
</script>
<style scoped>
  .server-block {
    display: flex;
    padding: 5% 15%;
  }
  .server-block.home{
    padding: 10% 5%;
  }
  .server-block li {
    cursor: pointer;
    text-align: center;
    padding:0 4% ;
    flex: 1;
  }
  .server-block li .head-img{
    width: 100%;
  }
  .server-block li:hover .head-img {
   /* transform: rotate(360deg);*/
  }

  .server-block li img {
    transition: all .5s;
  }

  .server-block li .head-txt {
    font-size: 14px;
    color: #999;
    padding-top: 20px;
  }

  .server-text {
    transition: all .5s;
    background-color: #4a68e8;
    color: #fff;
  }

  .big-title {
    padding:0 10%;
    font-size: 28px;

  }

  .text-main {
    padding:3% 0 5% 0;
  }

  .big-title span {
    display: block;
    width: 30px;
    margin-top: 10px;
    height: 2px;
    background-color: #fff;
  }

  .text-content {
      padding: 5% 15% 0 15%;
      line-height: 28px;
  }

  .text-content h3 {
    font-weight: normal;
    padding-bottom: 5px;
  }

  .text-content p {
    padding-bottom: 20px;
  }

  .case {
    background-color: #2943b1;
    color: #fff;
    transition: all .5s;
  }

  .case-block {
    padding-top: 5%;
  }

  .case-title {
    text-align: center;
    font-size: 28px;
  }

  .case-block ul {
    padding: 5% 15%;
    display: flex;
    flex-wrap : wrap;
  }

  .case-block ul li {
    flex: 0 1 30%;
    margin: 15px;
  }

  .case-block ul li img {
    width: 100%;
  }

  .case-block ul li {
    overflow: hidden;
  }

  .case-name {
    padding: 30px 20px 0 20px;
    height: 100px;
    font-size: 18px;
    background-color: #fff;
    position: relative;
    top: -5px;
  }

  .case-name span {
    color: #999;
    padding-right: 20px;
  }

  @media screen and (max-width: 768px) {
    .case-block{
      padding-top: 10%;
    }
    .case-block ul{
      padding: 10% 5%;
    }
    .case-block ul li{
      flex: 1 1 100%;
    }
    .big-title{
      text-align: center;
      padding: 10% 10% 0 5%;
    }
    .big-title span{
      display: none;
    }
    .text-content{
      padding:10% 10% 0 10%;
    }
    .server-block{
      padding:5%;
    }
    .server-block li{
      padding:0 2%;
    }
    .server-block li .head-txt {
      font-size: 12px;
      padding-top: 10px;
    }
  }
</style>
