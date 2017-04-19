<template>
  <!--<div id="allmap" style="width: 100%; height: {{mapHeight}}px"></div>-->
  <!--<div id="allmap":style="{width: '100%', height: mapHeight + 'px'}"></div>-->
  <div id="allmap" v-bind:style="mapStyle"></div>
</template>
<script>
  export default{
    data() {
      return {
        mapStyle: {
          width: '100%',
        },
        icon : require('../assets/wz.png')
      }
    },
    props: {
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 500
      }
      ,
      // 经度
      longitude: {
        type: Number,
        default: 114.134819
      }
      ,
      // 纬度
      latitude: {
        type: Number,
        default: 22.57288
      }
      ,
      description: {
        type: String,
        default: '深圳市罗湖区田贝四路邮政大厦5楼508室'
      }
    },
    mounted: function () {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(this.longitude, this.latitude);
      var icon = new BMap.Icon(this.icon, new BMap.Size(48, 48));
      var marker = new BMap.Marker(point,{
        icon: icon
      });

      map.addOverlay(marker);
      map.centerAndZoom(point, 15);
      // 信息窗的配置信息
      var opts = {
        width: 280,
        height: 50,
        title: "地址：",
      };
      var infoWindow = new BMap.InfoWindow(this.description, opts);// 创建信息窗口对象
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point);
      });
      map.enableScrollWheelZoom(true);
    }
  }
</script>
<style scoped>
  #allmap{
    height: 592px;
  }
  @media screen and (max-width: 768px) {
    #allmap{
      height:300px;
    }
  }
</style>
