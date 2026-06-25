"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 shadow-sm z-10 relative">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">🪼</span>
        <div>
         <h1 className="text-x font-bold text-blue-900 tracking-tight">
          Projeto Iara
        </h1>
          <p className="text-xs text-gray-500">| Monitoramento hídrico de Santa Catarina</p>
        </div>
      </div>
    </header>
  );
}
