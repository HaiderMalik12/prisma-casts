import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_TOKEN } from './constants';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    //if there is a token in localstroage
    const token = localStorage.getItem(AUTH_TOKEN);
    //then we need to add token to authorization header
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    //if error comes then we need to remove the token from localStorage
    if (graphQLErrors) {
      console.error(graphQLErrors);
    }
    if (networkError) {
      //token has expired then
      if (networkError.statusCode === 401) {
        //this will logout the user
        localStorage.removeItem(AUTH_TOKEN);
      }
    }
  }
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
