import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Form from './components/Form/Form';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box width="auto" py="50px" height="auto" bgColor="#0d1217">
        <Form />
      </Box>
    </ChakraProvider>
  );
}

export default App;
