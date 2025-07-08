import React from 'react'

function BackInsideIcon () {
  return (
    <svg viewBox='0 0 24 32'>
      <defs>
        <path id='a-1' d='M6.378 13L0 10.869V0l14.8 5-7.865 3.79z'></path>
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(9 10.095)'>
          <mask id='b-1' fill='#fff'>
            <use href='#a-1'></use>
          </mask>
          <use fill='#C7E0FE' fillRule='nonzero' href='#a-1'></use>
          <g fill='#30D1C2' mask='url(#b-1)'>
            <path d='M-9-8.815h24v30.022H-9z'></path>
          </g>
        </g>
        <path
          stroke='#2F2F2F'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M.3 25.451V13.474m15 17.276V18.885m.078 11.877l8.313-4.07m-8.313-7.907l8.313-4.07M.378 13.395l8.313-4.07M.378 25.373l8.313-4.071m6.609 9.539l-15-5.39m8.4-4.192V9.282m15 17.276V14.693'
        ></path>
        <path
          stroke='#2F2F2F'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M15.458 23.682L8.7 21.259'
        ></path>
        <path
          stroke='#2F2F2F'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M23.7 14.672l-15-5.39m6.6 9.559l-15-5.39m8.4.303V1.777m15 17.276V7.187m0-.021l-15-5.39'
        ></path>
      </g>
    </svg>
  )
}

export default BackInsideIcon
