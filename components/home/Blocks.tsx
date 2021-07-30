import { Heading, Text } from '@chakra-ui/react';

type BlocksProps = {};

const Blocks: React.FC<BlocksProps> = ({}) => {
  return (
    <div>
      <Heading>Blocks on chain</Heading>
      <Text>
        Each card represents a block on the chain. Click on a block to see the
        transactions stored inside.
      </Text>
    </div>
  );
};

export default Blocks;
