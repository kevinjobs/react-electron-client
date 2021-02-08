const { dialog } = require('electron');
const fs = require('fs');
const ExifImage = require('exif').ExifImage;

const readExif = async (event) => {
  const result = await dialog.showOpenDialog({
    title: '打开图片',
    properties: [
      'openFile'
    ],
    filters: [{
      name: 'Image',
      extensions: ['jpg', 'png', 'jpeg']
    }]
  });

  if (!result.canceled) {
    fs.readFile(result.filePaths[0], (err, data) => {
      if (err) console.error(err);
      else {
        try {
          new ExifImage({image: result.filePaths[0]}, (err, exifData) => {
            if (err) console.error(err);
            else event.reply('read-exif-reply', exifData);
          })
        } catch (err) {
          console.error(err);
        }
      };
    })
  }
}

module.exports = {
  readExif
}