import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const Chakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </>
  )
}
export default Chakra;
