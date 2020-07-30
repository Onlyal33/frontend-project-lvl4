import { combineReducers } from 'redux';
import messagesReducer from 'features/messages/messagesSlice';

export default combineReducers({
  messages: messagesReducer,
});
