import { Stack, StackProps } from '@chakra-ui/react';

const Main: React.FC = (props: StackProps) => {
  return <Stack spacing="1.5rem" width="100%" maxWidth="48rem" {...props} />;
};

export default Main;
