import { ChildrenType } from '../Types/ChildrenType';
import { useState } from 'react';
import { DrawerContext } from './DrawerContext';

export const DrawerProvider = ({ children }: ChildrenType) => {
	const [state, setStateDrawer] = useState<boolean>(false);

	const handlerSetDrawer = () => {
		setStateDrawer((prev) => (!prev));
	};
	return <DrawerContext.Provider value={{ isDrawerOpen: state, handlerSetDrawer }}>{children}</DrawerContext.Provider>;
};
