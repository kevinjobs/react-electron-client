import React from 'react';
import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

const FileBrowser: React.FC = () => {
  const [files, setFiles] = React.useState<any[]>();
  let allFiles: any[] = [];
  
  const readFiles = (dirpath: string) => {
    fs.readdir(dirpath, (err: any, files: any) => {
      if (err) throw err;
      files.map((file: any) => {
        const fpath = path.join(dirpath, file);
        fs.stat(fpath, (err: any, stat: any) => {
          if (stat.isFile()) allFiles.push(file);
          else readFiles(fpath);
        })
      })
    });
  }

  const handleClick = (e: any) => {
    const result = remote.dialog.showOpenDialogSync({
      properties: ['openDirectory']
    });
    if (result) {
      allFiles = [];
      readFiles(result[0]);
      setTimeout(() => {
        setFiles(allFiles);
      }, 100)
    }
  }

  const renderItem = (item: any, index: number) => {
    return <li key={index}>{ item }</li>
  }

  React.useEffect(() => {
    readFiles('./main');
    setTimeout(() => {
      setFiles(allFiles);
    }, 100);
  }, [])

  return (
    <div className="file-brower">
      <button onClick={handleClick}>打开目录</button>
      { files && files.map(renderItem) }
    </div>
  )
}

export default FileBrowser;