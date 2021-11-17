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

export const toUsd = (x: number, fixed = 0): string =>
	`$${Number(x.toFixed(fixed)).toLocaleString('en')}`;

export const toPercent = (x: number, fixed = 4) => `${x.toFixed(fixed)}%`;
