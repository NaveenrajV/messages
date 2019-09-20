import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../reducers/authReducer";
import rootSaga from "../sagas/sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  authReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
