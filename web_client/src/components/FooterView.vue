<template>
  <footer>
    <div class="footer-main">
      <div class="footer-logo"><img src="../assets/logo.svg"/></div>
      <div class="footer-middle">
        <div class="left">
          <p>互联网时代，战场瞬息万变。商战从枪战换成了核战，争夺加剧，惨烈升级，每一个市场动作都可能决定战局，稍有不慎，灰飞烟灭。聪明的您应该意识到了，要找一名信得过的拥有核武器的伙伴！</p>
          <p>成为品牌信得过的伙伴——我们为此而生。广告行业日新月异，强者才能生存。如您所见，三年来，我们活得很体面。因为，我们只做一件事：帮客户占领更多市场！</p>
        </div>
        <div class="main">
          <div class="t">地址</div>
          <div class="c">广东 深圳市罗湖区田贝四路邮政大厦5楼508室</div>
          <div class="t">电话</div>
          <div class="c">+86 755 86108868</div>
          <div class="icon">
            <a href="#" class="wx" title="微信"><i class="iconfont icon-weixin"></i></a>
            <a href="#" class="wb" title="微博"><i class="iconfont icon-unie61d"></i></a>
            <a href="#" class="yx" title="邮箱"><i class="iconfont icon-youxiang"></i></a>
          </div>
        </div>
        <div class="right">
          <a href="#">作品</a>
          <a href="#">动态</a>
          <a href="#">观点</a>
          <a href="#">服务</a>
          <a href="#">加入</a>
          <a href="#">联系</a>
        </div>
      </div>
      <div class="copyright">
        Copyright © 2014 YangQing.All® Rights Reserved.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'footerView'
  }
</script>
<style scoped>
  footer {
    background-color: #2e2e2e;
  }

  .footer-main {
    margin: 0 auto;
    color: #ddd;
  }

  .footer-middle {
    display: flex;
    flex-wrap : wrap;
  }

  .footer-logo {
    padding:0 10%
  }
  .footer-logo img{
    width: 120px;
  }

  .footer-main .left, .footer-main .right, .footer-main .main {
    vertical-align: text-top;
  }

  .footer-main .left {
    flex: 4;
    padding: 0 3% 0 10%;
  }

  .footer-main .left p {
    padding-bottom: 20px;
  }

  .footer-main .main {
    border-left: 1px solid #4b4b4b;
    border-right: 1px solid #4b4b4b;
    padding: 0 3%;
    flex: 2;
  }

  .footer-main .main .t {
    font-size: 13px;
    padding-bottom: 10px;
  }

  .footer-main .main .c {
    font-size: 15px;
    color: #f1f1f1;
    padding-bottom: 20px;
  }

  .footer-main .icon a {
    display: inline-block;
    background-color: #fff;
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 22px;
    border-radius: 13px;
    margin-right: 5px;
  }

  .footer-main .icon a.wx:hover {
    color:#88b04b;
  }
  .footer-main .icon a.wb:hover {
    color:#e56464;
  }
  .footer-main .icon a.yx:hover {
    color:#59afef;
  }
  .footer-main .icon i {
    font-size: 18px;
  }

  .footer-main .right {
    flex: 1;
    padding:0 10% 0 3%;

  }

  .footer-main .right a {
    display: inline-block;
    font-size: 15px;
    padding: 0 15px 15px 15px;
    color: #f1f1f1;
  }

  .footer-main .right a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .copyright {
    padding:40px 10%;
    color: #999;
    font-size: 13px;
  }

  @media screen and (max-width: 768px) {
    .footer-main .left {
      flex: 1 1 100%;
      padding: 0  10%;
    }
    .footer-main .main {
      flex: 2;
      padding: 10% 5% 0 10%;
    }
    .footer-main .right {
      flex: 1;
      padding: 10% 10% 0 5%;
    }
  }
</style>
