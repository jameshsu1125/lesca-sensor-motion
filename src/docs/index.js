import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './components/navigation';
import Demo from './pages/demo';
import Usage from './pages/usage';
import './styles.less';
import { theme } from './theme';

const App = () => {
	const [state, setState] = useState('demo');

	const appendPage = () => {
		switch (state) {
			default:
			case 'demo':
				return <Demo />;

			case 'usage':
				return <Usage />;
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Navigation setState={setState} state={state} />
			<Container style={{ paddingTop: '70px' }} maxWidth='lg'>
				{appendPage()}
			</Container>
		</ThemeProvider>
	);
};

createRoot(document.getElementById('app')).render(<App />);
