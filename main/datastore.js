const { ipcMain } = require('electron');
const low = require('lowdb');
const LodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/FileSync');

let jsonFilePath = 'data.json';

ipcMain.on('json-file-path', (err, arg) => {
  console.log(arg);
  jsonFilePath = arg;
})

const adapter = new FileSync(jsonFilePath)

const db = low(adapter);
// db._.mixin(LodashId);

module.exports = db;