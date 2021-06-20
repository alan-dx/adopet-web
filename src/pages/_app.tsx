import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
