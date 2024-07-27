import React from "react";
import TypingTest from "./components/TypingTest";

export default function Home() {
  return (
    <>
     <div className="min-h-screen flex flex-wrap flex-col items-center justify-center bg-gray-900">
     <header className="justify-center text-white text-center pb-4">
        <h1 className="text-4xl font-black ">JUSTTYPEFAST</h1>
      </header>
      <main className="flex flex-wrap flex-col items-center justify-center text-white">
        <TypingTest />
      </main>    
      <footer className="flex flex-col min-w-screen items-center justify-center mt-5">
        <div className="block text-center">
        <p className="text-sm text-gray-400">© copyright JUSTTYPEFAST 2024</p>
        <p className="text-sm text-gray-400 mt-2">powered by: Next js - Tailwind - Chadcn.ui</p>
        </div>
      </footer> 
     </div>
    </>
  );
}
