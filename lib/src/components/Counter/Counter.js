"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var store_1 = require("../../store");
var counter_1 = require("../../store/counter");
var styles = __importStar(require("./Counter.scss"));
var Counter = function () {
    var dispatch = (0, store_1.useDispatch)();
    var count = (0, store_1.useSelector)(counter_1.counterSelectors.count);
    var minusClickHandler = function () {
        dispatch(counter_1.counterActions.decrement());
    };
    var plusClickHandler = function () {
        dispatch(counter_1.counterActions.increment());
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: styles.Wrapper, children: [(0, jsx_runtime_1.jsx)("button", { onClick: minusClickHandler, children: "-" }), (0, jsx_runtime_1.jsx)("div", { children: count }), (0, jsx_runtime_1.jsx)("button", { onClick: plusClickHandler, children: "+" })] }));
};
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map