import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './context/coinContext';
import { HomePage } from './pages/HomePage';
import { LiquidityPage } from './pages/LiquidityPage';

function App() {
	return (
		<ContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/liquidity" element={<LiquidityPage />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
