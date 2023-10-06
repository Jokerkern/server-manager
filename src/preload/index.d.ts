import { ElectronAPI } from '@electron-toolkit/preload'
import { Shell } from 'electron'
import childProcess from 'child_process'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    shell: Shell
    childProcess: childProcess
  }
}
