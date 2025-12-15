import { type ReactReduxContextValue } from 'react-redux';
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    counter: import("./counter/@types").State;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        counter: import("./counter/@types").State;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type StoreContext = ReactReduxContextValue<RootState> | null;
export declare const storeContext: import("react").Context<StoreContext>;
export declare const useStore: import("react-redux").UseStore<import("redux").Store<{
    counter: import("./counter/@types").State;
}, import("redux").UnknownAction, unknown>>;
export declare const useDispatch: import("react-redux").UseDispatch<import("redux").Dispatch<import("redux").UnknownAction>>;
export declare const useSelector: import("react-redux").UseSelector<unknown>;
