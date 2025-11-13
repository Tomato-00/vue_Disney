<template>
  <div class="index-page">
    <HeaderCom
      :logo-image="logoImage"
      :nav-items="navItems"
      @open-login="openLogin"
      @open-register="openRegister"
    />
    <div class="wrapper">
      <div class="main">
        <div class="slider">
          <div class="slider-container">
            <img src="@/assets/images/home/1.jpg" alt="Disney carousel 1" class="active" />
            <img src="@/assets/images/home/2.jpg" alt="Disney carousel 2" />
            <img src="@/assets/images/home/3.jpg" alt="Disney carousel 3" />
            <img src="@/assets/images/home/4.jpg" alt="Disney carousel 4" />
          </div>
          <div class="slider-dots">
            <div class="slider-dot active"></div>
            <div class="slider-dot"></div>
            <div class="slider-dot"></div>
            <div class="slider-dot"></div>
          </div>
          <div class="slider-btn prev">❮</div>
          <div class="slider-btn next">❯</div>
        </div>
        <div class="txt">
          <p>点击顶部导航跳转可了解更多~</p>
        </div>
      </div>
      <div class="news">
        <div class="title">
          <h2>新闻速览</h2>
          <a href="">more &gt;</a>
        </div>
        <div class="hua">
          <div class="left">
            <ul>
              <li>
                <div class="cap">
                  <strong>·香港迪士尼业绩创新高</strong>:度假区内酒店使用率均超九成，相比2018年同期大幅改善。
                </div>
              </li>
              <li>
                <div class="cap">
                  <strong>·上海迪士尼票务与年卡调整</strong>:2024年11月24日起实行六级票价结构。
                </div>
              </li>
              <li>
                <div class="cap">
                  <strong>·迪士尼剧集推迟</strong>：2025年3月21日，据韩媒报道，因金秀贤与已故女演员金赛纶相恋的争议不断发酵，迪士尼决定推迟金秀贤主演的电视剧《山寨人生》上映。
                </div>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="news-slider">
              <div class="news-slider-container">
                <img src="@/assets/images/home/news/news.jpg" alt="Disney news 1" />
                <img src="@/assets/images/home/news/news (2).jpg" alt="Disney news 2" />
                <img src="@/assets/images/home/news/news (3).jpg" alt="Disney news 3" />
                <img src="@/assets/images/home/news/news (4).jpg" alt="Disney news 4" />
                <img src="@/assets/images/home/news/news (5).jpg" alt="Disney news 5" />
                <img src="@/assets/images/home/news/news.jpg" alt="Disney news 1 repeat" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="focus">
        <div class="title">
          <h2>Disney聚焦</h2>
          <a href="">more &gt;</a>
        </div>
        <div class="content">
          <div class="left">
            <img src="@/assets/images/home/火灾.jpg" title="奥兰多迪士尼火灾" alt="奥兰多迪士尼乐园火灾" />
            <strong>奥兰多迪士尼乐园火灾</strong>
            <p>
              当地时间3月22日下午，美国佛罗里达州奥兰多迪士尼乐园"艾波卡特"园区的法国馆发生火灾，由馆内步入式冷却器着火引发。奥兰多迪士尼乐园度假区于1971年开业，是全球规模最大的迪士尼度假区。
            </p>
          </div>
          <div class="right">
            <img src="@/assets/images/home/上迪动态.jpg" title="上海迪士尼动态" alt="上海迪士尼动态" />
            <strong>上迪动态</strong>
            <p>
              2月21日，上海迪士尼度假区启动"上迪梦想产业学院"，旨在与高校合作，共同培育旅游业高质量人才；其第三座主题酒店建设在1月取得新里程碑，离打造多日游玩度假区体验、提供更丰富住宿选择更近一步。
            </p>
          </div>
        </div>
      </div>
      <div class="subscribe">
        <div class="title">
          <h2>相关订阅</h2>
          <a href="">more &gt;</a>
        </div>
        <div class="what">
          <ul>
            <li>
              <a href="">
                <div class="biaoti">
                  <h3>迪士尼乐园资讯订阅</h3>
                </div>
              </a>
              <div class="neirong">
                <p>- 推出迪士尼乐园的官方资讯订阅服务，包括乐园的最新活动、季节性庆典、新游乐设施的开放信息等。</p>
                <hr />
                <p>- 为订阅用户提供专属的入园优惠，如门票折扣、优先预订权等。</p>
                <hr />
                <p>- 可分享乐园内的精彩瞬间照片和视频至官网平台。</p>
              </div>
            </li>
            <li>
              <a href="">
                <div class="biaoti">
                  <h3>迪士尼商品目录订阅</h3>
                </div>
              </a>
              <div class="neirong">
                <p>- 定期向订阅用户发送迪士尼商品目录，涵盖玩具、服装、饰品、家居用品等各类官方授权商品。</p>
                <hr />
                <p>- 提供新品预告和限量版商品的抢购信息，满足粉丝的收藏需求。</p>
                <hr />
                <p>- 推出订阅用户专享的购物折扣和满减活动。</p>
              </div>
            </li>
            <li>
              <a href="">
                <div class="biaoti">
                  <h3>迪士尼主题内容创作订阅</h3>
                </div>
              </a>
              <div class="neirong">
                <p>- 针对迪士尼的主题内容创作，如动画制作、故事写作等方面，提供专业的课程和教程订阅服务。</p>
                <hr />
                <p>- 邀请迪士尼的专业创作者分享创作经验和幕后故事，让订阅用户深入了解迪士尼的创作文化。</p>
                <hr />
                <p>- 举办线上创作比赛，为订阅用户提供展示作品的平台和机会，优秀作品有机会获得官方认可和奖励。</p>
              </div>
            </li>
            <li>
              <a href="">
                <div class="biaoti">
                  <h3>迪士尼会员专属内容订阅</h3>
                </div>
              </a>
              <div class="neirong">
                <p>- 设立迪士尼会员制度，会员订阅后可享受专属的内容，如独家的幕后纪录片、未公开的动画片段、角色访谈等。</p>
                <hr />
                <p>- 为会员提供个性化的推荐内容，根据用户的浏览历史和收藏偏好，推送相关的迪士尼作品和资讯。</p>
                <hr />
                <p>- 举办会员专属的线上线下活动，如线上直播见面会、线下粉丝聚会等。</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderCom from "@/components/Header/HeaderCom.vue";
import headerLogo from "@/assets/images/logo.jpg";

export default {
  name: "IndexPage",
  components: {
    HeaderCom,
  },
  data() {
    return {
      logoImage: headerLogo,
      navItems: [
        { label: "首页", to: "/" },
        { label: "乐园资讯", href: "./乐园资讯.html" },
        { label: "相关影视", href: "./相关影视.html" },
        { label: "周边商城", to: "/shop" },
      ],
    };
  },
  methods: {
    openLogin() {
      if (typeof window === "undefined") return;
      const newWindow = window.open("./登录.html", "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
    },
    openRegister() {
      if (typeof window === "undefined") return;
      const newWindow = window.open("./注册.html", "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
    },
  },
};
</script>

<style scoped>
.index-page {
    background-color: rgb(59, 45, 72);
    min-height: 100vh;
}

.wrapper {
    margin: 0 auto;
    width: 1300px;
    overflow: hidden;
}

/* 主要内容区域优化 */
.main {
    position: relative;
    height: 320px;
    border: none;
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* 轮播图区域样式 */
.slider {
    width: 700px;
    height: 320px;
    position: relative;
    overflow: hidden;
    border-radius: 15px 0 0 15px;
}

.slider-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.slider-container img {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    object-fit: cover;
}

.slider-container img.active {
    opacity: 1;
}

/* 轮播图指示点 */
.slider-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.slider-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-dot.active {
    background: #fff;
    transform: scale(1.2);
}

/* 轮播图按钮 */
.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0;
}

.slider:hover .slider-btn {
    opacity: 1;
}

.slider-btn:hover {
    background: rgba(0, 0, 0, 0.8);
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

/* 文本区域优化 */
.main .txt {
    height: 280px;
    width: 520px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(221, 160, 221, 0.8), rgba(59, 45, 72, 0.8));
    backdrop-filter: blur(8px);
    position: absolute;
    top: 20px;
    right: 50px;
    color: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
}

.main .txt::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: 0.5s;
}

.txt p {
    font-family: "华文行楷";
    font-size: 34px;
    text-align: center;
    line-height: 280px;
    transition: all 0.5s ease;
    position: relative;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.txt:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, rgba(221, 160, 221, 0.9), rgba(59, 45, 72, 0.9));
    border-color: rgba(255, 255, 255, 0.2);
}

.txt:hover::before {
    left: 100%;
}

.txt:hover p {
    transform: scale(1.05);
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
    color: #fff;
}

/* 标题区域优化 */
.title {
    height: 50px;
    display: flex;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(59, 45, 72, 0.8));
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 25px;
    border-radius: 10px;
    align-items: center;
}

.title h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 400;
}

.title a {
    color: #fff;
    padding: 8px 15px;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.title a:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

/* 新闻区域优化 */
.news .hua {
    margin-top: 20px;
    display: flex;
    gap: 30px;
}

/* 新闻区域右侧轮播图样式 */
.news .right {
    width: 500px;
    height: 300px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
}

.news-slider {
    width: 100%;
    height: 100%;
    position: relative;
}

.news-slider-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.news-slider-container img {
    min-width: 500px;
    height: 300px;
    object-fit: cover;
}

/* 左侧新闻样式优化 */
.hua .left {
    flex: 1;
}

.hua .left .cap {
    padding: 20px;
    margin-bottom: 30px;
    background: linear-gradient(to right, 
        rgba(147, 112, 219, 0.6), 
        rgba(221, 160, 221, 0.6)
    );
    border-radius: 15px;
    transition: all 0.4s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    backdrop-filter: blur(5px);
    color: #fff;
}

.hua .left .cap:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to right, 
        rgba(147, 112, 219, 0.8), 
        rgba(221, 160, 221, 0.8)
    );
}

.hua .left .cap strong {
    cursor: pointer;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.subscribe .what {
    margin-top: 40px;
}
.subscribe .what ul {
    display: flex;
    justify-content: space-between;
}
.subscribe .what ul li {
    height: 450px;
    width: 300px;
    border-radius: 20px;
    transition: all 0.4s ease;
    padding-bottom: 20px;
}
.subscribe .what ul li:hover {
    transform: translateY(-5px);
}
.subscribe .what ul li .biaoti {
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 8px;
    background: linear-gradient(135deg, rgba(147, 112, 219, 0.4), rgba(221, 160, 221, 0.4));
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}
.subscribe .what ul li:hover .biaoti {
    background: linear-gradient(135deg, rgba(147, 112, 219, 0.7), rgba(221, 160, 221, 0.7));
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
.biaoti h3 {
    color: #fff;
    font-size: 22px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}
.subscribe .what ul li:hover .biaoti h3 {
    color: #fff;
    transform: scale(1.05);
}
.neirong {
    height: 350px;
    width: 300px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(221, 160, 221, 0.2);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    overflow-y: auto;
}
.subscribe .what ul li:hover .neirong {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(221, 160, 221, 0.4);
    box-shadow: inset 0 0 20px rgba(221, 160, 221, 0.1);
}
.neirong p {
    line-height: 1.7;
    font-size: 14px;
    letter-spacing: 0.5px;
}
.neirong hr {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(221, 160, 221, 0.3), transparent);
    margin: 12px 0;
}

/* 自定义滚动条样式 */
.neirong::-webkit-scrollbar {
    width: 6px;
}

.neirong::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

.neirong::-webkit-scrollbar-thumb {
    background: rgba(221, 160, 221, 0.3);
    border-radius: 3px;
}

.neirong::-webkit-scrollbar-thumb:hover {
    background: rgba(221, 160, 221, 0.5);
}

footer {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    margin-top: 50px;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(59, 45, 72, 0.8));
}

/* Focus区域样式 */
.focus .content {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 20px;
}

.focus .content > div {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 20px;
    transition: all 0.4s ease;
    overflow: hidden;
}

.focus .content > div:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.focus .content img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
    transition: all 0.4s ease;
}

.focus .content > div:hover img {
    transform: scale(1.1);
}

.focus .content strong {
    display: block;
    color: #fff;
    font-size: 20px;
    margin: 15px 0;
    font-weight: 600;
}

.focus .content p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: 15px;
    text-align: justify;
}

</style>