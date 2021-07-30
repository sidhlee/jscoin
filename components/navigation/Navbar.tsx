import { Flex } from '@chakra-ui/react';

const Navbar: React.FC = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      py={2}
      px={4}
      bg={'gray.800'}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Navbar;
