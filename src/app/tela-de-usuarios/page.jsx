'use client'
import { useEffect, useState } from 'react'

export default function PerfisNetflix() {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => prev + 0.003)
        }, 16)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black text-white">

            
            <div
                className="absolute inset-0 z-0 blur-3xl scale-110"
                style={{
                    background: `
            radial-gradient(circle at ${50 + Math.sin(offset) * 20}% ${40 + Math.cos(offset) * 20}%, rgba(255,0,0,0.35), transparent 40%),
            radial-gradient(circle at ${70 + Math.cos(offset) * 15}% ${60 + Math.sin(offset) * 15}%, rgba(255,120,0,0.25), transparent 50%),
            radial-gradient(circle at ${30 + Math.sin(offset) * 15}% ${70 + Math.cos(offset) * 15}%, rgba(180,0,255,0.25), transparent 50%)
            `
                }}
            />

            
            <div className="absolute inset-0 bg-black/70 z-10" />

                
            <header className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-5 z-20">
                <h1 className="text-red-600 text-3xl font-bold tracking-widest">
                    NETFLIX
                </h1>

                <nav className="hidden md:flex gap-8 text-gray-300">
                    <span>Início</span>
                    <span>Séries</span>
                    <span>Filmes</span>
                    <span>Novidades</span>
                    <span>Minha Lista</span>
                </nav>

                <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-8 h-8 bg-gray-500 rounded-sm" />
                    Conta
                </div>
            </header>

            
            <div className="relative z-20 flex flex-col items-center justify-center h-full">

                <h1 className="text-5xl md:text-6xl font-bold mb-12">
                    Quem está assistindo?
                </h1>

                <div className="flex gap-8 flex-wrap justify-center">
                    <Profile name="Marcos" active />
                    <Profile name="Fernanda" />
                    <Profile name="Crianças" />
                    <Profile name="Luana" />
                    <AddProfile />
                </div>

                <button className="mt-12 bg-red-600 hover:bg-red-700 px-8 py-3 rounded text-lg font-semibold transition">
                    Gerenciar perfis
                </button>
            </div>

            
            <footer className="absolute bottom-6 w-full text-center text-gray-500 text-sm z-20 flex justify-center gap-6">
                <span>Ajuda</span>
                <span>Termos de Uso</span>
                <span>Privacidade</span>
                <span>Conta</span>
            </footer>
        </main>
    )
}


function Profile({ name, active }) {
    return (
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div
                className={`
            w-28 h-28 rounded-md overflow-hidden
            ${active ? 'ring-4 ring-blue-400 shadow-lg shadow-blue-400/40' : ''}
            border-2 border-transparent group-hover:border-white
            transition-all duration-300
        `}
            >
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-900" />
            </div>

            <span className="text-gray-400 group-hover:text-white">
                {name}
            </span>
        </div>
    )
}

function AddProfile() {
    return (
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-28 h-28 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center group-hover:border-white transition">
                <span className="text-4xl text-gray-400 group-hover:text-white">+</span>
            </div>

            <span className="text-gray-400 group-hover:text-white">
                Adicionar perfil
            </span>
        </div>
    )
}