import { createTheme } from '@mui/material/styles';
import * as styles from '!!./module/lessVarsLoader!./theme.less';

export const theme = createTheme({
	palette: {
		primary: {
			main: styles['@C1'],
		},
		secondary: {
			main: styles['@C2'],
		},
		error: {
			main: styles['@C3'],
		},
		success: {
			main: styles['@C4'],
		},
		warning: {
			main: styles['@C5'],
		},
	},
});
