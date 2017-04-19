<template>
  <div class="concept">
    <header-view></header-view>
    <b-map-component></b-map-component>
    <div class="main-block" v-html="contact">
      {{contact}}
    </div>
    <div class="team">
      <div class="team-block">
        <div class="team-title">公司形象照片</div>
        <ul>
          <li v-for="item in photo">
            <a href="javascript:void(0)"><img :src="item.url"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  ConceptItem from '../components/ConceptItem.vue'
  import  BannerView from '../components/BannerView.vue'
  import  FooterView from '../components/FooterView.vue'
  import BMapComponent from '../components/BMapComponent.vue'
  import  { confingDetails } from '../api/api'
  import NProgress from 'nprogress'
  export default {
    name: 'contact',
    data(){
      return {
        banner: {
          bgColor: '#fabe00',
          minTitle: 'CONTACT',
          bigTitle: '联系 · 我们 _'
        },
        contact : '',
        photo : []
      }
    },
    components: {
      HeaderView,
      BannerView,
      FooterView,
      BMapComponent
    },
    methods: {
      confingDetails(){
        NProgress.start();
        confingDetails({id: 3}).then((res) => {
          this.contact = res.data.data.content;
        });
        confingDetails({id : 5}).then((res) => {
          this.photo = JSON.parse(res.data.data.content);
          NProgress.done();
        });
      },
    },
    mounted() {
      this.confingDetails();
    }
  }
</script>
<style scoped>
  .main-block{
    padding:5% 10% 5% 10%;
    line-height: 28px;
  }
  .team {
    background-color: #f9f9f9;
    color: #2e2e2e;
  }

  .team-block {
    padding-top: 5%;
  }

  .team-title {
    text-align: center;
    color:#666;
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


  @media screen and (max-width: 768px) {
    .team-block ul {
      padding: 10% 5%;
    }

    .team-block ul li {
      flex: 1 1 100%;
    }
    .team-block{
      padding-top: 10%;
    }

    .main-block{
      padding:10% 5%;
    }
  }
</style>
