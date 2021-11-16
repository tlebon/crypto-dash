import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';

export const HomePage = () => {
	const { value, onChange, coinList } = useCoins();
	const tableHeadings = [
		'Rank',
		'Name',
		'Price',
		'Price Change (24h)',
		'Market Cap',
		'Volume (24h)',
	];

	// TODO: consider moving to its own file for utils
	// TODO: clean up values - round or turn into strings
	const rows = coinList.map((coin: Coin) => ({
		rank: coin.cmc_rank,
		name: coin.name,
		price: coin.quote.USD.price,
		priceChange: coin.quote.USD.percent_change_24h,
		marketCap: coin.quote.USD.market_cap,
		volume: coin.quote.USD.volume_24h,
	}));

	// TODO: pagination, moving onChange onto table (probably)
	return (
		<DefaultPage>
			<>
				<h1> this is the homepage</h1>
				<button onClick={() => onChange(value + 5)}>+5 </button>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								{tableHeadings.map((heading) => (
									<TableCell>{heading}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									{Object.values(row).map((value) => (
										<TableCell>{value}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</>
		</DefaultPage>
	);
};
