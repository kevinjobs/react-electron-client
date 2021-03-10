import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/Sidebar';
import RouteContent from './routes';

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  const menus = [
    '题库',
    'Exif读取',
    '文件浏览器'
  ]

  return(
    <>
      <HashRouter>
        <div className="Left">
          <Sidebar menus={menus} />
        </div>
        <div className="Center no-scroll-bar">
          <RouteContent />
        </div>
      </HashRouter>
    </>
  )
}

export default App;