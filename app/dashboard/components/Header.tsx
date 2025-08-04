"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || user?.email}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <div className="relative">
              <Image
                src={user?.image || "/vercel.svg"}
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
