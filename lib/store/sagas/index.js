import { put, select, takeEvery, takeLatest, call } from 'redux-saga/effects';
import fetchService from '../../service';
import actions from '../actions';
import constants from '../actions/constants';
import { getPage } from '../selectors';

function* loadApi(path, config) {
  const state = yield select();
  const { scope, name, onSuccess, onFailure } = path;
  try {
    const data = yield call(fetchService, config.global.BASE_URL, { path, state });
    const action = scope === 'global' ? constants.UPDATE_APP_DATA : constants.UPDATE_PAGE_DATA;
    yield put(actions(action, { [name]: data }))
    if (onSuccess) onSuccess(state);
  } catch(error) {
    yield put(actions(constants.SET_PAGE_ERROR, error.message));
    if (onFailure) onFailure(state);
  }
}

function* onFormSubmit(path, config) {
  yield put(actions(constants.IS_PAGE_LOADING, true));
  yield call(loadApi, path, config);
  yield put(actions(constants.IS_PAGE_LOADING, false));
}

function* onLocationChange(config) {
  yield put(actions(constants.CLEAR_PAGE_DATA));
  
  const { page, params } = yield select(getPage(config));
  
  if (params) yield put(actions(constants.UPDATE_PAGE_DATA, { params }));
  if (page) {
    if (Array.isArray(page.load)) {
      for (let path of page.load) {
        yield call(loadApi, path, config);
      }
    }
    yield put(actions(constants.IS_PAGE_LOADING, false));
    if (page.submit) yield takeLatest(constants.SEND_FORM_DATA, onFormSubmit, page.submit, config);
  }
}  

function* rootSaga(config) {
  if (config.global.load && Array.isArray(config.global.load)) {
    for (let path of config.global.load) {
      yield call(loadApi, path, config);
    }
  }
  yield put(actions(constants.IS_APP_LOADING, false));
  yield takeEvery(constants.LOCATION_CHANGE, onLocationChange, config);   
}

export default rootSaga;
