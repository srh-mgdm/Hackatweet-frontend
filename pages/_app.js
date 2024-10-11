import '../styles/globals.css';
import Head from 'next/head';

// redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import user from '../reducers/user'

const store = configureStore({
  reducer: {user},//<--- ici il est necessaire avoir une reducer>
 });

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
      </Provider>
  );
}

export default App;
