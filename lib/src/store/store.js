"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelector = exports.useDispatch = exports.useStore = exports.storeContext = exports.store = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var toolkit_1 = require("@reduxjs/toolkit");
var redux_saga_1 = __importDefault(require("redux-saga"));
var counter_1 = require("./counter");
var sagaMiddleware = (0, redux_saga_1.default)();
var reducer = {
    counter: counter_1.counterReducer,
};
var middleware = [
    sagaMiddleware,
];
exports.store = (0, toolkit_1.configureStore)({
    reducer: reducer,
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().concat(middleware);
    },
    devTools: true,
});
sagaMiddleware.run(counter_1.watchCounterActions);
exports.storeContext = (0, react_1.createContext)(null);
exports.useStore = (0, react_redux_1.createStoreHook)(exports.storeContext);
exports.useDispatch = (0, react_redux_1.createDispatchHook)(exports.storeContext);
exports.useSelector = (0, react_redux_1.createSelectorHook)(exports.storeContext);
//# sourceMappingURL=store.js.map