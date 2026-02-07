
import React, { useState } from 'react';
import { OnboardingPhase, UserRole, SignupState } from '../../types';

interface SignupFlowProps {
  onComplete: (data: SignupState) => void;
  onSwitchToLogin: () => void;
}

const SignupFlow: React.FC<SignupFlowProps> = ({ onComplete, onSwitchToLogin }) => {
  const [phase, setPhase] = useState<OnboardingPhase>(OnboardingPhase.IDENTITY);
  const [formData, setFormData] = useState<SignupState>({
    firstName: '',
    lastName: '',
    role: UserRole.SCOUT,
    orgName: '',
    region: 'North America',
    email: ''
  });

  const nextPhase = () => {
    if (phase === OnboardingPhase.IDENTITY) setPhase(OnboardingPhase.ORGANIZATION);
    else if (phase === OnboardingPhase.ORGANIZATION) setPhase(OnboardingPhase.SECURITY);
    else if (phase === OnboardingPhase.SECURITY) onComplete(formData);
  };

  const updateField = (field: keyof SignupState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getProgress = () => {
    switch (phase) {
      case OnboardingPhase.IDENTITY: return 'PHASE 01 / 03';
      case OnboardingPhase.ORGANIZATION: return 'PHASE 02 / 03';
      case OnboardingPhase.SECURITY: return 'PHASE 03 / 03';
      default: return 'COMPLETE';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Step Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Onboarding Sequence</p>
            <h1 className="text-3xl font-bold tracking-tight">
              {phase === OnboardingPhase.IDENTITY && "Identity Initialization"}
              {phase === OnboardingPhase.ORGANIZATION && "Organization Mapping"}
              {phase === OnboardingPhase.SECURITY && "Security Protocol Setup"}
            </h1>
          </div>
          <span className="text-xs font-mono text-white/50 tracking-tighter">{getProgress()}</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
          <div className={`h-full bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(242,127,13,0.5)] ${
            phase === OnboardingPhase.IDENTITY ? 'w-1/3' : 
            phase === OnboardingPhase.ORGANIZATION ? 'w-2/3' : 'w-full'
          }`}></div>
          <div className={`h-full bg-white/10 w-1/3 ${phase !== OnboardingPhase.IDENTITY ? 'hidden' : ''}`}></div>
          <div className={`h-full bg-white/10 w-1/3 ${phase === OnboardingPhase.SECURITY ? 'hidden' : ''}`}></div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 lg:p-10 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="space-y-8">
            {phase === OnboardingPhase.IDENTITY && (
              <IdentityForm data={formData} update={updateField} />
            )}
            {phase === OnboardingPhase.ORGANIZATION && (
              <OrganizationForm data={formData} update={updateField} />
            )}
            {phase === OnboardingPhase.SECURITY && (
              <SecurityForm data={formData} update={updateField} />
            )}

            <div className="pt-4">
              <button 
                onClick={nextPhase}
                className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black tracking-widest text-xs py-5 rounded-xl flex items-center justify-center gap-3 transition-all glow-pulse uppercase group/btn"
              >
                {phase === OnboardingPhase.SECURITY ? "Finalize Initialization" : "Configure Next Parameters"}
                <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
              </button>
              <p className="text-center mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Already registered? <button onClick={onSwitchToLogin} className="text-primary hover:underline font-bold">Access Terminal</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">security</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">End-to-End Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">hub</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Neural Engine v2.4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">data_thresholding</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Proprietary Data Model</span>
        </div>
      </div>
    </div>
  );
};

// Sub-components for Phase forms

const IdentityForm: React.FC<{ data: SignupState, update: (field: keyof SignupState, value: any) => void }> = ({ data, update }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">First Name</label>
          <input 
            value={data.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
            placeholder="Enter first name" type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Last Name</label>
          <input 
            value={data.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
            placeholder="Enter last name" type="text"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Select Access Protocol</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RoleCard 
            active={data.role === UserRole.SCOUT} 
            onClick={() => update('role', UserRole.SCOUT)}
            icon="visibility"
            title="Scout"
            desc="Talent Identification & Neural Mapping"
          />
          <RoleCard 
            active={data.role === UserRole.COACH} 
            onClick={() => update('role', UserRole.COACH)}
            icon="strategy"
            title="Coach"
            desc="Tactical Efficiency & Performance"
          />
          <RoleCard 
            active={data.role === UserRole.PLAYER} 
            onClick={() => update('role', UserRole.PLAYER)}
            icon="sports_basketball"
            title="Player"
            desc="Personal Growth & Skill Analytics"
          />
        </div>
      </div>
    </div>
  );
};

const OrganizationForm: React.FC<{ data: SignupState, update: (field: keyof SignupState, value: any) => void }> = ({ data, update }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Organization Name</label>
        <input 
          value={data.orgName}
          onChange={(e) => update('orgName', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
          placeholder="e.g. Lakers Scouting Division" type="text"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Operational Region</label>
        <select 
          value={data.region}
          onChange={(e) => update('region', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white"
        >
          <option value="North America" className="bg-background-dark">North America</option>
          <option value="Europe" className="bg-background-dark">Europe</option>
          <option value="Asia-Pacific" className="bg-background-dark">Asia-Pacific</option>
          <option value="Global" className="bg-background-dark">Global</option>
        </select>
      </div>
    </div>
  );
};

const SecurityForm: React.FC<{ data: SignupState, update: (field: keyof SignupState, value: any) => void }> = ({ data, update }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Terminal Email Address</label>
        <input 
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
          placeholder="email@ballvision.ai" type="email"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-1">Access Credential (Password)</label>
        <input 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all outline-none text-white placeholder:text-white/20" 
          placeholder="••••••••••••" type="password"
        />
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-4">
        <span className="material-symbols-outlined text-primary">info</span>
        <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest">
          By continuing, you agree to comply with Neural Data Processing protocols and biometric verification standards.
        </p>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{ active: boolean, onClick: () => void, icon: string, title: string, desc: string }> = ({ active, onClick, icon, title, desc }) => {
  return (
    <button 
      onClick={onClick}
      className={`role-card group text-left relative glass-panel rounded-xl p-5 border transition-all ${
        active ? 'border-primary/50 bg-primary/10 ring-1 ring-primary/40' : 'border-white/10 hover:border-primary/30'
      }`} 
      type="button"
    >
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all ${
          active ? 'bg-primary/20 text-primary scale-110' : 'bg-white/5 text-white/40 group-hover:text-primary group-hover:bg-primary/20'
        }`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <p className="text-sm font-bold uppercase tracking-tight">{title}</p>
        <p className="text-[10px] text-white/40 mt-1 uppercase leading-tight tracking-wide">{desc}</p>
      </div>
      <div className={`absolute -right-2 -bottom-2 transition-opacity ${active ? 'opacity-20' : 'opacity-5 group-hover:opacity-20'}`}>
        <svg className="w-20 h-20" viewBox="0 0 100 100">
          <polygon className="radar-line" fill="none" points="50,10 90,40 75,90 25,90 10,40" stroke="#f27f0d" strokeWidth="1"></polygon>
        </svg>
      </div>
    </button>
  );
}

export default SignupFlow;
