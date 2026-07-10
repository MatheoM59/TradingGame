import { useState } from 'react';
import { LoginForm } from './LoginFrom';
import { SignUpForm } from './SignUpForm';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-black">
        {isLogin ? (
          <LoginForm onToggle={toggleMode} email={email} setEmail={setEmail} />
        ) : (
          <SignUpForm
            onToggle={toggleMode}
            email={email}
            setEmail={setEmail}
            userName={userName}
            setUserName={setUserName}
          />
        )}
      </div>
    </div>
  );
};
