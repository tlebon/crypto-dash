import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { LiquidityPage } from './pages/LiquidityPage';

export const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/liquidity" element={<LiquidityPage />} />
			</Routes>
		</Router>
	);
};
