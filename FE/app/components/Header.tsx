import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-bg-200 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="App Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </Link>
        <h1 className="text-2xl font-bold text-center text-white flex-1">
          Brain Battle
        </h1>
      </div>
    </header>
  );
};

export default Header;
