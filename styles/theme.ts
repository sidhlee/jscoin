import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: '112.5%',
      },
    },
  },
});

export default theme;
