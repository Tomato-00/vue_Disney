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
          <span>主视觉占位</span>
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
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  margin-bottom: 30px;
}

.brief {
  flex: 1 1 400px;
  min-height: 280px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
}

.brief p {
  font-family: "Brush Script MT", "Times New Roman", serif;
  font-size: 32px;
  text-align: center;
  line-height: 1.4;
}

.banner-visual {
  flex: 1 1 400px;
  min-height: 300px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(59, 45, 72, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.banner-visual::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  pointer-events: none;
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
}

.poster-meta strong {
  display: block;
  font-size: 22px;
}

.poster-card .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.poster-card:hover .overlay {
  opacity: 1;
}

.poster-card:hover .poster-meta {
  opacity: 1;
}

.introduce {
  flex: 1 1 500px;
  min-height: 420px;
  padding: 20px 30px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "华文行楷", "Microsoft YaHei", sans-serif;
  font-size: 22px;
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

