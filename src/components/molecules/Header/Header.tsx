import { AppBar, Toolbar, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	padding: 1rem;
	color: black;
`;

export const Header: React.FC = () => {
	const theme = useTheme();

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
					to="/liquidity"
					style={({ isActive }) => (isActive ? activeStyle : {})}
				>
					Liquidity
				</StyledNavLink>
			</Toolbar>
		</AppBar>
	);
};
