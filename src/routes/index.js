import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Test from '../pages/Test';
import Exam from '../pages/Exam';
import ExifReader from '../pages/ExifReader';
import FileBrowser from '../pages/FileBrowser';


const RouteContent = () => {
  return(
    <Switch>
      <Route path="/测试页面" component={Test} />
      <Route path="/题库" component={Exam} />
      <Route path="/Exif读取" component={ExifReader} />
      <Route path="/文件浏览器" component={FileBrowser} />
      <Redirect from="/" to="/文件浏览器" />
    </Switch>
  )
}

export default RouteContent;