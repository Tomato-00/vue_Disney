# WebP 图片优化使用指南

本项目已配置了 WebP 图片优化功能，可以自动将图片转换为 WebP 格式以减小文件大小，提升页面加载速度。

## 使用方法

### 1. 转换图片为 WebP 格式

运行以下命令，将 `src/assets/images` 目录下的所有 JPG/PNG 图片转换为 WebP 格式：

```bash
npm run convert:webp
```

转换后的 WebP 图片会保存在原图片的同一目录下，文件名格式为：`原文件名.webp`

例如：
- `logo.jpg` → `logo.webp`
- `goods/1.png` → `goods/1.webp`

### 2. 在 Vue 组件中使用 WebP 图片

#### 方式一：使用 OptimizedImage 组件（推荐）

使用 `OptimizedImage` 组件可以自动检测浏览器是否支持 WebP，如果支持则使用 WebP 版本，否则回退到原图。

```vue
<template>
  <div>
    <!-- 使用 OptimizedImage 组件 -->
    <OptimizedImage 
      :src="require('@/assets/images/logo.jpg')" 
      alt="Logo"
    />
    
    <!-- 带自定义样式 -->
    <OptimizedImage 
      :src="require('@/assets/images/goods/1.png')" 
      alt="商品图片"
      img-class="product-image"
      :img-style="{ width: '200px' }"
    />
  </div>
</template>

<script>
import OptimizedImage from '@/components/OptimizedImage.vue'

export default {
  components: {
    OptimizedImage
  }
}
</script>
```

#### 方式二：手动判断（高级用法）

如果需要更灵活的控制，可以使用工具函数：

```vue
<template>
  <img :src="optimizedImage" alt="Logo" />
</template>

<script>
import { isWebPSupported, toWebP } from '@/utils/useWebP'

export default {
  computed: {
    optimizedImage() {
      const original = require('@/assets/images/logo.jpg')
      
      if (isWebPSupported()) {
        // 尝试使用 WebP
        const webpPath = toWebP(original)
        return webpPath
      }
      
      return original
    }
  }
}
</script>
```

### 3. 在现有代码中使用

如果你的代码中已经使用了 `require()` 来加载图片，可以替换为 `OptimizedImage` 组件，或者保持原样（WebP 转换是可选的优化）。

例如，将：
```vue
<img :src="require('@/assets/images/logo.jpg')" alt="Logo" />
```

替换为：
```vue
<OptimizedImage :src="require('@/assets/images/logo.jpg')" alt="Logo" />
```

## 配置说明

### 转换质量设置

WebP 转换的质量默认设置为 85（0-100），可以在 `scripts/convert-to-webp.js` 中修改：

```javascript
await sharp(imagePath)
  .webp({ quality: 85 }) // 修改这里的数值
  .toFile(webpPath);
```

- 质量越高，文件越大，图片质量越好
- 质量越低，文件越小，图片质量越差
- 推荐值：80-90 之间

### 支持的图片格式

当前支持以下格式转换为 WebP：
- `.jpg` / `.jpeg`
- `.png`

## 注意事项

1. **WebP 兼容性**：现代浏览器都支持 WebP，但旧版浏览器（如 IE）不支持。`OptimizedImage` 组件会自动检测并回退到原图。

2. **文件大小**：WebP 格式通常比 JPG/PNG 小 25-35%，但转换需要时间。

3. **构建优化**：WebP 转换是开发时的优化步骤，不影响运行时性能。

4. **图片路径**：确保原图和 WebP 图片在同一目录下，文件名对应。

## 常见问题

### Q: 转换后的图片在哪里？
A: WebP 图片保存在原图片的同一目录下，文件名格式为 `原文件名.webp`。

### Q: 必须使用 WebP 吗？
A: 不是必须的。WebP 是可选的优化，如果浏览器不支持或 WebP 文件不存在，会自动使用原图。

### Q: 如何只转换部分图片？
A: 可以修改 `scripts/convert-to-webp.js` 中的 `inputDir` 路径，或者手动指定要转换的图片目录。

### Q: 转换后原图会被删除吗？
A: 不会，原图会保留。WebP 是额外的优化版本，不会替换原图。

