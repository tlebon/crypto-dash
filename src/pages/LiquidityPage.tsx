import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';

export const LiquidityPage = () => {
	const { value, onChange, coinList } = useCoins();
	console.log(coinList);
	return (
		<DefaultPage>
			<h1> this is the liquidity page</h1>
			<button onClick={() => onChange(value + 5)}> </button>
		</DefaultPage>
	);
};
