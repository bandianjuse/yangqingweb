<template>
  <div class="news">
    <header-view></header-view>
    <banner-view v-bind:banner="banner"></banner-view>
    <div class="category clearfix">
      <a href="javascript:void(0)" @click="worksFilter(-1,-1)" class="category-item active">
        <span class="icon"></span>所有分类
      </a>
      <a href="javascript:void(0)" @click="worksFilter(item.id,index)" v-for="(item,index) in category"
         class="category-item">
        <span class="icon"></span>{{item.name}}
      </a>
    </div>
    <div class="main-block">
      <works-item v-bind:data="item" v-for="item in works" v-on:thumbUp="thumbUp" @showShare="showShare"></works-item>
    </div>
    <footer-view></footer-view>
    <share @close="closeShare" v-if="isShare"></share>
  </div>
</template>
<script>
  import  HeaderView from '../components/HeaderView.vue'
  import  WorksItem from '../components/WorksItem.vue'
  import  BannerView from '../components/BannerView.vue'
  import  FooterView from '../components/FooterView.vue'
  import  {getWorksList, getWorksQuery, getCategoryList, worksThumbUp, newsThumbUp, confingDetails} from '../api/api'
  import NProgress from 'nprogress'
  import Share from '../components/Share'
  import $ from 'jquery'
  export default {
    name: 'concept',
    data(){
      return {
        banner: {
          bgSrc: '',
          minTitle: 'WORKS',
          bigTitle: '扬清 · 作品 _',
        },
        works: [],
        category: [],
        isShare : false
      }
    },
    components: {
      HeaderView,
      BannerView,
      WorksItem,
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

      getWorksList(categoryId){
        let para = {
          categoryId: categoryId
        };
        NProgress.start();
        getWorksQuery(para).then((res) => {
          let works = res.data.data;
          getCategoryList({ size: 100 }).then((res) => {
            let categoryList = res.data.data;

            works.forEach((row, index, w) => {
              let categoryIdStr = row.categoryId;
              let categoryIdArr = categoryIdStr.substring(1, categoryIdStr.length - 1).split(',');
              let category = [];
              for (let i = 0; i < categoryIdArr.length; i++) {
                categoryList.forEach((catRow) => {
                  let id = catRow.id;
                  let parentId = catRow.parentId;
                  if (id == parseInt(categoryIdArr[i])) {
                    if (parentId) {
                      category.push(catRow);
                    }
                  }
                });
              }
              works[index].category = category;

            });
            this.works = works;

            NProgress.done();
          });
        });
      },
      getCategoryList(){
        let para = {
          parentId: 0,
          size: 50
        };
        NProgress.start();
        getCategoryList(para).then((res) => {
          NProgress.done();
          this.category = res.data.data;
        })
      },
      thumbUp(categoryId){
        this.getWorksList();
      },
      worksFilter(categoryId, index){
        $('.category-item').removeClass('active')
        if (index == -1) {
          $('.category-item').eq(0).addClass('active')
        } else {
          $('.category-item').eq(index + 1).addClass('active')
        }
        this.getWorksList(categoryId);
      },
      confingDetails(){
        NProgress.start();
        confingDetails({ id: 4 }).then((res) => {
          this.banner.bgSrc = JSON.parse(res.data.data.content).works[0].url;
          NProgress.done();
        });
      },
    },
    mounted() {
      this.getWorksList(-1);
      this.getCategoryList();
      this.confingDetails();
    }
  }
</script>
<style scoped>
  .main-block, .category {
    margin: 0 15%;
  }

  .main-block {
    column-count: 3;
    column-gap: 30px;
    padding-top: 5%;
    padding-bottom: 5%;
  }

  .category {
    padding-top: 100px;
  }

  .category-item.active {
    border-top: 2px solid #fabe00;
    color: #fabe00;
  }

  .category-item {
    border-top: 2px solid #ddd;
    padding-top: 10px;
    padding-right: 50px;
    display: block;
    font-size: 16px;
    float: left;
    transition: all .5s;
    margin-right: 20px;
  }

  .category-item:hover {
    color: #fabe00;
    border-top: 2px solid #fabe00;
  }

  .category-item:hover .icon {
    background-color: #fabe00;
  }

  .category-item .icon {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    display: inline-block;
    margin-right: 20px;
    background-color: #ddd;
    transition: all .5s;
  }

  .category-item.active .icon {
    background-color: #fabe00;
  }

  @media screen and (max-width: 1440px) {
    .main-block {
      column-count: 2;
    }
  }

  @media screen and (max-width: 768px) {
    .main-block, .category {
      margin: 0 5%;
    }

    .category {
      display: none;
    }

    .main-block {
      column-count: 1;
    }
  }
</style>
