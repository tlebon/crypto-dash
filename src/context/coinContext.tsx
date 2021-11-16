import * as React from 'react';

const CoinContext = React.createContext({
	number: 100,
	setNumber: (x: number) => {},
	coins: {},
});

const useCoins = () => {
	const { coins, setNumber } = React.useContext(CoinContext);
	const handleCoins = (value: number) => {
		setNumber(value);
	};
	return { value: coins, onChange: handleCoins };
};

interface ContextProviderProps {
	children: React.ReactElement;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
	const [coins, setCoins] = React.useState({});
	const [number, setNumber] = React.useState(100);
	const value = React.useMemo(
		() => ({ number, setNumber, coins }),
		[coins, number]
	);

	React.useEffect(() => {
		async function fetcher() {
			let response = await fetch(
				`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest&limit=${number}`,
				{
					method: 'GET',
					headers: {
						'X-CMC_PRO_API_KEY':
							process.env.REACT_APP_API_KEY ?? '',
					},
				}
			);
			setCoins(response);
		}
		fetcher();
	}, [number]);

	return (
		<CoinContext.Provider value={value}>{children}</CoinContext.Provider>
	);
};

export { ContextProvider, useCoins };
