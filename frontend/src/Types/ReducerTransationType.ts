import { Dispatch } from "react";
import { TransationActionType } from "./TransationActionType"
import { TransationType } from "./TransationsType"

export type ReducerActionType = {
  type: TransationActionType,
  payload: TransationType
}

export type TransationValueType = {
	state: TransationType[];
	dispatch: Dispatch<ReducerActionType>;
};