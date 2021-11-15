import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import { Header } from '../components/molecules/Header/Header';

const PageGrid = styled(Grid)`
	margin: 2rem;
	margin-top: 4rem;
`;

export const DefaultPage: React.FC = ({ children }) => {
	return (
		<Grid container width="100%" height="100%">
			<Header />
			<PageGrid>{children}</PageGrid>
		</Grid>
	);
};
