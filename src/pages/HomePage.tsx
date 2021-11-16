import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';

export const HomePage = () => {
	const { value, onChange, coinList } = useCoins();
	console.log(coinList);
	return (
		<DefaultPage>
			<>
				<h1> this is the homepage</h1>
				<button onClick={() => onChange(value + 5)}> </button>

				{/* {coinList.data.map} */}
			</>
		</DefaultPage>
	);
};
