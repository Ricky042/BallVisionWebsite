
import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToSignup }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Terminal Access</p>
        <h1 className="text-3xl font-bold tracking-tight">System Login</h1>
      </div>

      <div className="glass-panel rounded-2xl p-8 lg:p-10 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Terminal Email</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
              placeholder="operator@ballvision.ai" type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Access Key</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
              placeholder="••••••••••••" type="password"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black tracking-widest text-xs py-5 rounded-xl flex items-center justify-center gap-3 transition-all glow-pulse uppercase disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-background-dark" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authorizing...
              </span>
            ) : (
              <>
                Initiate Session
                <span className="material-symbols-outlined text-xl">login</span>
              </>
            )}
          </button>
          <div className="flex flex-col gap-4 text-center mt-6">
            <button type="button" onClick={onSwitchToSignup} className="text-[10px] text-white/30 uppercase tracking-[0.2em] hover:text-primary transition-colors">
              Request New Credentials
            </button>
            <a href="#" className="text-[10px] text-white/30 uppercase tracking-[0.2em] hover:text-primary transition-colors">
              Forgot Access Protocol?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
