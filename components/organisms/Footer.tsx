import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', background: '#f3f3f3' }}>
      <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;