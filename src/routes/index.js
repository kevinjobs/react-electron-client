import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Test from '../pages/Test';
import Exam from '../pages/Exam';

export default function RouteContent() {
  return(
    <Switch>
      <Route path="/Test" component={Test} />
      <Route path="/题库" component={Exam} />
      <Redirect path="/" to={{pathname: '/song'}} />
    </Switch>
  )
}