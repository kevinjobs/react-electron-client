import React from 'react';
import { ipcRenderer } from 'electron';

const ExifReader: React.FC = () => {
  const [exif, setExif] = React.useState<any>();

  React.useEffect(() => {
    // 接收主进程读取的图片exif信息
    ipcRenderer.on('read-exif-reply', (event, data) => {
      setExif(data);
      console.log(data);
    })
  }, [])

  return (
    <div className="Exif-Reader">
      <button onClick={e => ipcRenderer.send('image', 'read-exif')}>
        Open the picture
      </button>
      <table>
      </table>
    </div>
  )
}

export default ExifReader;