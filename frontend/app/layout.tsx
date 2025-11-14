// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import Footer from './components/Layouts/Footer';


export const metadata = {
  title: 'Jobs - Credepath',
  description: 'Jobs UI',
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 lg:w-[1512px]">
          
          {children}
          <Footer/>
        </div>
        
      </body>
    </html>
  );
}
