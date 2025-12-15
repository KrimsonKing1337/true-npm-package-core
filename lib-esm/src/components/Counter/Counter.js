import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'store';
import { counterSelectors, counterActions } from 'store/counter';
import * as styles from './Counter.scss';
export var Counter = function () {
    var dispatch = useDispatch();
    var count = useSelector(counterSelectors.count);
    var minusClickHandler = function () {
        dispatch(counterActions.decrement());
    };
    var plusClickHandler = function () {
        dispatch(counterActions.increment());
    };
    return (_jsxs("div", { className: styles.Wrapper, children: [_jsx("button", { onClick: minusClickHandler, children: "-" }), _jsx("div", { children: count }), _jsx("button", { onClick: plusClickHandler, children: "+" })] }));
};
//# sourceMappingURL=Counter.js.map