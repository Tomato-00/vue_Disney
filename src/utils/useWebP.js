/**
 * 简单的 WebP 检测和使用工具
 * 适用于 Vue 2 项目
 */

let webpSupported = null;

/**
 * 检测浏览器是否支持 WebP
 * @returns {boolean}
 */
export function isWebPSupported() {
  if (webpSupported !== null) {
    return webpSupported;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  webpSupported =
    canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;

  return webpSupported;
}

/**
 * 将图片路径转换为 WebP 路径
 * @param {string|Function} imagePath - 原始图片路径或 require 函数
 * @returns {string|Function} - WebP 路径或原路径
 */
export function toWebP(imagePath) {
  if (typeof imagePath === "function") {
    // 如果是 require 函数，尝试转换路径
    const requirePath = imagePath.toString();
    const match = requirePath.match(/require\(['"]([^'"]+)['"]\)/);
    if (match) {
      const originalPath = match[1];
      const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      try {
        // 尝试加载 WebP 版本
        return require(webpPath);
      } catch (e) {
        // WebP 不存在，返回原图
        return imagePath();
      }
    }
    return imagePath();
  }

  if (typeof imagePath === "string") {
    // 如果是字符串路径，尝试转换为 WebP
    if (isWebPSupported()) {
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      return webpPath;
    }
    return imagePath;
  }

  return imagePath;
}

/**
 * Vue 指令：自动使用 WebP 图片
 * 使用方法：v-webp="require('@/assets/images/logo.jpg')"
 */
export const webpDirective = {
  bind(el, binding) {
    if (!isWebPSupported()) {
      return;
    }

    const imagePath = binding.value;
    if (typeof imagePath === "function") {
      const requirePath = imagePath.toString();
      const match = requirePath.match(/require\(['"]([^'"]+)['"]\)/);
      if (match) {
        const originalPath = match[1];
        const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        try {
          const webpImage = require(webpPath);
          el.src = webpImage;
        } catch (e) {
          // WebP 不存在，使用原图
          el.src = imagePath();
        }
      } else {
        el.src = imagePath();
      }
    } else if (typeof imagePath === "string") {
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      el.src = webpPath;
    } else {
      el.src = imagePath;
    }
  },
};
