import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();

export default (preloadedState, config) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga, config);
  return store;
};
