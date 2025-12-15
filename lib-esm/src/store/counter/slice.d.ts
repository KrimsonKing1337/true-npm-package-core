import { PayloadAction } from '@reduxjs/toolkit';
import { State } from './@types';
export declare const initialState: State;
export declare const reducer: import("redux").Reducer<State>, actions: import("@reduxjs/toolkit").CaseReducerActions<{
    setCount(state: import("immer").WritableDraft<State>, action: PayloadAction<State["count"]>): void;
    increment(_state: import("immer").WritableDraft<State>): void;
    decrement(_state: import("immer").WritableDraft<State>): void;
}, "@counter">;
