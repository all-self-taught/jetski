import constants from '../actions/constants';

export default (state = { formData: {}, pageData: {}, pageError: '', pageLoading: true }, action) => {
  switch (action.type) {
    case constants.UPDATE_PAGE_DATA:
      return {
        ...state,
        pageData: {
          ...state.pageData,
          ...action.data
        }
      };
    case constants.UPDATE_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.data
        }
      };
    case constants.IS_PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.data
      };
    case constants.CLEAR_PAGE:
      return {
        formData: {},
        pageData: {},
        pageError: '',
        pageLoading: true
      };
    case constants.SET_PAGE_ERROR:
      return {
        ...state,
        pageError: action.data
      }  
    default:
      return {
        ...state
      };  
  }
}