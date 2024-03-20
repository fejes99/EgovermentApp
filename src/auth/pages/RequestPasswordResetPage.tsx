import { ForgotPasswordForm } from 'wasp/client/auth';
import { Link } from 'react-router-dom';

const RequestPasswordResetPage: React.FC = () => (
  <div className='w-full h-full bg-white'>
    <div className='min-w-full min-h-[75vh] flex items-center justify-center'>
      <div className='w-full h-full max-w-sm p-5 bg-white'>
        <div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  </div>
);

export default RequestPasswordResetPage;
