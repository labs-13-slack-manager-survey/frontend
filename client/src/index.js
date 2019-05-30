import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import './index.css';
import 'intro.js/introjs.css';
import App from './App';

import DateFnsUtils from '@date-io/date-fns';

ReactDOM.render(
	<Router>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<App />
		</MuiPickersUtilsProvider>
	</Router>,
	document.getElementById('root')
);
