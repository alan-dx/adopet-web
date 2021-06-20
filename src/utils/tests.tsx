import { render, RenderResult } from '@testing-library/react';
import { ChakraProvider, useQuery } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';

import { ElementType, ReactElement } from 'react';

import { theme } from '../styles/theme';

const withProviders = (children: ReactElement): ReactElement => (
  <ChakraProvider resetCSS theme={theme}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ChakraProvider>
);

export const renderWithChackraProvider = (
  Component: ElementType,
  props: Record<string, unknown> = {}
): RenderResult => render(withProviders(<Component {...props} />));
