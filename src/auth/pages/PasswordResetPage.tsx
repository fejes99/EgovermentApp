import { ResetPasswordForm } from 'wasp/client/auth';
import { Link } from 'react-router-dom';

const PasswordResetPage: React.FC = () => (
  <div className='w-full h-full bg-white'>
    <div className='min-w-full min-h-[75vh] flex items-center justify-center'>
      <div className='w-full h-full max-w-sm p-5 bg-white'>
        <div>
          <ResetPasswordForm />
          <br />
          <span className='text-sm font-medium text-gray-900'>
            If everything is okay, <Link to='/login'>go to login</Link>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PasswordResetPage;
