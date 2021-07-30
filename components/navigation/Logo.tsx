import { Box, Text } from '@chakra-ui/react';

const Logo: React.FC = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontWeight="bold" color="white">
        JSCoin
      </Text>
    </Box>
  );
};

export default Logo;
