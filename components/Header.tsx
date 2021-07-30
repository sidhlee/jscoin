import Navbar from './navigation/Navbar';
import Logo from './navigation/Logo';
import MenuButton from './navigation/MenuButton';
import { useState } from 'react';
import MenuItems from './navigation/MenuItems';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <Navbar>
        <Logo />
        <MenuButton
          isOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen((v) => !v)}
        />
        <MenuItems isOpen={isMenuOpen} />
      </Navbar>
    </header>
  );
};

export default Header;
