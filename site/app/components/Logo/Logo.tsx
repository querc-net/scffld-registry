import React, { useState } from 'react';
import cx from 'clsx';

const baseClass = 'logo';

import './Logo.scss';

export type LogoProps = {};

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <div className={cx(baseClass)}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.3262 32.9254V24.9751L9.21147 17.0248V9.07456L21.3262 1.1243L33.4409 9.07456V17.0248L27.3835 21"
          fill="#F01879"
        />
        <path
          d="M21.3262 9.07456V17.0248L33.4409 24.9751V32.9254L21.3262 40.8756L9.21147 32.9254V24.9751L15.2688 21"
          fill="#F01879"
        />
        <path
          d="M27.3835 21L33.4408 24.9751V32.9254L21.3262 40.8756V1.1243L33.4408 9.07456V17.0248L27.3835 21Z"
          fill="#F668A8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.3262 0L34.6523 8.74529V17.3542L29.0968 21L34.6523 24.6458V33.2547L21.3262 42L8 33.2547V24.6458L13.5555 21L8 17.3542V8.74529L21.3262 0ZM15.2688 22.1243L10.4229 25.3044V32.5961L21.3262 39.7513L32.2294 32.5961V25.3044L20.1147 17.3542V9.0746H22.5376V16.6956L27.3835 19.8757L32.2294 16.6956V9.40391L21.3262 2.24867L10.4229 9.40391V16.6956L22.5376 24.6458V32.9254H20.1147V25.3044L15.2688 22.1243Z"
          fill="#A91256"
        />
      </svg>
    </div>
  );
};
