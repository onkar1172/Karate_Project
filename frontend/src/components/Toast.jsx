import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Toast = () => {
  const { toast, setToast } = useAuth();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      {icons[toast.type] || icons.info}
      <span>{toast.message}</span>
      <button
        onClick={() => setToast(null)}
        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '8px' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
