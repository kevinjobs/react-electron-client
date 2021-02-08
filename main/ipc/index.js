const { ipcMain } = require('electron');
const { readBank, readByTitle } = require('./question');
const { readExif } = require('./image/exif');

ipcMain.on('question', (event, method, type, title) => {
  switch(method) {
    case 'read-by-title':
      readByTitle(event, type, title);
      break;
    default:
      break;
  }
})

ipcMain.on('bank', (event, method, path) => {
  switch (method) {
    case 'read':
      readBank(event, path);
      break;
    default:
      break;
  }
})

ipcMain.on('image', (event, type) => {
  switch (type) {
    case 'read-exif':
      readExif(event)
      break;
    default:
      break;
  }
})