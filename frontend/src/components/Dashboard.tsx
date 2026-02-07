
import React, { useEffect, useState } from 'react';
import { SignupState } from '../../types';

interface DashboardProps {
  userData: SignupState;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onLogout }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('Generating proprietary neural profile...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
      } catch (error) {
        console.error('AI Error:', error);
        setAiAnalysis('Local neural cache active. Data stream temporarily decoupled.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [userData]);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">System Dashboard</p>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {userData.firstName}</h1>
        </div>
        <button 
          onClick={onLogout}
          className="text-[10px] font-bold border border-white/10 px-4 py-2 rounded-lg hover:border-primary/50 transition-all uppercase tracking-widest text-white/40 hover:text-primary"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard label="Neural Load" value="12.4 Tflops" icon="neurology" />
        <StatsCard label="Active Targets" value="142" icon="target" />
        <StatsCard label="Sync Level" value="99.8%" icon="sync" />
      </div>

      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden border-primary/20 bg-primary/[0.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-primary text-sm">hub</span>
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/80">Proprietary AI Profile Analysis</h3>
        </div>
        
        <div className={`text-sm text-white/60 leading-relaxed font-light space-y-4 whitespace-pre-wrap ${loading ? 'animate-pulse' : ''}`}>
          {aiAnalysis}
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full rotate-45">
            <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50,0 L50,100 M0,50 L100,50" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ label: string, value: string, icon: string }> = ({ label, value, icon }) => (
  <div className="glass-panel p-6 rounded-xl group hover:border-primary/40 transition-all">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</span>
      <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-lg">{icon}</span>
    </div>
    <p className="text-2xl font-bold tracking-tight">{value}</p>
  </div>
);

export default Dashboard;
