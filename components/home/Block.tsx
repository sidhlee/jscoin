type BlockProps = {
  hash: string;
  prevHash: string;
  nonce: number;
  timestamp: number;
};

const Block: React.FC<BlockProps> = ({ hash, prevHash, nonce, timestamp }) => {
  return <div></div>;
};

export default Block;
