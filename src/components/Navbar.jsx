import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between bg-white shadow p-2 items-center px-5 md:px-56'>
      {/* Logo or Brand Name */}
      <div className="flex justify-center font-bold mt-2 md:mt-0 md:mb-0">
        <Link to="/">
          Peta SMP se-Kab Blitar
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex justify-between md:w-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">Beranda</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/zonasi">Cek Jarak</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
