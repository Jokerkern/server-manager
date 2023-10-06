import { dialog } from 'electron'

export async function selectDir() {
  return dialog
    .showOpenDialog({
      properties: ['openDirectory'],
      filters: []
    })
    .then((dir) => {
      return dir
    })
    .catch((err) => {
      console.log(err)
    })
}
