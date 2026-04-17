'use client'

import { useState } from "react";
import Image from "next/image";
import BlogHeader from "@/components/ui/navbar";
import ThreeDCarousel from "@/components/ui/carossel";
import Glowbutton from "@/components/ui/GlowButton";
import ModalBasico from "@/components/ui/modal";
import Search from "@/components/ui/search";

export default function Tarefa() {
    const [, setOpen] = useState(false);

    const [Inserts, setInserts] = useState([
        { nome: "passear com dog", descricao: "levar o bilu para passear", prazo: " 10 horas", status: "1" },
        { nome: "comprar food", descricao: "comprar arroz, feijão e carne", prazo: " 1 dia", status: "0" },
        { nome: "fazer exercícios", descricao: "fazer 30 minutos de exercícios", prazo: " 1 hora", status: "0" },
        { nome: "ler um livro", descricao: "ler o livro 'o senhor dos anéis'", prazo: " 1 semana", status: "0" },
        { nome: "assitir a um filme", descricao: "assistir ao filme 'o poderoso chefão'", prazo: " 1 dia", status: "0" },
        { nome: "estudar programação", descricao: "estudar JavaScript e React", prazo: " 2 dias", status: "0" },
        { nome: "limpar a casa", descricao: "varrer, passar pano e organizar os cômodos", prazo: " 1 dia", status: "0" },
        { nome: "cozinhar o jantar", descricao: "preparar uma refeição saudável", prazo: " 3 horas", status: "0" },
        { nome: "fazer compras", descricao: "ir ao supermercado para comprar mantimentos", prazo: " 1 dia", status: "0" },
        { nome: "escrever um diário", descricao: "registrar os acontecimentos do dia em um diário", prazo: " 1 hora", status: "0" },
    ]);
    let [pagina, setPagina] = useState(5);

        return (
            <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-950 via-[#041125] to-[#020617] text-slate-100 font-sans">

                <BlogHeader />


                <div className="flex-1 min-h-0 px-1 py-1 sm:px-6 lg:px-8 flex items-center justify-center border-b border-cyan-900/40">
                    <div className="w-full rounded-2xl border-4 border-cyan-900/45 bg-slate-900/80 p-5 shadow-[0_0_36px_rgba(34,211,238,0.14)] backdrop-blur-md">
                        <div className="text-cyan-100 font-semibold mb-3 ">
                            Buscar tarefas
                            <input
                                type="text"
                                placeholder="buscar"
                                className="w-full rounded-lg border border-cyan-800/60 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                            />
                        </div>
                        <div className="col-12 flex justify-content p-2 justify-between " >
                            <h1>Nome</h1>
                            <h1>Descrição</h1>
                            <h1>Prazo</h1>
                            <h1>Status</h1>
                        </div>

                        <div className="rounded-lg border border-cyan-900/50 bg-slate-900/50 min-h-36 p-3">
                            <div className="col-12">
                                {Inserts.map((insert, index) => index >= pagina - 5 && index < pagina && (
                                    <div key={index} className="flex justify-content p-2 justify-between">
                                        <p>{insert.nome}</p>
                                        <p>{insert.descricao}</p>
                                        <p>{insert.prazo}</p>
                                        <p>{insert.status === "1" ? "Concluída" : "Pendente"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mt-3 gap-2">
                            proxima pagina
                            
                            <button onClick={() => setPagina(pagina - 5)}>
                                <Image
                                    src="/seta-direita.png"
                                    alt="Página anterior"
                                    width={24}
                                    height={24}
                                    className="rotate-180"
                                />
                                
                            </button>
                            <button  onClick={() => setPagina(pagina + 5)}>
                                <Image src="/seta-direita.png" alt="Próxima página" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }