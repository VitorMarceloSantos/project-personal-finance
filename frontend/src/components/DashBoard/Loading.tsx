import { useEffect, useState } from 'react';
// import { SetReturnLocalStorageType } from '../../Types/DashBoard/UseStateReturnLocalStorageType';
import { VerifyTrueOrFalseLocalStorage } from '../../utils/VerifyLocalStorage';
import AlertLocalStorage from './AlertLocalStorage';

export const Loading = () => {
	const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

	useEffect(() => {
		if (VerifyTrueOrFalseLocalStorage()) {
			setVerifyLoading(true);
		}
	}, []);
  
	return (
		<section>
			<h1>Carregando - Skeleton</h1>
			{verifyLoading && <AlertLocalStorage />}
		</section>
	);
};
