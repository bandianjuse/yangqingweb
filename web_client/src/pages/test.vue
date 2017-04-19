<template>
  <div>
    <button @click="testClick">点击</button>
    <chind></chind>
  </div>
</template>
<script>
  import Vue from 'Vue'
  var vm = new Vue();
  export default {
    name: 'test',
    data(){
      return {
        msm: 'testcontent',
        val : '4444'
      }
    },
    methods: {
      testClick(){
        vm.$emit('mm',this.val);
      }
    },
    components: {
      chind: {
        template: '<div>123</div>',
        data(){
          return {
           // val : '123'
          }
        },
        mounted(){
          vm.$on("mm", function (a) {
            console.log(a)
          });
        }
      },
    }
  }
</script>
