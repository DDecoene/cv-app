'use client';

import { type FC } from 'react';

const PrintButton: FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 print:hidden">
      <button
        onClick={handlePrint}
        className="w-full bg-metal text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
        aria-label="Download CV"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download CV
      </button>
    </div>
  );
};

export default PrintButton;