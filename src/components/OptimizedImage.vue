<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :class="imgClass"
    :style="imgStyle"
    @error="handleError"
  />
</template>

<script>
export default {
  name: "OptimizedImage",
  props: {
    // 原始图片路径（require 结果或字符串路径）
    src: {
      type: [String, Object],
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    imgClass: {
      type: String,
      default: "",
    },
    imgStyle: {
      type: Object,
      default: () => ({}),
    },
    // 是否强制使用 WebP（默认自动检测）
    forceWebP: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      webpSupported: false,
      imageSrc: "",
      loadError: false,
    };
  },
  mounted() {
    this.checkWebPSupport();
    this.setImageSrc();
  },
  watch: {
    src() {
      this.setImageSrc();
    },
  },
  methods: {
    // 检测浏览器是否支持 WebP
    checkWebPSupport() {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      this.webpSupported =
        canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    },

    // 设置图片源
    setImageSrc() {
      this.loadError = false;
      const originalSrc = this.getOriginalSrc();

      if (!originalSrc) {
        this.imageSrc = "";
        return;
      }

      // 如果浏览器不支持 WebP 且不强制使用，直接使用原图
      if (!this.webpSupported && !this.forceWebP) {
        this.imageSrc = originalSrc;
        return;
      }

      // 尝试使用 WebP
      const webpSrc = this.getWebPSrc(originalSrc);
      if (webpSrc && webpSrc !== originalSrc) {
        // 先尝试加载 WebP，如果失败则使用原图
        this.imageSrc = webpSrc;
      } else {
        this.imageSrc = originalSrc;
      }
    },

    // 获取原始图片路径
    getOriginalSrc() {
      if (typeof this.src === "string") {
        return this.src;
      }
      if (this.src && typeof this.src === "object") {
        // 如果是 require 的结果，取 default 或直接返回
        return this.src.default || this.src;
      }
      return "";
    },

    // 获取 WebP 图片路径
    getWebPSrc(originalSrc) {
      if (typeof originalSrc !== "string") {
        return originalSrc;
      }

      // 尝试将 .jpg, .jpeg, .png 替换为 .webp
      const webpPath = originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");

      // 如果路径改变了，说明找到了对应的 WebP 文件
      if (webpPath !== originalSrc) {
        // 如果原始路径是 require 的结果，尝试 require WebP 版本
        if (this.src && typeof this.src === "object") {
          try {
            // 从 require 路径中提取原始路径
            const requireStr = this.src.toString();
            const match = requireStr.match(/require\(['"]([^'"]+)['"]\)/);
            if (match) {
              const originalPath = match[1];
              const webpPath = originalPath.replace(
                /\.(jpg|jpeg|png)$/i,
                ".webp"
              );
              // 尝试 require WebP 版本
              const webpModule = require(webpPath);
              return webpModule.default || webpModule;
            }
          } catch (e) {
            // WebP 不存在，返回原图
            return originalSrc;
          }
        }

        // 对于字符串路径，直接返回 WebP 路径
        return webpPath;
      }

      return originalSrc;
    },

    // 处理图片加载错误
    handleError() {
      if (!this.loadError && this.imageSrc !== this.getOriginalSrc()) {
        // WebP 加载失败，回退到原图
        this.loadError = true;
        this.imageSrc = this.getOriginalSrc();
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
