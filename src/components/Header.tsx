import React from "react";
import { Logo } from "../assets/icons/Logo";
import { AccountIcon } from "../assets/icons/AccountIcon";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-4">
      <div className="flex items-center">
        <div className="flex items-center w-[223px]">
          <Logo />
        </div>
        <nav className="flex space-x-4">
          <select className="border rounded p-1 focus:outline-none">
            <option>Awwtest Demo</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <select className="border rounded p-1 focus:outline-none">
            <option>Fat free CRM</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </nav>
        <p className="ml-4">web / reports</p>
      </div>
      <div className="flex items-center">
        <p className="mr-4">Hi, Roman</p>
        <button className="bg-blue-500 text-white rounded-full p-2">
          <span>
            <AccountIcon />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
