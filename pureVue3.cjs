/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

//递归删除文件夹
function deleteFolderRecursive(filepath) {
  if (fs.existsSync(filepath)) {
    if (fs.lstatSync(filepath).isDirectory()) {
      fs.readdirSync(filepath).forEach((file, index) => {
        const curPath = path.join(filepath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath); // 递归删除子文件夹
        } else {
          fs.unlinkSync(curPath); // 删除文件
        }
      });
      fs.rmdirSync(filepath); // 删除文件夹
    } else {
      fs.unlinkSync(filepath); // 删除文件
    }
  }
}

// 删除 'src/components' 和 'src/views' 文件夹内的示例文件
['components', 'views', 'assets', 'stores'].forEach(dir => {
  const dirPath = path.join(__dirname, 'src', dir);
  fs.readdirSync(dirPath).forEach(file => {
    deleteFolderRecursive(path.join(dirPath, file));
  });
});

// 清理 'src/App.vue' 内的示例组件引用
const appVuePath = path.join(__dirname, 'src', 'App.vue');
let appVueContent = fs.readFileSync(appVuePath, 'utf-8');
appVueContent = appVueContent.replace(/<template>[\s\S]*<\/template>/, '<template>\n  <div id="app">\n  </div>\n</template>');
appVueContent = appVueContent.replace(/<script setup lang="ts">[\s\S]*?<\/script>/, '<script setup lang="ts">\n\n</script>');
appVueContent = appVueContent.replace(/<script setup>[\s\S]*?<\/script>/, '<script setup>\n\n</script>');
appVueContent = appVueContent.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/, '<style scoped>\n<\/style>');
fs.writeFileSync(appVuePath, appVueContent);

// 清理 'src/router/index.js' 内的示例组件引用
const routerPath = path.join(__dirname, 'src', 'router', 'index.js');
let routerContent = fs.readFileSync(routerPath, 'utf-8');
routerContent = routerContent.replace(/^(.*\n){1}.*import.*\n/, '$1');
routerContent = routerContent.replace(/\s*{\s*path:\s*'.+',\s*name:\s*'.+',[\s\S]*?},?\s*/g, '');
fs.writeFileSync(routerPath, routerContent);

// 清理pinia:stores...
const piniaPath = path.join(__dirname, 'src', 'stores');
let newStorePath = path.join(piniaPath, 'useStore.js');
const initialContent = 
`
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => {
  return {}
})`
fs.writeFileSync(newStorePath, initialContent, 'utf-8');

// 创建hook，api，mock，env文件夹
const srcPath=path.join(__dirname, 'src')
let hookPath=path.join(srcPath, 'hook')
let apiPath=path.join(srcPath,'api')
let mockPath=path.join(srcPath,'mock')
let envPath=path.join(srcPath,'env')
fs.mkdirSync(hookPath)
fs.mkdirSync(apiPath)
fs.mkdirSync(envPath)
fs.mkdirSync(mockPath)