import {
	AppBar,
	MenuItem,
	Select,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useCoins } from '../../context/coinContext';

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	padding: 1rem;
	color: black;
`;

export const Header: React.FC = () => {
	const theme = useTheme();
	const { value, onChange, coinList } = useCoins();

	const activeStyle: CSSProperties = {
		color: theme.palette.text.primary,
		fontWeight: 800,
	};

	return (
		<AppBar>
			<Toolbar>
				<StyledNavLink
					to="/"
					style={({ isActive }) => (isActive ? activeStyle : {})}
				>
					Home
				</StyledNavLink>
				<StyledNavLink
					sx={{ flexGrow: 1 }}
					to="/liquidity"
					style={({ isActive }) => (isActive ? activeStyle : {})}
				>
					Liquidity
				</StyledNavLink>
				<Typography mr="0.5rem" color="black">
					Show Top
				</Typography>
				<Select
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
				>
					<MenuItem value={10}>10 Coins</MenuItem>
					<MenuItem value={50}>50 Coins</MenuItem>
					<MenuItem value={5000}>All Coins</MenuItem>
				</Select>
			</Toolbar>
		</AppBar>
	);
};
