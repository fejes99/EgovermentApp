import { Link, NavLink } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { logout, useAuth } from 'wasp/client/auth';
import { isAdmin } from '../../../../users/helpers/isAdmin';

const MainNavbar: React.FC = () => {
  const { data: user } = useAuth();

  const navbarStyle = user ? 'bg-blue-900 text-white' : 'bg-white text-black';

  return (
    <Navbar fluid className={navbarStyle}>
      <Navbar.Brand href='/'>
        <span className='self-center whitespace-nowrap text-2xl font-thin dark:text-white'>
          euprava
        </span>
      </Navbar.Brand>
      <div className='flex md:order-2'>
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='Podešavanja'
                placeholderInitials={`${user.name?.charAt(0).toUpperCase() || ''}${
                  user.surname?.charAt(0).toUpperCase() || ''
                }`}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                {user.name} {user.surname}
              </span>
            </Dropdown.Header>
            {isAdmin(user) && (
              <>
                <Dropdown.Item>
                  <Link to='/admin'>Admin panel</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            )}
            <Dropdown.Item>Moj nalog</Dropdown.Item>
            <Dropdown.Item>Moje aktivnosti</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Izloguj se</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to='/login'>
              <Button color='blue'>Uloguj se</Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>

      {user && (
        <Navbar.Collapse>
          <NavLink activeClassName='text-blue-500' to='/documents' className='text-lg'>
            Dokumenti
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/services' className='text-lg'>
            Usluge
          </NavLink>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default MainNavbar;
