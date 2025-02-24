import React from 'react';

const navItems = [
  { label: 'Home' },
  { label: 'Desktop Web' },
  { label: 'Dashboard' },
  { label: 'Test Cases' },
  { label: 'Jobs' },
  { label: 'Reports' },
  { label: 'Assets' },
  { label: 'Services' },
  { label: 'Management' },
  { label: 'FAQ' },
];

const SideBar: React.FC = () => {
  return (
    <div className="w-[223px] bg-[#F9FBFC] h-full p-4">
      <ul className="space-y-2">
        {navItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;