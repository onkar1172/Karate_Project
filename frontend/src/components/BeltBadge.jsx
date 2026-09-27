import React from 'react';
import { Shield } from 'lucide-react';

const BeltBadge = ({ rank }) => {
  const getBeltClass = (beltStr) => {
    if (!beltStr) return 'belt-white';
    const lower = beltStr.toLowerCase();
    if (lower.includes('black')) return 'belt-black';
    if (lower.includes('brown')) return 'belt-brown';
    if (lower.includes('purple')) return 'belt-purple';
    if (lower.includes('blue')) return 'belt-blue';
    if (lower.includes('green')) return 'belt-green';
    if (lower.includes('orange')) return 'belt-orange';
    if (lower.includes('yellow')) return 'belt-yellow';
    return 'belt-white';
  };

  return (
    <span className={`belt-badge ${getBeltClass(rank)}`}>
      <Shield size={12} />
      {rank || 'White Belt'}
    </span>
  );
};

export default BeltBadge;
