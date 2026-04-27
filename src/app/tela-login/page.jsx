'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('');

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-black relative overflow-hidden">
            <div 
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at 50% 40%, #2b0b0b 0%, #000000 70%)'
                }}
            />
            <header className="w-full max-w-[1200px] p-6 z-10 flex justify-start">
                <h1 className="text-[#e50914] text-4xl font-bold tracking-tighter">
                    NETFLIX
                </h1>
            </header>
            <main className="z-10 w-full max-w-[450px] px-8 pt-4">
                <div className="flex flex-col gap-1 mb-8">
                    <h2 className="text-white text-[32px] font-bold">
                        Informe seus dados para entrar
                    </h2>
                    <p className="text-[#b3b3b3] text-base">
                        Ou{' '}
                        <Link 
                            href="./tela-register" 
                            className="text-white hover:underline cursor-pointer"
                        >
                            crie uma conta
                        </Link>.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email ou número de celular"
                            className="w-full bg-[rgba(22,22,22,0.7)] border border-gray-500 rounded px-4 pt-4 pb-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                    </div>

                    
                    <button className="w-full bg-buton-cont bg-botao-confirmar text-white font-bold py-3 rounded transition-colors text-lg">
                        Continuar
                    </button>
                    
                    
                </div>
            </main>
        </div>
    );
}