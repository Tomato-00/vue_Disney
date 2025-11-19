<template>
  <div class="news-page">
    <HeaderCom
      :logo-image="logoImage"
      :nav-items="navItems"
      search-placeholder="搜索乐园热点"
      @open-login="openLogin"
      @open-register="openRegister"
    />

    <div class="news-wrapper">

      <section class="banner">
        <div class="title">
          <h2>乐园资讯</h2>
          <a href="#">more ></a>
        </div>
        <div class="banner-top">
          <div class="banner-image main">
            <img :src="bannerImages.main" alt="乐园资讯主视觉" />
          </div>
          <div class="banner-image left">
            <img :src="bannerImages.left" alt="乐园资讯左侧图" />
          </div>
          <div class="banner-image right">
            <img :src="bannerImages.right" alt="乐园资讯右侧图" />
          </div>
        </div>
      </section>

      <section id="shanghai" class="destination shanghai">
        <div class="title">
          <h2>上海迪士尼度假区</h2>
          <a href="#">more ></a>
        </div>
        <div class="content-row">
          <div
            v-for="media in shanghaiMedia"
            :key="media.id"
            class="media-placeholder"
          >
            <video
              v-if="media.type === 'video'"
              :src="media.src"
              controls
              playsinline
              preload="metadata"
            ></video>
            <div v-else class="media-fallback">
              {{ media.label }}
            </div>
            <p v-if="media.caption" class="media-caption">
              {{ media.caption }}
            </p>
          </div>
          <div class="text-card">
            <p v-for="(paragraph, index) in shanghaiSummary" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </section>

      <section id="hongkong" class="destination hongkong">
        <div class="title">
          <h2>香港迪士尼度假区</h2>
          <a href="#">more ></a>
        </div>
        <div class="content-row">
          <div
            v-for="media in hongKongMedia"
            :key="media.id"
            class="media-placeholder"
          >
            <video
              v-if="media.type === 'video'"
              :src="media.src"
              controls
              playsinline
              preload="metadata"
            ></video>
            <div v-else class="media-fallback">
              {{ media.label }}
            </div>
            <p v-if="media.caption" class="media-caption">
              {{ media.caption }}
            </p>
          </div>
        </div>
        <div class="text-card wide">
          <p v-for="(paragraph, index) in hongKongSummary" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section id="social" class="social">
        <div class="title">
          <h2>互动社区</h2>
          <a href="#">more ></a>
        </div>
        <div class="bottom">
          <div class="text-card">
            <p v-for="(paragraph, index) in socialIntro" :key="index">
              {{ paragraph }}
            </p>
          </div>
          <form>
            <table>
              <caption>
                <h5>分享你的迪士尼奇妙之旅</h5>
              </caption>
              <tr v-for="field in formFields" :key="field.id">
                <td>{{ field.label }}</td>
                <td>
                  <template v-if="field.type === 'textarea'">
                    <textarea :placeholder="field.placeholder"></textarea>
                  </template>
                  <template v-else-if="field.type === 'file'">
                    <input type="file" />
                  </template>
                  <template v-else>
                    <input :type="field.type" :placeholder="field.placeholder" />
                  </template>
                </td>
              </tr>
            </table>
            <button type="button">提交分享</button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import HeaderCom from "@/components/Header/HeaderCom.vue";
import headerLogo from "@/assets/images/logo.jpg";
import bannerMainImage from "@/assets/images/news/乐园2.jpg";
import bannerRightImage from "@/assets/images/news/乐园3.jpg";
import shanghaiVideoOne from "@/assets/video/上海1.mp4";
import shanghaiVideoTwo from "@/assets/video/上海2.mp4";
import hongKongVideoOne from "@/assets/video/Hongkong1.mp4";
import hongKongVideoTwo from "@/assets/video/HongKong2.mp4";

export default {
  name: "NewsPage",
  components: {
    HeaderCom,
  },
  data() {
    return {
      logoImage: headerLogo,
      navItems: [
        { label: "首页", to: "/" },
        { label: "乐园资讯", to: "/news" },
        { label: "相关影视", href: "./相关影视.html" },
        { label: "周边商城", to: "/shop" },
      ],
      bannerImages: {
        main: bannerMainImage,
        left: bannerMainImage,
        right: bannerRightImage,
      },
      shanghaiMedia: [
        {
          id: "sh-video-1",
          type: "video",
          src: shanghaiVideoOne,
          caption: "创极速光轮全新视角体验",
        },
        {
          id: "sh-video-2",
          type: "video",
          src: shanghaiVideoTwo,
          caption: "奇幻花车巡游高燃集锦",
        },
      ],
      shanghaiSummary: [
        "拥有八大主题园区：米奇大街、奇想花园、梦幻世界、探险岛、宝藏湾、明日世界、玩具总动员以及疯狂动物城。",
        "可以在探险岛探索神秘文明，在宝藏湾开启海盗冒险，还能体验“创极速光轮”等招牌项目。",
        "2024 年 8 月推出的全新蜘蛛侠主题项目，成为新一波打卡热点，等你来体验。",
      ],
      hongKongMedia: [
        {
          id: "hk-video-1",
          type: "video",
          src: hongKongVideoOne,
          caption: "魔海奇缘凯旋庆典沉浸现场",
        },
        {
          id: "hk-video-2",
          type: "video",
          src: hongKongVideoTwo,
          caption: "蚁侠与黄蜂女击战特攻实录",
        },
      ],
      hongKongSummary: [
        "魔海奇缘凯旋庆典：莫阿娜登场，游客可跟随音乐互动，沉浸式体验太平洋文化。",
        "“蚁侠与黄蜂女：击战特攻！”：加入漫威英雄，与邪恶势力展开微缩世界作战。",
        "加利布尼市集：集互动游戏、特色小食、纪念品为一体，还会偶遇迪士尼朋友。",
      ],
      socialIntro: [
        "欢迎来到迪士尼乐园互动社区，这里是粉丝们的梦幻分享空间。",
        "你可以发布游玩心得、行程攻略、巡游照片或 Vlog，与同好交流灵感。",
        "优秀的作品有机会得到官方推荐，一起打造更精彩的迪士尼体验。",
      ],
      formFields: [
        {
          id: "title",
          label: "标题（为旅行拟定喜欢的标题）",
          type: "text",
          placeholder: "例如：奇妙夜光巡游记",
        },
        {
          id: "content",
          label: "内容（可分享相关经历与感受哦）",
          type: "textarea",
          placeholder: "输入你的游记内容...",
        },
        {
          id: "upload",
          label: "上传图片或视频（可选）",
          type: "file",
        },
      ],
    };
  },
  methods: {
    openLogin() {
      this.$store.dispatch("auth/open", "login");
    },
    openRegister() {
      this.$store.dispatch("auth/open", "register");
    },
  },
};
</script>

<style scoped>
:global(html, body) {
  background-color: rgb(59, 45, 72);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.news-page {
  background-color: rgb(59, 45, 72);
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  color: #fff;
}

.news-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.title {
  height: 50px;
  display: flex;
  background: linear-gradient(to right, #000, rgb(59, 45, 72));
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  margin-top: 15px;
  border-radius: 10px;
}

.title h2 {
  color: #fff;
  font-size: 32px;
  font-weight: 400;
  font-family: "华文琥珀", "Microsoft YaHei", sans-serif;
  transition: all 0.5s;
}

.title h2:hover {
  color: #f9d6ff;
  transform: scale(1.05);
}

.title a {
  color: #fff;
  position: relative;
  padding: 5px 15px;
  transition: all 0.3s;
  text-decoration: none;
}

.title a:hover {
  color: #f9d6ff;
}

.title a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #f9d6ff;
  transition: width 0.3s;
}

.title a:hover::after {
  width: 100%;
}

.banner {
  margin-top: 15px;
}

.banner-top {
  position: relative;
  height: 340px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 15px;
}

.banner-image {
  position: absolute;
  top: 0;
  height: 340px;
  width: 650px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.9s cubic-bezier(0.23, 1, 0.32, 1),
    filter 0.9s ease;
  will-change: transform;
}

.banner-image.main {
  width: 100%;
  left: 0;
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(59, 45, 72, 0.8));
}

.banner-image.left {
  left: 0;
}

.banner-image.right {
  right: 0;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-top:hover .banner-image {
  filter: brightness(1.08) saturate(1.05);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
}

.banner-top:hover .banner-image.main {
  transform: translateY(-6px) scale(1.015);
}

.banner-top:hover .banner-image.left {
  transform: translateX(-18px) translateY(-4px) scale(1.03);
}

.banner-top:hover .banner-image.right {
  transform: translateX(18px) translateY(-4px) scale(1.03);
}

.destination {
  margin-top: 25px;
}

.content-row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.media-placeholder {
  flex: 1 1 300px;
  min-height: 300px;
  border-radius: 20px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 12px;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    border-color 0.6s ease, box-shadow 0.6s ease;
}

.media-placeholder:hover {
  transform: translateY(-8px);
  border-color: rgba(210, 180, 255, 0.75);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
}

.media-placeholder video {
  width: 100%;
  height: 220px;
  border-radius: 16px;
  object-fit: cover;
  background: #000;
}

.media-caption {
  font-size: 16px;
  color: #fff;
}

.media-fallback {
  font-size: 18px;
}

.text-card {
  flex: 1 1 400px;
  min-height: 280px;
  background: linear-gradient(45deg, rgba(59, 45, 72, 0.8), rgba(74, 26, 140, 0.6));
  border-radius: 30px;
  padding: 24px;
  box-sizing: border-box;
  font-family: "华文琥珀", "Microsoft YaHei", sans-serif;
  color: #ceceba;
  font-size: 18px;
  line-height: 1.6;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    background 0.6s ease, color 0.6s ease, box-shadow 0.6s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.text-card:not(.wide) p {
  margin: 0;
  padding: 16px 20px 16px 54px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  font-size: 17px;
  color: #f6f6f6;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.text-card:not(.wide) p::before {
  content: "";
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.6);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.8);
}

.text-card.wide {
  width: 100%;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  counter-reset: hkSummary;
  padding: 32px;
}

.text-card.wide p {
  margin: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 18px 20px 18px 60px;
  position: relative;
  min-height: 120px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.text-card.wide p::before {
  counter-increment: hkSummary;
  content: counter(hkSummary, decimal-leading-zero);
  position: absolute;
  left: 20px;
  top: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.15);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

.text-card:hover {
  background: linear-gradient(135deg, rgba(93, 64, 142, 0.95), rgba(197, 116, 255, 0.35));
  color: #fff5ff;
  transform: translateY(-8px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.25);
}

.social {
  margin-top: 40px;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  margin-top: 15px;
}

form {
  flex: 1 1 520px;
  max-width: 650px;
  background: linear-gradient(45deg, rgb(59, 45, 72), #4a1a8c);
  border-radius: 30px;
  padding: 25px 35px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

form:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(74, 26, 140, 0.5);
}

table {
  color: #fff;
  line-height: 45px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
}

table td {
  text-align: left;
  padding: 10px 12px;
}

table tr {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  overflow: hidden;
}

table tr td:first-child {
  width: 45%;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

table tr td:last-child {
  width: 55%;
}

table input,
table textarea {
  width: 95%;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s;
  font-size: 14px;
}

table textarea {
  height: 80px;
  resize: none;
}

table input[type="file"] {
  padding: 6px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

table input:focus,
table textarea:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

table input::placeholder,
table textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

caption h5 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 12px;
}

form button {
  padding: 10px 35px;
  border: none;
  border-radius: 25px;
  background: aqua;
  color: rgb(59, 45, 72);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  width: 100%;
  max-width: 280px;
  align-self: flex-end;
  box-shadow: 0 8px 20px rgba(0, 255, 255, 0.3);
}

form button:hover {
  background: #fff;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

footer {
  color: #fff;
  margin-top: 50px;
  text-align: center;
  opacity: 0.8;
}

@media screen and (max-width: 1200px) {
  .news-wrapper {
    padding: 20px 16px;
  }

  .banner-image {
    width: 48%;
  }

  .banner-image.right {
    right: 2%;
  }

  .banner-image.left {
    left: 2%;
  }
}

@media screen and (max-width: 992px) {
  .title {
    padding: 12px 18px;
  }

  .title h2 {
    font-size: 26px;
  }

  .banner-top {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: auto;
  }

  .banner-image {
    position: static;
    width: 100%;
    height: 220px;
  }

  .banner-top:hover .left,
  .banner-top:hover .right {
    transform: none;
  }

  .media-placeholder {
    min-height: 260px;
  }

  .media-placeholder video {
    height: 180px;
  }

  .text-card {
    min-height: 220px;
    padding: 20px;
    font-size: 16px;
  }

  .bottom {
    gap: 20px;
  }

  form {
    padding: 20px;
  }

  table {
    line-height: 36px;
  }
}

@media screen and (max-width: 768px) {
  .banner {
    display: none;
  }

  .news-wrapper {
    padding: 20px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .banner,
  .destination,
  .social {
    width: 100%;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    align-self: stretch;
  }

  .title {
    flex-direction: column;
    height: auto;
    gap: 8px;
    width: 100%;
    max-width: none;
    align-items: flex-start;
    padding: 12px 16px;
    text-align: left;
  }

  .title a {
    display: none;
  }

  .content-row {
    flex-direction: column;
    width: 100%;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }

  .media-placeholder,
  .text-card {
    width: 100%;
    align-self: stretch;
  }

  .content-row {
    align-items: center;
  }

  .media-placeholder {
    max-width: 360px;
    margin: 0 auto;
    padding: 16px 18px;
  }

  .media-placeholder video {
    width: 100%;
    height: 200px;
  }

  .bottom {
    width: 100%;
    justify-content: flex-start;
    padding-left:0px;
    padding-right: 12px;
    box-sizing: border-box;
  }

  .banner-top {
    align-items: center;
  }

  .banner-image {
    max-width: 460px;
    margin: 0 auto;
  }

  form {
    width: 100%;
    margin: 0;
    padding: 18px;
    max-width: none;
    align-self: flex-start;
    margin-left: 8px;
    margin-right: auto;
  }

  table {
    font-size: 14px;
  }

  table td {
    text-align: left;
  }

  table input,
  table textarea {
    width: 100%;
  }

  form button {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .news-wrapper {
    padding: 16px 0 40px;
  }

  .title h2 {
    font-size: 22px;
  }

  .banner-image {
    height: 180px;
  }

  .media-placeholder {
    padding: 12px;
  }

  .media-caption {
    font-size: 14px;
  }

  .text-card {
    font-size: 15px;
    line-height: 1.5;
  }

  table {
    line-height: 32px;
  }

  form button {
    font-size: 15px;
    padding: 10px 20px;
  }
}
</style>

