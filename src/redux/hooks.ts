import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
