import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';
import Plot from 'react-plotly.js';
import { toPercent, toUsd } from '../utils/utils';
import { Grid, Paper, useMediaQuery } from '@mui/material';

export const LiquidityPage = () => {
	const { coinList } = useCoins();
	const isTablet = useMediaQuery('(max-width:900px)');
	const isLarge = useMediaQuery('(min-width:1400px)');
	const desired_maximum_marker_size = 50;
	interface chartData {
		text: string[];
		x: number[];
		y: number[];
		size: number[];
	}

	const data = React.useMemo(
		() =>
			coinList.reduce(
				(prev: chartData, curr: Coin) => {
					const cap = curr.quote.USD.market_cap;
					const vol = curr.quote.USD.volume_24h;
					const change = curr.quote.USD.percent_change_24h;

					return {
						text: [
							...prev.text,
							`${curr.name}<br> Cap: ${toUsd(
								cap
							)} <br> Vol: ${toUsd(vol)} <br> Change: ${toPercent(
								change
							)}`,
						],
						x: [...prev.x, cap],
						y: [...prev.y, vol],
						size: [...prev.size, Math.abs(change)],
					};
				},
				{ text: [], x: [], y: [], size: [] }
			),
		[coinList]
	);

	return (
		<DefaultPage>
			<Paper
				elevation={4}
				component={Grid}
				container
				justifyContent="center"
				alignItems="center"
			>
				<Plot
					config={{ responsive: true }}
					data={[
						{
							x: data.x,
							y: data.y,
							text: data.text,
							type: 'scatter',
							mode: 'markers',
							marker: {
								color: coinList.map((coin, i) => {
									const change =
										coin.quote.USD.percent_change_24h;
									if (change < 0) {
										return i % 2 === 0
											? 'rgb(255, 144, 14)'
											: 'rgb(255, 65, 54)';
									}
									if (change > 0) {
										return i % 2 === 0
											? 'rgb(93, 164, 214)'
											: 'rgb(44, 160, 101)';
									}
									return 'rgb(44, 160, 101)';
								}),
								size: data.size,
								sizeref:
									(2 * Math.max(...data.size)) /
									desired_maximum_marker_size ** 2,
								sizemode: 'area',
							},
						},
					]}
					layout={{
						width: isTablet ? 650 : isLarge ? 1300 : 1100,
						height: isTablet ? 800 : isLarge ? 1300 : 1100,
						title: 'Market Liquidity',
					}}
				/>
			</Paper>
		</DefaultPage>
	);
};
