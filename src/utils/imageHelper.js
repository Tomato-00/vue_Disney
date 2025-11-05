/**
 * 图片工具函数
 * 自动检测浏览器是否支持 WebP，如果支持则返回 WebP 格式的图片路径
 */

/**
 * 检测浏览器是否支持 WebP
 * @returns {Promise<boolean>}
 */
export function checkWebPSupport() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

/**
 * 获取 WebP 图片路径
 * @param {string} originalPath - 原始图片路径（如：require('@/assets/images/logo.jpg')）
 * @returns {string} - WebP 图片路径或原始路径
 */
export function getWebPImage(originalPath) {
  if (typeof originalPath !== "string") {
    return originalPath;
  }

  // 尝试将 .jpg, .jpeg, .png 替换为 .webp
  const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  // 如果 WebP 文件不存在，返回原图
  // 注意：这里需要在实际使用时检查文件是否存在
  // 在运行时，可以通过尝试加载图片来检测
  return webpPath;
}

/**
 * 获取图片 URL（支持 WebP 自动选择）
 * @param {string} imagePath - 图片路径（相对路径，如：'@/assets/images/logo.jpg'）
 * @returns {Promise<string>} - 图片 URL
 */
export async function getImageUrl(imagePath) {
  // 检查浏览器是否支持 WebP
  const supportsWebP = await checkWebPSupport();

  if (supportsWebP) {
    // 尝试使用 WebP
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    try {
      // 尝试加载 WebP 图片
      const webpModule = await import(
        /* webpackMode: "eager" */ webpPath
      ).catch(() => null);
      if (webpModule && webpModule.default) {
        return webpModule.default;
      }
    } catch (e) {
      // WebP 不存在，使用原图
    }
  }

  // 使用原图
  try {
    const originalModule = await import(/* webpackMode: "eager" */ imagePath);
    return originalModule.default || originalModule;
  } catch (e) {
    console.warn(`无法加载图片: ${imagePath}`, e);
    return imagePath;
  }
}

/**
 * 在 Vue 组件中使用的混合函数
 * 使用方法：在组件的 methods 中调用 this.getOptimizedImage(path)
 */
export const imageHelperMixin = {
  methods: {
    /**
     * 获取优化后的图片路径（自动选择 WebP）
     * @param {string} imagePath - 图片路径
     * @returns {Promise<string>}
     */
    async getOptimizedImage(imagePath) {
      return await getImageUrl(imagePath);
    },
  },
};
