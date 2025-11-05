/**
 * WebP 图片优化 Mixin
 * 在组件中使用 this.getWebPImage(require('@/assets/images/logo.jpg')) 来自动获取 WebP 图片
 * 或者使用 this.selectImage(original, webp) 手动选择原图和 WebP
 */
import { isWebPSupported } from "./imageOptimizer";

export default {
  methods: {
    /**
     * 获取 WebP 优化后的图片
     * 自动尝试从原图路径中加载 WebP 版本
     * @param {Function|string|Object} imageRequire - require 函数、路径字符串或 require 结果
     * @returns {string|Object} - 优化后的图片路径
     */
    getWebPImage(imageRequire) {
      // 如果浏览器不支持 WebP，直接返回原图
      if (!isWebPSupported()) {
        if (typeof imageRequire === "function") {
          return imageRequire();
        }
        return imageRequire;
      }

      // 如果是 require 函数，先执行获取结果
      let originalImage;
      if (typeof imageRequire === "function") {
        originalImage = imageRequire();
      } else {
        originalImage = imageRequire;
      }

      // 尝试从原图路径中提取路径并加载 WebP 版本
      if (originalImage && typeof originalImage === "object") {
        // 尝试获取原始路径（从 default 属性或 toString 中）
        let originalPath = null;

        // 尝试从 toString 中提取路径
        const requireStr = originalImage.toString();
        const match = requireStr.match(/require\(['"]([^'"]+)['"]\)/);
        if (match) {
          originalPath = match[1];
        }

        // 如果找到路径，尝试加载 WebP 版本
        if (originalPath) {
          const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
          if (webpPath !== originalPath) {
            try {
              // 尝试动态 require WebP 版本
              // 注意：这需要在构建时存在对应的 WebP 文件
              const webpModule = require(webpPath);
              return webpModule.default || webpModule;
            } catch (e) {
              // WebP 不存在，返回原图
              return originalImage.default || originalImage;
            }
          }
        }

        // 无法提取路径或路径未改变，返回原图
        return originalImage.default || originalImage;
      }

      // 如果是字符串路径，尝试转换为 WebP
      if (typeof originalImage === "string") {
        const webpPath = originalImage.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        if (webpPath !== originalImage) {
          try {
            const webpModule = require(webpPath);
            return webpModule.default || webpModule;
          } catch (e) {
            return originalImage;
          }
        }
        return originalImage;
      }

      return originalImage;
    },

    /**
     * 手动选择原图或 WebP（推荐使用此方法）
     * @param {Function|string|Object} originalImage - 原图
     * @param {Function|string|Object} webpImage - WebP 图（可选，如果不提供则自动尝试加载）
     * @returns {string|Object} - 优化后的图片路径
     */
    selectImage(originalImage, webpImage = null) {
      // 如果浏览器不支持 WebP，返回原图
      if (!isWebPSupported()) {
        if (typeof originalImage === "function") {
          return originalImage();
        }
        return originalImage;
      }

      // 如果提供了 WebP 图片，优先使用
      if (webpImage) {
        if (typeof webpImage === "function") {
          return webpImage();
        }
        return webpImage;
      }

      // 如果没有提供 WebP，尝试自动加载
      return this.getWebPImage(originalImage);
    },
  },
};
