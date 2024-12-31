'use client';

import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Provider } from 'react-redux';
import store from '../store/store';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-boxdark-2 dark:text-bodydark`}>
        <Provider store={store}>ls
        
          {/* Page Wrapper */}
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* Content Area */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* Header */}
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              
              {/* Main Content */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default DefaultLayout;
