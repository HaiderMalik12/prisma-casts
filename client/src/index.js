import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	disableOffline: true
});
ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
