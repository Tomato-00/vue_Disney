/**
 * 图片优化工具函数
 * 自动将图片路径转换为 WebP 格式（如果存在）
 */

/**
 * 检测浏览器是否支持 WebP
 * @returns {boolean}
 */
export function isWebPSupported() {
  if (typeof document === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}

/**
 * 获取优化后的图片路径（自动选择 WebP）
 * 注意：由于 require() 在构建时处理，需要同时传入原图和 WebP 图
 * @param {string|Object} originalImage - 原始图片（require 结果或路径字符串）
 * @param {string|Object} webpImage - WebP 图片（require 结果或路径字符串，可选）
 * @returns {string|Object} - 优化后的图片路径
 */
export function getOptimizedImage(originalImage, webpImage = null) {
  if (!originalImage) {
    return originalImage;
  }

  // 如果浏览器不支持 WebP，返回原图
  if (!isWebPSupported()) {
    return originalImage;
  }

  // 如果提供了 WebP 图片，优先使用 WebP
  if (webpImage) {
    return webpImage;
  }

  // 如果原图是 require 结果（模块对象），尝试从路径中提取并生成 WebP 路径
  if (originalImage && typeof originalImage === "object") {
    const requireStr = originalImage.toString();
    const match = requireStr.match(/require\(['"]([^'"]+)['"]\)/);
    if (match) {
      const originalPath = match[1];
      const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

      // 如果路径改变了，尝试加载 WebP 版本
      if (webpPath !== originalPath) {
        try {
          const webpModule = require(webpPath);
          return webpModule.default || webpModule;
        } catch (e) {
          // WebP 不存在，返回原图
          return originalImage.default || originalImage;
        }
      }
    }
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
        // WebP 不存在，返回原路径
        return originalImage;
      }
    }
    return originalImage;
  }

  return originalImage;
}

/**
 * 获取优化后的图片（支持 require 结果）
 * 自动从 require 路径中提取并尝试加载 WebP 版本
 * @param {Function|string|Object} imageRequire - require 函数、路径字符串或 require 结果
 * @returns {string|Object} - 优化后的图片路径
 */
export function optimizeImage(imageRequire) {
  if (typeof imageRequire === "function") {
    // 如果是 require 函数，先执行获取结果
    const originalImage = imageRequire();
    return getOptimizedImage(originalImage);
  }

  if (typeof imageRequire === "string") {
    return getOptimizedImage(imageRequire);
  }

  // 如果是 require 的结果（模块对象）
  if (imageRequire && typeof imageRequire === "object") {
    return getOptimizedImage(imageRequire);
  }

  return imageRequire;
}
