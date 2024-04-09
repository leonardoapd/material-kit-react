/* eslint-disable perfectionist/sort-imports */
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import store from 'src/app/store';

const queryClient = new QueryClient();

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  );
}
