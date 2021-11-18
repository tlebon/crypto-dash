import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';
import Plot from 'react-plotly.js';
import { toTableData } from '../utils/utils';
import { Grid, Paper, useMediaQuery } from '@mui/material';

export const LiquidityPage = () => {
	const { coinList } = useCoins();
	const isTablet = useMediaQuery('(max-width:900px)');
	const isLarge = useMediaQuery('(min-width:1420px)');
	const desired_maximum_marker_size = 50;

	const data = toTableData(coinList);

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
						height: isTablet ? 800 : isLarge ? 800 : 650,
						title: 'Market Liquidity',
					}}
				/>
			</Paper>
		</DefaultPage>
	);
};
