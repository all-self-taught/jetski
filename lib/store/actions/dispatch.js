import constants from './constants';
import actions from './';

export const dispatcher = dispatch => ({
  onChange: field => ({ target: { value }}) => dispatch(
    actions(
      constants.UPDATE_FORM_DATA,
      { [field]: value }
    )
  ),
  onSubmit: () => dispatch(
    actions(
      constants.SEND_FORM_DATA
    )
  )
})