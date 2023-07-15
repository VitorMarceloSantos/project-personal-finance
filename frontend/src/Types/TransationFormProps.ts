import { Dispatch, SetStateAction } from 'react';
import { TransationActionType } from './TransationActionType';

export type TransationFormProps = {
	verifyActionTransation: TransationActionType;
  setFormDisplay: Dispatch<SetStateAction<boolean>>;
};
