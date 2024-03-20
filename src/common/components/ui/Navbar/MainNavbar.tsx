import { Link, NavLink } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { logout, useAuth } from 'wasp/client/auth';
import { isAdmin } from '../../../../users/helpers/isAdmin';

const MainNavbar: React.FC = () => {
  const { data: user } = useAuth();
  console.log('🚀 ~ user:', user);

  return (
    <Navbar fluid rounded>
      <div />
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
                <Dropdown.Item onClick={logout}>Admin panel</Dropdown.Item>
                <Dropdown.Divider />
              </>
            )}
            <Dropdown.Item onClick={logout}>Moj nalog</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Moje aktivnosti</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Izloguj se</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to='/login'>
              <Button>Uloguj se</Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <NavLink activeClassName='text-blue-500' to='/products' className='text-lg'>
          Proizvodi
        </NavLink>
        <NavLink activeClassName='text-blue-500' to='/production-plans' className='text-lg'>
          Proizvodni planovi
        </NavLink>
        <NavLink activeClassName='text-blue-500' to='/reservations' className='text-lg'>
          Rezervacije
        </NavLink>
        <NavLink activeClassName='text-blue-500' to='/purchase-requests' className='text-lg'>
          Zahtevi
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
