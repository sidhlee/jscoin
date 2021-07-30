import { Box } from '@chakra-ui/react';
import { IoMenu, IoClose } from 'react-icons/io5';

type MenuButtonProps = {
  toggleMenu: () => void;
  isOpen: boolean;
};

const MenuButton: React.FC<MenuButtonProps> = ({ toggleMenu, isOpen }) => {
  return (
    <Box as="button" display={{ base: 'block', md: 'none' }}>
      {isOpen ? <IoClose size="40" color={'white'} /> : <IoMenu size="40" color={'white'}/>}
    </Box>
  );
};

export default MenuButton;
