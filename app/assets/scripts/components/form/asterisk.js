import React from 'react';

const Asterisk = ({ required }) => {
  if (!required) return null;
  return (<span className='required'>*</span>);
};

export default Asterisk;
