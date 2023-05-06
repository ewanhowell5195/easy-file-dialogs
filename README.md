# easy-file-dialogs
### Open file/directory dialogs in Node.js
```js
const directory = await openDirectory({
  title: "Select Resource Pack",
  initialDir: "C:/Users/ewanh/AppData/Roaming/.minecraft/resourcepacks"
})
```
## Install
```console
npm i easy-file-dialogs
```
## Import
```js
import {
  openDirectory,
  openFile,
  openFileName,
  saveFile,
  saveFileName,
  confirm
} from "easy-file-dialogs"

// or

import dialogs from "easy-file-dialogs"
```
# Functions
## openDirectory(args)
Open a directory selection dialog. Returns the selected directory path.
```js
const directory = await openDirectory({
  title: // The title at the top of the dialog
  icon: // An ico file that is shown at the top of the dialog
  initialDir: // The directory the dialog shows when opened
})
```
## openFile(args)
Open a file selection dialog. Returns the file path and opened file in an array.
```js
const file = await openFile({
  // All arguments seen in openDirectory
  initialFile: // A file name to be selected when opened
  fileTypes: [ // An array of file types that are allowed to be selected
    [
      "PNG", // The name for the file type
      "*.png" // The file type pattern
    ],
    [
      "JPEG", // The name for the file type
      "*.jpg *.jpeg" // Supports multiple
    ]
  ],
  multiple: // Boolean to allow multiple files to be picked. Will return an array of arrays instead
  encoding: // The encoding to open the file with
})
```
## openFileName(args)
Open a file selection dialog. Returns the selected file path.
```js
const filePath = await openFileName({
  // All arguments same as openFile just without encoding
})
```
## saveFile(file, args)
Open a file save dialog. Saves the provided file to the selected file path and returns the selected file path.
```js
const filePath = await saveFile(fileData, {
  // All arguments same as openFile
  confirmOverwrite: // Boolean to disable the confirm overwrite message that appears
})
```
## saveFileName(file, args)
Open a file save dialog. Returns the selected file path.
```js
const filePath = await saveFileName({
  // All arguments same as saveFile just without encoding
})
```
---
### Canceling
When a user cancels a file/directory dialog, a `No file/directory selected` error will be thrown.

---
## confirm(args)
Show a confirmation messagebox. The user can either select `Yes` or `No`. Returns a boolean.
```js
await confirm({
  title: // The title at the top of the dialog
  icon: // An ico file that is shown at the top of the dialog
  message: // The message to show in the dialog,
  warning: // Boolean to enable warning mode. Changes the icon shown to a warning icon.
})
```
---
### Optional arguments
Literally all arguments are optional for every function. Only add the things you want to use.