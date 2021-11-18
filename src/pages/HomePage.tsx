import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	useMediaQuery,
	Grid,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { styled } from '@mui/system';
import * as React from 'react';
import { useCoins } from '../context/coinContext';
import { toRowTransformer } from '../utils/utils';
import { DefaultPage } from './DefaultPage';

const StyledTableCell = styled(TableCell)`
	&.MuiTableCell-head {
		background-color: grey;
	}
`;

const tableHeadings = [
	'Rank',
	'Name',
	'Price',
	'Price Change (24h)',
	'Market Cap',
	'Volume (24h)',
];

export const HomePage = () => {
	const { value, coinList } = useCoins();
	const isTablet = useMediaQuery('(max-width:900px)');
	const isLarge = useMediaQuery('(min-width:1400px)');

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const rows = toRowTransformer(coinList);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<DefaultPage>
			<Grid mx="1rem" my="1rem" pt="3rem">
				<TableContainer component={Paper}>
					<Table
						sx={{
							minWidth: isTablet ? 650 : isLarge ? 1300 : 1000,
						}}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								{tableHeadings.map((heading) => (
									<StyledTableCell key={heading}>
										{heading}
									</StyledTableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? rows.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: rows
							).map((row) => (
								<TableRow
									key={row.name}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									{Object.values(row).map((value) => (
										<TableCell key={value} align="left">
											{value}
										</TableCell>
									))}
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						{value >= 50 && (
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											50,
											{ label: 'All', value: -1 },
										]}
										colSpan={6}
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: {
												'aria-label': 'rows per page',
											},
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={
											handleChangeRowsPerPage
										}
										ActionsComponent={
											TablePaginationActions
										}
									/>
								</TableRow>
							</TableFooter>
						)}
					</Table>
				</TableContainer>
			</Grid>
		</DefaultPage>
	);
};
