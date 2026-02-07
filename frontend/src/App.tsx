
import React, { useState, useCallback } from 'react';
import { OnboardingPhase, UserRole, SignupState, View } from '../types';
import SignupFlow from './components/SignupFlow';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('SIGNUP');
  const [signupData, setSignupData] = useState<SignupState>({
    firstName: '',
    lastName: '',
    role: UserRole.SCOUT,
    orgName: '',
    region: 'North America',
    email: ''
  });

  const handleSignupComplete = useCallback((data: SignupState) => {
    setSignupData(data);
    setCurrentView('DASHBOARD');
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setCurrentView('DASHBOARD');
  }, []);

  const toggleView = useCallback(() => {
    setCurrentView(prev => prev === 'SIGNUP' ? 'LOGIN' : 'SIGNUP');
  }, []);

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <BackgroundEffect />
      
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="max-w-2xl w-full">
          {currentView === 'SIGNUP' && (
            <SignupFlow 
              onComplete={handleSignupComplete} 
              onSwitchToLogin={toggleView}
            />
          )}
          {currentView === 'LOGIN' && (
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onSwitchToSignup={toggleView}
            />
          )}
          {currentView === 'DASHBOARD' && (
            <Dashboard userData={signupData} onLogout={() => setCurrentView('LOGIN')} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
