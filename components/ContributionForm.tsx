
import React, { useState } from 'react';

interface ContributionFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  type: 'edit' | 'new' | 'flag';
  targetTitle?: string;
  targetId?: string;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onClose, onSubmit, type, targetTitle, targetId }) => {
  const [title, setTitle] = useState(targetTitle || '');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {type === 'edit' ? 'Propose Edit' : type === 'flag' ? 'Flag Content' : 'Suggest New Article'}
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Thank you for helping keep TuxDocs up to date. Your submission will be reviewed by our community moderators.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              placeholder="e.g. Modern Kernel Tuning HOWTO"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              {type === 'flag' ? 'Reason for Flagging' : 'Proposed Changes / Description'}
            </label>
            <textarea 
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
              placeholder="Describe what needs to be changed or added..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSubmit({ title, description, type, targetId })}
            className="flex-1 py-3 px-6 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all"
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributionForm;
