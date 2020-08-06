import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/user/auth";
import signupReducer from "./reducers/user/signup";
import reduxThunk from "redux-thunk";
import questionReducer from "./reducers/post/question";
import gossipReducer from "./reducers/post/gossip";
import { composeWithDevTools } from "redux-devtools-extension";

const baseReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  question: questionReducer,
  gossip: gossipReducer,
});

const store = createStore(
  baseReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
export default store;
