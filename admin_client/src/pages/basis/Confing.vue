<template>
  <el-tabs v-model="activeName" v-loading="listLoading"  @tab-click="handleClick">
    <el-tab-pane label="首页焦点图" name="first">
      <el-form ref="formBanner"  label-width="150px">
        <el-form-item label="左焦点图片：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessLeft"
            :file-list="bannerLeft.fileList"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="URL链接：">
          <el-input placeholder="请输入内容" v-model="bannerLeft.url" style="width:400px;">
          </el-input>
        </el-form-item>
        <el-form-item label="右焦点图片：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessRight"
            :file-list="bannerRight.fileList"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="URL链接：">
          <el-input placeholder="请输入内容" v-model="bannerRight.url" style="width:400px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bannerSubmit" :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <el-tab-pane label="栏目Banner" name="banner">
      <el-form ref="formBanner"  label-width="150px">
        <el-form-item label="WORKS：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessWorks"
            :file-list="column.works"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="NEWS：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessNews"
            :file-list="column.news"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="CONCEPT：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessConcept"
            :file-list="column.concept"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="SERVICE：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessService"
            :file-list="column.service"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="JOIN：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessJoin"
            :file-list="column.join"
            list-type="picture"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="columnSubmit" :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <el-tab-pane label="加入我们" name="second">
      <div style="padding:10px 30px;">
       <ueditor editorId="joinEdtior"></ueditor>
        <el-button type="primary" @click="joinUsSubmit" :loading="loading" style="margin-top:10px;">提交</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="联系我们" name="third">
      <div style="padding:10px 30px;">
        <ueditor editorId="contactEdtior" ></ueditor>
        <el-button type="primary" @click="contactUsSubmit" :loading="loading" style="margin-top:10px;">提交</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="公司形象照片" name="photo">
      <el-form ref="formBanner"  label-width="150px">
        <el-form-item label="图片图集：">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success = "handleSuccessPhoto"
            :file-list="photoList"
            list-type="picture"
            :on-remove="handleRemove"
            ref="upload"
            style="width:400px;">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="photoSubmit" :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import { editConfing ,getConfingList } from '../../api/api';
  import NProgress from 'nprogress'
  import Ueditor from '../../components/Ueditor.vue'
  import vm from '../../Vue.js'
  export default {
    data() {
      return {
        confing : [],
        loading : false,
        listLoading: false,
        activeName: 'first',
        bannerLeft : {},
        bannerRight : {},
        joinContent : '',
        contactContent : '',
        column : {},
        photoList : []

      }
    },
    methods: {
      handleSuccessLeft(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.bannerLeft.fileList = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessRight(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.bannerRight.fileList = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessWorks(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.column.works = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessNews(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.column.news = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessConcept(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.column.concept = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessService(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.column.service = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessJoin(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        this.column.join = [
          {
            name : name,
            url : path
          }
        ]
      },
      handleSuccessPhoto(response, file, fileList){
        let path =  response.path;
        let name = file.name;
        let photo =  {
          name : name,
          url : path
        };
        this.photoList.push(photo);
      },
      handleRemove(file, fileList){
        this.photoList = fileList;
      },
      bannerSubmit(){
        var banner = [];
        banner[0] = this.bannerLeft;
        banner[1] = this.bannerRight;
        let para = {
          id : 1,
          content : JSON.stringify(banner)
        };
        this.editConfing(para);
      },
      columnSubmit(){
        let para = {
          id : 4,
          content : JSON.stringify(this.column)
        };
        this.editConfing(para);
      },
      photoSubmit(){
        let para = {
          id : 5,
          content : JSON.stringify(this.photoList)
        };
        this.editConfing(para);
      },
      joinUsSubmit(){
        let para = {
          id : 2,
          content : this.$store.state.content
        };
        this.joinContent = para.content;
        this.editConfing(para)
      },
      contactUsSubmit(){
        let para = {
          id : 3,
          content : this.$store.state.content
        };
        this.contactContent = para.content;
        this.editConfing(para)
      },
      editConfing(para){
        this.loading = true;
        editConfing(para).then((res) => {
          this.loading = false;
          NProgress.done();
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          });
        });
      },
      getConfingList(){
        this.listLoading = true;
        NProgress.start();
        getConfingList({}).then((res) => {
          this.confing = res.data.data;
          var banner = JSON.parse(this.confing[0].content);
          var column =
          this.listLoading = false;
          this.bannerLeft = banner[0];
          this.bannerRight = banner[1];
          this.joinContent = this.confing[1].content;
          this.contactContent = this.confing[2].content;
          this.column = JSON.parse(this.confing[3].content);
          this.photoList = JSON.parse(this.confing[4].content);
          NProgress.done();
        });
      },

      handleClick(tab, event){
        if(tab.name == 'second'){
          this.$store.commit('setContent',this.joinContent);
        }else if(tab.name == 'third'){
          this.$store.commit('setContent',this.contactContent);
        }
      }
    },
    components: {
      Ueditor
    },
    mounted() {
      this.getConfingList();
    }
  }

</script>
<style>
  .el-upload__tip {
    padding: 10px 0;
  }
  .el-tabs__nav-prev{
    display: none;
  }
  .el-tabs__nav-next{
    display: none;
  }
</style>
