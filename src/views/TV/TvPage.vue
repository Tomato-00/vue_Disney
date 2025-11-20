<template>
  <div class="tv-page">
    <HeaderCom
      :logo-image="logoImage"
      :nav-items="navItems"
      search-placeholder="搜索影视/角色"
      @open-login="openLogin"
      @open-register="openRegister"
    />

    <div class="tv-wrapper">
      <section class="banner">
        <div class="brief">
          <p>{{ bannerCopy }}</p>
        </div>
        <div class="banner-visual">
          <img :src="bannerVisual" alt="Disney multi-brand key visual" />
        </div>
      </section>

      <section class="recommend">
        <div class="title">
          <h2>为您推荐</h2>
          <a href="javascript:void(0);">more ></a>
        </div>
        <div class="foryou">
          <div class="poster-card">
            <img
              :src="recommendedMovie.poster"
              :alt="recommendedMovie.title"
              class="poster-image"
            />
            <p class="poster-meta">
              <strong>{{ recommendedMovie.title }}</strong>
              <span>票房：{{ recommendedMovie.boxOffice }}</span>
            </p>
            <div class="overlay"></div>
          </div>
          <div class="introduce">
            <p v-for="(paragraph, index) in recommendedMovie.description" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </section>

      <section class="hot">
        <div class="title">
          <h2>热门影视</h2>
          <a href="javascript:void(0);">more ></a>
        </div>
        <div class="hot-slider">
          <div class="slider-track">
            <div
              v-for="show in loopedHotShows"
              :key="show.id"
              class="slider-card"
            >
              <img :src="show.image" :alt="show.title" class="slider-image" />
              <p class="show-title">{{ show.title }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="classic">
        <div class="title">
          <h2>经典角色</h2>
          <a href="javascript:void(0);">more ></a>
        </div>
        <div class="character-grid">
          <button
            v-for="character in classicCharacters"
            :key="character.id"
            class="character-card"
            type="button"
            @click="openCharacterDetails(character)"
          >
            <img
              :src="character.image"
              :alt="character.name"
              class="character-image"
            />
            <span class="character-name">{{ character.name }}</span>
          </button>
        </div>
      </section>
    </div>

    <transition name="modal">
      <div
        v-if="activeCharacter"
        class="character-modal"
        @click.self="closeCharacterModal"
      >
        <div class="modal-content">
          <button class="close-button" type="button" @click="closeCharacterModal">
            ×
          </button>
          <h2>{{ activeCharacter.name }}</h2>
          <p id="modal-year">{{ activeCharacter.firstAppearance }}</p>
          <p id="modal-description">{{ activeCharacter.description }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderCom from "@/components/Header/HeaderCom.vue";
import headerLogo from "@/assets/images/logo.jpg";
import headerBanner from "@/assets/images/tv/top.jpg";
import mulanPoster from "@/assets/images/tv/mulan.png";
import slider1Image from "@/assets/images/tv/slider 1.png";
import slider2Image from "@/assets/images/tv/slider 2.png";
import slider3Image from "@/assets/images/tv/slider 3.png";
import slider4Image from "@/assets/images/tv/slider 4.png";
import slider5Image from "@/assets/images/tv/slider 5.png";
import mickeyImage from "@/assets/images/tv/miqi.jpg";
import minnieImage from "@/assets/images/tv/mini.jpg";
import simbaImage from "@/assets/images/tv/xinba.jpg";
import elsaImage from "@/assets/images/tv/elsa.jpg";
import jackImage from "@/assets/images/tv/jack.jpg";
import judyImage from "@/assets/images/tv/judy.jpg";
import daisyImage from "@/assets/images/tv/daisy.jpg";
import winnieImage from "@/assets/images/tv/weini.jpg";
import pigletImage from "@/assets/images/tv/piglet.jpg";
import steelImage from "@/assets/images/tv/steel.jpg";

export default {
  name: "TvPage",
  components: {
    HeaderCom,
  },
  data() {
    return {
      logoImage: headerLogo,
      navItems: [
        { label: "首页", to: "/" },
        { label: "乐园资讯", to: "/news" },
        { label: "相关影视", to: "/tv" },
        { label: "周边商城", to: "/shop" },
      ],
      bannerVisual: headerBanner,
      bannerCopy:
        "Movie having love and suspense and thriller with immense drama is what your mood wants this time. Let's have an enthralling experience.",
      recommendedMovie: {
        title: "《花木兰》",
        boxOffice: "2.78 亿",
        poster: mulanPoster,
        description: [
          "《花木兰》由妮基·卡罗执导，刘亦菲、甄子丹、巩俐、李连杰等主演，于 2020 年在全球院线上映。",
          "影片改编自中国古代叙事诗《木兰辞》，讲述花木兰替父从军，在战场上不断蜕变的故事。",
          "2021 年斩获奥斯卡最佳视觉效果、最佳服装设计等多个提名，是迪士尼真人巨制之一。",
        ],
      },
      hotShows: [
        { id: "loki", title: "《洛基》", image: slider1Image },
        { id: "falcon", title: "《猎鹰与冬兵》", image: slider2Image },
        { id: "wanda", title: "《旺达幻视》", image: slider3Image },
        { id: "dragon", title: "《寻龙传说》", image: slider4Image },
        { id: "luca", title: "《夏日友晴天》", image: slider5Image },
      ],
      classicCharacters: [
        {
          id: "mickey",
          name: "米老鼠",
          image: mickeyImage,
          firstAppearance: "首次登场：1928 年《汽船威利号》",
          description: "迪士尼最具代表性的角色之一，象征着奇妙、友谊与勇气，至今仍是全球观众心中最经典的动画明星。",
        },
        {
          id: "minnie",
          name: "米妮",
          image: minnieImage,
          firstAppearance: "首次登场：1928 年《汽船威利号》",
          description: "优雅乐观的米妮总能用温柔与活力感染伙伴，与米老鼠一起带来源源不断的欢乐。",
        },
        {
          id: "simba",
          name: "辛巴",
          image: simbaImage,
          firstAppearance: "首次登场：1994 年《狮子王》",
          description: "草原之王，经历挫折后重新振作，带领伙伴守护荣耀王国，是成长与责任的象征。",
        },
        {
          id: "elsa",
          name: "艾莎女王",
          image: elsaImage,
          firstAppearance: "首次登场：2013 年《冰雪奇缘》",
          description: "掌控冰雪魔法的女王，学会拥抱自我、释放天赋，也让歌曲《Let It Go》传遍全球。",
        },
        {
          id: "jack",
          name: "杰克船长",
          image: jackImage,
          firstAppearance: "首次登场：2003 年《加勒比海盗》",
          description: "古灵精怪的加勒比海盗，以独特魅力闯荡七海，深受观众喜爱。",
        },
        {
          id: "daisy",
          name: "黛丝",
          image: daisyImage,
          firstAppearance: "首次登场：1940 年《鸭子浪漫史》",
          description: "唐老鸭的搭档，机智又优雅，是迪士尼经典角色家族的重要成员。",
        },
        {
          id: "judy",
          name: "朱迪",
          image: judyImage,
          firstAppearance: "首次登场：2016 年《疯狂动物城》",
          description: "首位兔子警官，凭借热情与勇气打破偏见，是坚持梦想的最佳代表。",
        },
        {
          id: "winnie",
          name: "小熊维尼",
          image: winnieImage,
          firstAppearance: "首次登场：1926 年《小熊维尼》故事集",
          description: "热爱蜂蜜、待人真诚的小熊维尼提醒我们珍惜简单美好，用善良温暖朋友们的心。",
        },
        {
          id: "piglet",
          name: "小猪皮杰",
          image: pigletImage,
          firstAppearance: "首次登场：1935 年《威尼熊与蜜蜂树》动画短片",
          description: "胆小却重情义的皮杰总在关键时刻挺身而出，与维尼一起守护百亩森林友谊，是温柔与勇气的代表。",
        },
        {
          id: "ironman",
          name: "钢铁侠",
          image: steelImage,
          firstAppearance: "首次登场：2008 年《钢铁侠》",
          description: "托尼·斯塔克凭借天才头脑与高科技装甲在漫威宇宙中大放异彩，象征着自我救赎与守护世界的担当。",
        },
      ],
      activeCharacter: null,
    };
  },
  computed: {
    loopedHotShows() {
      return [...this.hotShows, ...this.hotShows];
    },
  },
  methods: {
    openLogin() {
      this.$store.dispatch("auth/open", "login");
    },
    openRegister() {
      this.$store.dispatch("auth/open", "register");
    },
    openCharacterDetails(character) {
      this.activeCharacter = character;
    },
    closeCharacterModal() {
      this.activeCharacter = null;
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

.tv-page {
  min-height: 100vh;
  width: 100%;
  background-color: rgb(59, 45, 72);
  color: #fff;
}

.tv-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding: 30px 20px 60px;
  box-sizing: border-box;
}

.banner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: center;
  margin-bottom: 36px;
  padding: 34px 36px;
  border-radius: 42px;
  background:
    radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.18), transparent 55%),
    radial-gradient(circle at 85% 10%, rgba(150, 115, 255, 0.28), transparent 60%),
    linear-gradient(135deg, rgba(38, 28, 65, 0.95), rgba(20, 14, 32, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 30px 60px rgba(5, 0, 15, 0.65),
    inset 0 0 35px rgba(126, 92, 255, 0.1);
  overflow: hidden;
  isolation: isolate;
}

.banner::before {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 34px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.08), transparent 50%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 0;
  pointer-events: none;
}

.brief {
  position: relative;
  flex: 1 1 380px;
  min-height: 260px;
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02))
      border-box;
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 38px 34px;
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.45),
    inset 0 0 30px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  z-index: 1;
  overflow: hidden;
}

.brief::after {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), transparent 55%);
  opacity: 0.8;
  pointer-events: none;
}

.brief p {
  position: relative;
  font-family: "Source Han Serif SC", "Songti SC", serif;
  font-size: 28px;
  text-align: center;
  line-height: 1.6;
  letter-spacing: 0.8px;
  color: rgba(255, 255, 255, 0.92);
  max-width: 460px;
  margin: 0 auto;
}

.brief p::after {
  content: "";
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  opacity: 0.6;
}

.banner-visual {
  flex: 1 1 440px;
  min-height: 320px;
  padding: 18px;
  border-radius: 40px;
  background:
    radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.14), transparent 45%),
    radial-gradient(circle at 85% 0%, rgba(169, 111, 255, 0.32), transparent 55%),
    rgba(6, 4, 18, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 30px 60px rgba(9, 5, 30, 0.75),
    inset 0 0 35px rgba(0, 0, 0, 0.4);
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition:
    transform 0.8s ease,
    box-shadow 0.8s ease,
    border-color 0.6s ease;
}

.banner-visual::before {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 32px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.12), rgba(88, 58, 186, 0.5));
  z-index: 0;
  opacity: 0.7;
  filter: blur(0.5px);
  transition: opacity 0.6s ease, transform 0.8s ease;
}

.banner-visual::after {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%);
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 2;
  opacity: 0.4;
  transition: opacity 0.5s ease;
}

.banner-visual::after,
.banner-visual::before {
  will-change: transform, opacity;
}

.banner-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
  display: block;
  position: relative;
  z-index: 1;
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.35),
    0 0 35px rgba(110, 80, 205, 0.5);
  transition: transform 0.8s ease, filter 0.8s ease;
  filter: saturate(112%) contrast(1.1);
}

.banner-visual::before,
.banner-visual::after {
  animation: bannerPulse 10s ease-in-out infinite;
}

.banner-visual:hover {
  transform: translateY(-10px) scale(1.015);
  box-shadow:
    0 40px 80px rgba(12, 8, 35, 0.85),
    inset 0 0 45px rgba(3, 1, 12, 0.7);
  border-color: rgba(255, 255, 255, 0.4);
}

.banner-visual:hover::before {
  opacity: 1;
  transform: scale(1.03) translate(-4px, -6px);
}

.banner-visual:hover::after {
  opacity: 0.85;
  animation: bannerSweep 2.7s cubic-bezier(0.45, 0, 0.25, 1) infinite;
}

.banner-visual:hover img {
  transform: scale(1.06);
  filter: saturate(120%) contrast(1.2);
}

@keyframes bannerPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@keyframes bannerSweep {
  0% {
    transform: translateX(-60%) skewX(-8deg);
    opacity: 0;
  }
  20%,
  60% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(60%) skewX(-8deg);
    opacity: 0;
  }
}

.banner-visual:hover img {
  transform: scale(1.025);
  filter: saturate(115%) contrast(1.12);
}

.banner-visual::after {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 28px;
  pointer-events: none;
  z-index: 2;
}

.title {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(59, 45, 72, 0.9) 100%);
  border-radius: 18px;
  padding: 0 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.title h2 {
  font-size: 32px;
  font-weight: 400;
}

.title a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.title a:hover {
  color: aqua;
}

.recommend {
  margin-top: 20px;
}

.foryou {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.poster-card {
  position: relative;
  width: 320px;
  min-height: 420px;
  border-radius: 30px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.poster-card::before {
  content: "";
  position: absolute;
  top: -6%;
  left: -6%;
  width: 45%;
  height: 45%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 2;
}

.poster-card:hover::before {
  opacity: 1;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.poster-meta {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  font-size: 18px;
  line-height: 1.4;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
}

.poster-meta strong {
  display: block;
  font-size: 22px;
}

.poster-card .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.65) 60%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.poster-card:hover .overlay {
  opacity: 1;
}

.poster-card:hover .poster-meta {
  opacity: 1;
}

.introduce {
  position: relative;
  flex: 1 1 620px;
  min-height: 420px;
  padding: 36px 48px;
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(19, 12, 34, 0.95), rgba(66, 39, 94, 0.92))
      padding-box,
    radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.4), transparent 55%) border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 20px 40px rgba(7, 2, 20, 0.65),
    0 0 30px rgba(157, 121, 255, 0.25),
    inset 0 0 25px rgba(17, 8, 32, 0.65);
  display: flex;
  flex-direction: column;
  gap: 42px;
  font-family: "Source Han Serif SC", "Songti SC", "Microsoft YaHei", sans-serif;
  font-size: 20px;
  line-height: 1.8;
  width: 100%;
  max-width: 850px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
  margin-left: 30px;
}

.introduce::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background: linear-gradient(180deg, rgba(148, 119, 255, 0.55), rgba(255, 174, 236, 0.15));
  opacity: 0.45;
  mix-blend-mode: screen;
  pointer-events: none;
}

.introduce::after {
  content: "";
  position: absolute;
  bottom: -38px;
  left: 50%;
  transform: translateX(-50%);
  width: 140%;
  height: 90px;
  background: radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.25), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent 65%);
  clip-path: polygon(0 35%, 10% 45%, 20% 30%, 32% 55%, 45% 25%, 58% 45%, 70% 28%, 82% 50%, 92% 32%, 100% 40%, 100% 100%, 0 100%);
  opacity: 0.6;
  pointer-events: none;
}

.introduce:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow:
    0 28px 55px rgba(8, 4, 28, 0.75),
    0 0 45px rgba(180, 136, 255, 0.35),
    inset 0 0 30px rgba(24, 10, 44, 0.85);
}

.introduce p {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.92);
  text-align: justify;
  font-family: "Source Han Serif SC", "Fira Code", "Microsoft YaHei", sans-serif;
}

.introduce p:first-of-type {
  font-weight: 600;
  font-size: 22px;
}

.introduce p:nth-of-type(2) {
  background: linear-gradient(120deg, rgba(255, 227, 173, 0.35), rgba(255, 201, 132, 0));
  padding: 10px 14px;
  border-radius: 18px;
  box-shadow: inset 0 0 18px rgba(255, 214, 150, 0.25);
  font-family: "Brush Script MT", "华文行楷", cursive;
}

.introduce p:last-of-type {
  font-family: "Source Han Serif SC", "Consolas", "Microsoft YaHei", sans-serif;
  color: rgba(255, 255, 255, 0.85);
}

.hot {
  margin-top: 40px;
}

.hot-slider {
  margin-top: 24px;
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
}

.slider-track {
  display: flex;
  animation: slide 30s linear infinite;
}

.slider-card {
  flex: 0 0 320px;
  height: 240px;
  margin: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  padding: 20px;
}

.slider-image {
  width: 100%;
  height: 150px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

.show-title {
  font-size: 18px;
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

.classic {
  margin-top: 40px;
}

.character-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.character-card {
  border: none;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.character-image {
  width: 100%;
  height: 160px;
  border-radius: 18px;
  object-fit: cover;
  display: block;
}

.character-card:hover {
  transform: translateY(-6px);
  background: rgba(0, 255, 255, 0.12);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35);
}

.character-name {
  font-size: 18px;
  font-weight: 600;
}

.character-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1200;
}

.modal-content {
  width: min(520px, 90vw);
  background: linear-gradient(135deg, rgba(59, 45, 72, 0.95), rgba(89, 65, 102, 0.95));
  border-radius: 20px;
  padding: 30px;
  position: relative;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 28px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

#modal-year {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.7);
}

#modal-description {
  margin-top: 20px;
  line-height: 1.6;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

@media screen and (max-width: 992px) {
  .tv-wrapper {
    padding: 20px 16px 50px;
  }

  .slider-card {
    flex: 0 0 260px;
  }

  .poster-card {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .title {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 16px;
  }

  .title a {
    display: none;
  }

  .brief,
  .banner-visual {
    flex: 1 1 100%;
  }

  .foryou {
    flex-direction: column;
  }

  .introduce {
    min-height: auto;
  }

  .slider-track {
    animation-duration: 40s;
  }
}

@media screen and (max-width: 480px) {
  .tv-wrapper {
    padding: 16px 12px 40px;
  }

  .brief {
    min-height: 220px;
  }

  .brief p {
    font-size: 24px;
  }

  .poster-card {
    min-height: 360px;
  }

  .slider-card {
    flex: 0 0 220px;
    height: 200px;
  }
}
</style>

