<template>
  <div class="slider" v-if="hasImages">
    <div
      class="slider-container"
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend.passive="handleTouchEnd"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <img
        v-for="(img, index) in normalizedImages"
        :key="img.key"
        :src="img.src"
        :alt="img.alt"
        :class="{ active: index === currentIndex }"
      />
    </div>

    <div class="slider-dots" v-if="showDots">
      <div
        v-for="(img, index) in normalizedImages"
        :key="`dot-${img.key}`"
        class="slider-dot"
        :class="{ active: currentIndex === index }"
        role="button"
        tabindex="0"
        @click="goTo(index)"
        @keydown.enter.prevent="goTo(index)"
        @keydown.space.prevent="goTo(index)"
      ></div>
    </div>

    <div
      v-if="showControls"
      class="slider-btn prev"
      role="button"
      tabindex="0"
      aria-label="上一张"
      @click="prev"
      @keydown.enter.prevent="prev"
      @keydown.space.prevent="prev"
    >
      ❮
    </div>
    <div
      v-if="showControls"
      class="slider-btn next"
      role="button"
      tabindex="0"
      aria-label="下一张"
      @click="next"
      @keydown.enter.prevent="next"
      @keydown.space.prevent="next"
    >
      ❯
    </div>
  </div>
  <div v-else class="slider-empty">
    <slot name="empty">暂无可展示的轮播内容</slot>
  </div>
</template>

<script>
export default {
  name: "GoodsSlider",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 2000,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    showDots: {
      type: Boolean,
      default: true,
    },
    showControls: {
      type: Boolean,
      default: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:currentIndex", "change"],
  data() {
    return {
      currentIndex: 0,
      autoplayTimer: null,
      touchStartX: 0,
      touchStartY: 0,
      isSwiping: false,
      hoverPaused: false,
    };
  },
  computed: {
    hasImages() {
      return this.normalizedImages.length > 0;
    },
    normalizedImages() {
      return this.images
        .filter((img) => !!img)
        .map((img, index) => ({
          src: typeof img === "string" ? img : img.src,
          alt:
            (typeof img === "object" && img.alt) ||
            `幻灯片 ${index + 1}`,
          key: typeof img === "object" && img.key ? img.key : index,
        }));
    },
  },
  watch: {
    images: {
      immediate: true,
      handler() {
        this.resetIndex();
        this.restartAutoplay();
      },
    },
    autoplay(value) {
      if (value) {
        this.startAutoplay();
      } else {
        this.clearAutoplay();
      }
    },
  },
  mounted() {
    this.resetIndex();
    this.startAutoplay();
  },
  beforeDestroy() {
    this.clearAutoplay();
  },
  methods: {
    resetIndex() {
      const total = this.normalizedImages.length;
      if (total === 0) {
        this.currentIndex = 0;
        return;
      }
      const normalizedInitial =
        this.initialIndex >= 0 && this.initialIndex < total
          ? this.initialIndex
          : 0;
      this.updateIndex(normalizedInitial);
    },
    restartAutoplay() {
      this.clearAutoplay();
      this.startAutoplay();
    },
    startAutoplay() {
      if (!this.autoplay || this.hoverPaused) {
        return;
      }
      if (this.normalizedImages.length <= 1 || this.interval <= 0) {
        return;
      }
      this.clearAutoplay();
      this.autoplayTimer = setInterval(() => {
        this.next();
      }, this.interval);
    },
    clearAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },
    next() {
      if (!this.hasImages) return;
      const total = this.normalizedImages.length;
      const nextIndex = this.currentIndex + 1;
      if (nextIndex >= total) {
        if (!this.loop) {
          this.updateIndex(this.currentIndex);
          return;
        }
        this.updateIndex(0);
      } else {
        this.updateIndex(nextIndex);
      }
    },
    prev() {
      if (!this.hasImages) return;
      const total = this.normalizedImages.length;
      const prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        if (!this.loop) {
          this.updateIndex(this.currentIndex);
          return;
        }
        this.updateIndex(total - 1);
      } else {
        this.updateIndex(prevIndex);
      }
    },
    goTo(index) {
      if (!this.hasImages) return;
      const total = this.normalizedImages.length;
      if (index < 0 || index >= total) return;
      this.updateIndex(index);
      this.restartAutoplay();
    },
    updateIndex(index) {
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      this.$emit("update:currentIndex", index);
      this.$emit("change", {
        index,
        image: this.normalizedImages[index],
      });
    },
    handleTouchStart(event) {
      if (!event.touches || event.touches.length === 0) return;
      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.isSwiping = true;
      this.clearAutoplay();
    },
    handleTouchMove(event) {
      if (!this.isSwiping || !event.touches || event.touches.length === 0)
        return;
      const touch = event.touches[0];
      const dx = touch.clientX - this.touchStartX;
      const dy = touch.clientY - this.touchStartY;
      if (Math.abs(dy) > Math.abs(dx)) {
        return;
      }
      const threshold = 40;
      if (dx > threshold) {
        this.prev();
        this.isSwiping = false;
      } else if (dx < -threshold) {
        this.next();
        this.isSwiping = false;
      }
    },
    handleTouchEnd() {
      this.isSwiping = false;
      this.startAutoplay();
    },
    handleMouseEnter() {
      this.hoverPaused = true;
      this.clearAutoplay();
    },
    handleMouseLeave() {
      this.hoverPaused = false;
      this.startAutoplay();
    },
  },
};
</script>
