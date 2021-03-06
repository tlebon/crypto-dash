import * as React from 'react';
import { API_KEY } from '../globals';

const CoinContext = React.createContext({
	number: 10, //TODO: consider saving initial value in localStorage
	setNumber: (x: number) => {},
	coins: [] as Coin[],
});

const useCoins = () => {
	const { coins, setNumber, number } = React.useContext(CoinContext);
	const handleCoins = (value: number) => {
		setNumber(value);
	};
	return { coinList: coins, onChange: handleCoins, value: number };
};

interface ContextProviderProps {
	children: React.ReactElement;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
	const [coins, setCoins] = React.useState<Coin[]>([]);
	const [number, setNumber] = React.useState(useCoins().value);
	const value = React.useMemo(
		() => ({ number, setNumber, coins }),
		[coins, number]
	);

	React.useEffect(() => {
		async function fetcher() {
			try {
				let response = await fetch(
					`https://timothy-cors.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${number}`,
					{
						method: 'GET',
						headers: {
							'X-CMC_PRO_API_KEY': API_KEY,
						},
					}
				);
				const parsed = await response.json();
				setCoins(parsed.data);
			} catch (e) {
				console.log('error', e);
			}
		}
		fetcher();
	}, [number]);

	return (
		<CoinContext.Provider value={value}>{children}</CoinContext.Provider>
	);
};

export { ContextProvider, useCoins };
