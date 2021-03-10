import React from 'react';
import { remote } from 'electron';
import fs from 'fs';
import './_style.scss';
const ExifImage = require('exif').ExifImage;

const ExifReader: React.FC = () => {
  const [exifInfo, setExifInfo] = React.useState<any>({});

  const handleClick = async () => {
    await readExif();
  }

  const readExif = async () => {
    const result = await remote.dialog.showOpenDialog({
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
      fs.readFile(result.filePaths[0], (err: any, data: any) => {
        if (err) console.error(err);
        else {
          try {
            new ExifImage({image: result.filePaths[0]}, (err: any, exifData: any) => {
              if (err) console.error(err);
              else setExifInfo(exifData);
            })
          } catch (err) {
            console.error(err);
          }
        };
      })
    }
  }

  const renderExif = (exifInfo: any) => {
    const { image, exif } = exifInfo;
    return (
      <>
        <li>制造商 { image?.Make }</li>
        <li>型号 { image?.Model }</li>
        <li>修改日期 { image?.ModifyDate }</li>
        <li>焦距 { exif?.FocalLength }</li>
        <li>快门 1/{ Number( 1 / exif?.ExposureTime).toFixed() }</li>
        <li>光圈 { exif?.FNumber }</li>
        <li>ISO { exif?.ISO }</li>
      </>
    )
  }

  return(
    <div className="exif-reader">
      <button onClick={handleClick}>Read</button>
      { exifInfo && renderExif(exifInfo) }
    </div>
  )
}

export default ExifReader;