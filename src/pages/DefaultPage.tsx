import { Box } from '@mui/material';

import * as React from 'react';
import { Header } from '../components/Header/Header';

export const DefaultPage: React.FC = ({ children }) => {
	return (
		<Box maxWidth="100vw" maxHeight="100vh">
			<Header />
			{children}
		</Box>
	);
};
