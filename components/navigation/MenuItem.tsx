import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

type MenuItemProps = {
  to: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ to, children, ...rest }) => {
  return (
    <NextLink href={to} passHref>
      <Button
        as="a"
        {...rest}
        variant="outline"
        color="white"
        _hover={{ color: 'currentColor', background: "white" }}
      >
        {children}
      </Button>
    </NextLink>
  );
};

export default MenuItem;
