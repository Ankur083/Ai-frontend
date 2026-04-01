import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
}

export const ProgressBar = ({ value, max = 100, className, barClassName }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('h-2 bg-slate-100 rounded-full overflow-hidden w-full', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn('h-full bg-indigo-600 rounded-full', barClassName)}
      />
    </div>
  );
};
