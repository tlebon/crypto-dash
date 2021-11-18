/**
 * Now unused but previously used to cycle through a small Color(or any T) array up to the total coinList size
 * @param arr an array of type T
 * @param value number to duplicate array values up to
 * @returns an array of type T with length value
 */
export function duplicateItems<T>(arr: Array<T>, value: number): Array<T> {
	const newArr = arr.concat(arr);
	if (newArr.length > value) {
		return newArr.slice(0, value);
	}
	if (newArr.length === value) {
		return newArr;
	}
	return duplicateItems(newArr, value);
}

/**
 * converts a number to a sting in dollars
 * @param x number to convert
 * @param fixed number of decimals (default is 0)
 * @returns
 */
export const toUsd = (x: number, fixed = 0): string =>
	`$${Number(x.toFixed(fixed)).toLocaleString('en')}`;

/**
 * converts a number to a to a percent string
 * @param x number to convert
 * @param fixed number of decimals (default is 4)
 * @returns
 */
export const toPercent = (x: number, fixed = 4) => `${x.toFixed(fixed)}%`;

export const toRowTransformer = (array: Coin[]) =>
	array.map((coin: Coin) => ({
		rank: coin.cmc_rank,
		name: coin.name,
		price: toUsd(coin.quote.USD.price, 2),
		priceChange: toPercent(coin.quote.USD.percent_change_24h),
		marketCap: toUsd(coin.quote.USD.market_cap),
		volume: toUsd(coin.quote.USD.volume_24h),
	}));

interface chartData {
	text: string[];
	x: number[];
	y: number[];
	size: number[];
}

export const toTableData = (array: Coin[]) =>
	array.reduce(
		(prev: chartData, curr: Coin) => {
			const cap = curr.quote.USD.market_cap;
			const vol = curr.quote.USD.volume_24h;
			const change = curr.quote.USD.percent_change_24h;

			return {
				text: [
					...prev.text,
					`${curr.name}<br> Cap: ${toUsd(cap)} <br> Vol: ${toUsd(
						vol
					)} <br> Change: ${toPercent(change)}`,
				],
				x: [...prev.x, cap],
				y: [...prev.y, vol],
				size: [...prev.size, Math.abs(change)],
			};
		},
		{ text: [], x: [], y: [], size: [] }
	);
