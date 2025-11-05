const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// 源图片目录
const inputDir = path.join(__dirname, '../src/assets/images');

// 递归获取所有图片文件
async function getAllImageFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getAllImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function convertToWebp() {
  console.log('开始转换图片为 WebP 格式...\n');
  
  try {
    // 获取所有图片文件
    const imageFiles = await getAllImageFiles(inputDir);
    console.log(`找到 ${imageFiles.length} 个图片文件\n`);
    
    if (imageFiles.length === 0) {
      console.log('没有找到需要转换的图片文件。');
      return;
    }
    
    let successCount = 0;
    let failCount = 0;
    
    // 逐个处理图片
    for (const imagePath of imageFiles) {
      try {
        const dir = path.dirname(imagePath);
        const ext = path.extname(imagePath);
        const name = path.basename(imagePath, ext);
        const webpPath = path.join(dir, `${name}.webp`);
        
        // 如果 webp 文件已存在，跳过
        if (fs.existsSync(webpPath)) {
          console.log(`⏭  跳过（已存在）: ${path.relative(inputDir, webpPath)}`);
          continue;
        }
        
        // 转换图片
        await sharp(imagePath)
          .webp({ quality: 85 }) // 质量 0-100，85 是较好的平衡
          .toFile(webpPath);
        
        const relativePath = path.relative(inputDir, webpPath);
        console.log(`✓  ${path.basename(imagePath)} → ${path.basename(webpPath)}`);
        console.log(`   ${relativePath}`);
        successCount++;
      } catch (error) {
        console.error(`✗  转换失败: ${path.relative(inputDir, imagePath)}`);
        console.error(`   ${error.message}`);
        failCount++;
      }
    }
    
    console.log(`\n✅ 转换完成！`);
    console.log(`   成功: ${successCount} 个`);
    if (failCount > 0) {
      console.log(`   失败: ${failCount} 个`);
    }
  } catch (error) {
    console.error('❌ 转换失败:', error);
    process.exit(1);
  }
}

convertToWebp();

