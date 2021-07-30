import { Flex, FlexProps } from '@chakra-ui/react';

const Container: React.FC<FlexProps> = (props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      {...props}
    />
  );
};

export default Container;
