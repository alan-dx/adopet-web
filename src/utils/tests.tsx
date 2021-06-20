import { render, RenderResult } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ElementType, ReactElement } from 'react';

import { theme } from '../styles/theme';

const withChackraProvider = (children: ReactElement): ReactElement => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);

export const renderWithChackraProvider = (
  Component: ElementType,
  props: Record<string, unknown> = {}
): RenderResult => render(withChackraProvider(<Component {...props} />));
