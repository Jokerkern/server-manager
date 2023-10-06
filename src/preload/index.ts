import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import childProcess from 'child_process'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('shell', shell)
    contextBridge.exposeInMainWorld('childProcess', childProcess)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.shell = shell
  // @ts-ignore (define in dts)
  window.childProcess = childProcess
}
