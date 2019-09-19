import React from 'react';

const Form = ({ onSearchChange, searchWord, children }) => (
  <form>
    {children}
    <input type='text' value={searchWord} onChange={onSearchChange} />
  </form>
);

export default Form;
