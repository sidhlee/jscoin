import { Stack } from '@chakra-ui/react';
import MenuItem from './MenuItem';

type MenuItemsProps = {
  isOpen: boolean;
};

const MenuItems: React.FC<MenuItemsProps> = ({ isOpen }) => {
  const mobileDisplay = isOpen ? 'block' : 'none';
  return (
    <Stack
      display={[mobileDisplay, mobileDisplay, 'block', 'block']}
      spacing={4}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      wrap="nowrap"
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/settings">Settings</MenuItem>
      <MenuItem to="/new/transaction">Create transaction</MenuItem>
    </Stack>
  );
};

export default MenuItems;
