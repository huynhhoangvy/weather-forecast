import createSagaMiddleware from "redux-saga";
import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const TransformState = createTransform(
  (inboundState, key) => {
    console.log('in: ', inboundState);
    console.log('key: ', key)
    // return {...inboundState, };
  },
  (outboundState, key) => {
    console.log('in: ', outboundState);
    console.log('key: ', key)
    // return {...outboundState};
  },
  { whitelist: [''] }
)

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['weather'],
  // transform: [TransformState]
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);