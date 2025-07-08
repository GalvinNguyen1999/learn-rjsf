'use client';

import { ChakraProvider, Box } from '@chakra-ui/react';
import FormBuilder from '../components/FormBuilder';

export default function Home() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <FormBuilder />
      </Box>
    </ChakraProvider>
  );
}
