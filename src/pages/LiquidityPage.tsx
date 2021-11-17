import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { DefaultPage } from './DefaultPage';
import Plot from 'react-plotly.js';
import { duplicateItems } from '../utils/utils';

export const LiquidityPage = () => {
	const { value, onChange, coinList } = useCoins();
	const desired_maximum_marker_size = 50;
	interface chartData {
		text: string[];
		x: number[];
		y: number[];
		size: number[];
	}
	// TODO: round to two
	const data = React.useMemo(
		() =>
			coinList.reduce(
				(prev: chartData, curr: Coin) => ({
					text: [
						...prev.text,
						`${curr.name}<br> cap: $${Math.floor(
							curr.quote.USD.market_cap
						)} <br> vol: $${Math.floor(curr.quote.USD.volume_24h)}`,
					],
					x: [...prev.x, curr.quote.USD.market_cap],
					y: [...prev.y, curr.quote.USD.volume_24h],
					size: [
						...prev.size,
						Math.abs(curr.quote.USD.percent_change_24h),
					],
				}),
				{ text: [], x: [], y: [], size: [] }
			),
		[coinList]
	);

	return (
		<DefaultPage>
			<button onClick={() => onChange(value + 5)}> </button>

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
							color: duplicateItems(
								[
									'rgb(93, 164, 214)',
									'rgb(255, 144, 14)',
									'rgb(44, 160, 101)',
									'rgb(255, 65, 54)',
								],
								value
							),
							size: data.size,
							sizeref:
								(2 * Math.max(...data.size)) /
								desired_maximum_marker_size ** 2,
							sizemode: 'area',
						},
					},
				]}
				layout={{
					width: window.innerWidth - 50,
					height: window.innerHeight - 120,
					title: 'Market Liquidity',
				}}
			/>
		</DefaultPage>
	);
};
