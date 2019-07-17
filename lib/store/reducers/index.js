import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import global from './global';
import page from './page';

export default history =>
  combineReducers({
    router: connectRouter(history),
    global,
    page
  });
