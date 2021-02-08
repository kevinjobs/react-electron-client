import React from 'react';
import { ipcRenderer } from 'electron';

import Button from '../../components/Button';
import './test.scss';

import ReactJson from 'react-json-view';

const Song: React.FC = () => {
  const [exif, setExif] = React.useState<object>({});

  const handleClick = async () => {
    ipcRenderer.send('image', 'read-exif');
  }

  React.useEffect(() => {
    // 接收主进程读取的图片exif信息
    ipcRenderer.on('read-exif-reply', (event, data) => {
      setExif(data);
    })
  }, [])

  return(
    <div className="Song">
      <Button onClick={handleClick} type="primary" size="small">Read</Button>
      <ReactJson src={exif} indentWidth={2} enableClipboard={false}/>
    </div>
  )
}

export default Song;