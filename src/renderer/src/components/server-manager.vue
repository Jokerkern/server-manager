<template>
  <div>
    <el-button @click="openFolderDialog">选择文件夹</el-button>

    <div v-for="folder in folders" :key="folder.path">
      <el-card>
        <div class="card-header">
          {{ folder.name }}
        </div>
        <div class="card-body">
          <el-button @click="openFolder(folder.path)">打开目录</el-button>
          <el-button @click="openCmd(folder.path)">打开命令提示符</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const folders = ref<{ name: string; path: string }[]>([])
    const ipcRenderer = window.electron.ipcRenderer
    const shell = window.shell
    const childProcess = window.childProcess

    const openFolderDialog = async () => {
      console.log('openFolderDialog')
      const result = await ipcRenderer.invoke('openFile')
      if (result.canceled) {
        return
      }
      const folderPath = result.filePaths[0]
      const folderName = folderPath?.split('\\')?.pop() ?? ''
      folders.value.push({ name: folderName, path: folderPath })
    }
    const openFolder = (path: string) => {
      console.log('openFolder')
      shell.openPath(path)
    }

    const openCmd = (path: string) => {
      console.log('openCmd', path)
      childProcess.exec(`start cmd /K "cd /d ${path}"`)
    }

    return {
      folders,
      openFolderDialog,
      openFolder,
      openCmd
    }
  }
}
</script>

<style scoped></style>
