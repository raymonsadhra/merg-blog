import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function Header() {
    const path = useLocation();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.user);
    const { theme }  = useSelector((state) => state.theme); 
  return (
    <Navbar className='border-b-2 flex justify-between items-center p-4'>
      {/* Logo and Blog Title */}
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Raymon's Blog
        </span>
      </Link>
      
      {/* Search Form */}
      <div className='flex-grow flex justify-center'>
        <form className='relative hidden lg:flex items-center w-full max-w-lg'>
          <TextInput
            type='text'
            placeholder='Search...'
            className='w-full pr-10'
          />
          <AiOutlineSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
        </form>
      </div>
      
      {/* Buttons: Dark Mode and Sign In */}
      <div className="flex items-center gap-2">
        <Button className='w-12 h-12 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        
        </Button>
        {currentUser ? (
          <Dropdown 
            arrowIcon = {false}
            inline
            label = {
                <Avatar
                  alt='user'
                  img = {currentUser.profilePicture}
                  rounded
                />
            }

          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>

          </Dropdown>
        ):
          <Link to='/sign-in'>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3">
              Sign In
            </Button>
          </Link>
        } 
      
      </div>

      {/* Mobile Search Button */}
      <Button className='w-12 h-12 lg:hidden' color='gray'>
        <AiOutlineSearch />
      </Button>

      {/* Navigation Links for Desktop */}
      <div className="hidden lg:flex items-center gap-4">
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </div>

      {/* Navbar.Collapse for Mobile View */}
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
