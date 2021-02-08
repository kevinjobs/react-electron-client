import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Test from '../pages/Test';
import Exam from '../pages/Exam';
import ExifReader from '../pages/ExifReader';


const RouteContent = () => {
  return(
    <Switch>
      <Route path="/Test" component={Test} />
      <Route path="/题库" component={Exam} />
      <Route paht="/ExifReader" component={ExifReader} />
      <Redirect path="/" to={{pathname: '/song'}} />
    </Switch>
  )
}

export default RouteContent;