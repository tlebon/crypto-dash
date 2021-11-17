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
