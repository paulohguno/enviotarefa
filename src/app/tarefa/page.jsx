'use client'
import { FaRegClock } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import Moedit from "@/components/ui/modaledit";
import api from "../utils/axios";
import { toast } from "react-toastify";


export default function Tarefa() {
    const [open, setOpen] = useState(null); 
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    const [Inserts, setInserts] = useState([
        {
            nome: "Tarefa 1",
            descricao: "Descrição da tarefa 1",
            prazo: "2023-12-31",
            status: "0"
        },
        {
            nome: "Tarefa 2",
            descricao: "Descrição da tarefa 2",
            prazo: "2023-11-30",
            status: "1"
        }
    ]);

    let [pagina, setPagina] = useState(5);
    const [busca, setBusca] = useState("");

    const filtrados = Inserts.filter((item) =>
        item.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.descricao.toLowerCase().includes(busca.toLowerCase())
    );

    const getTarefas = async () => {
        try {
            const dados = await api.get('/tarefa/get-all');
            const tarefasApi = Array.isArray(dados?.data) ? dados.data : [];
            const tarefasFormatadas = tarefasApi.map((tarefa) => ({
                id: tarefa.id,
                nome: `Tarefa #${tarefa.id}`,
                descricao: tarefa.descricao || "Sem descricao",
                prazo: "-",
                status: tarefa.finalizado ? "1" : "0",
            }));

            setInserts(tarefasFormatadas);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const salvarTarefa = async (dados) => {
        try {
            await api.post("/tarefa/create", dados);
            await getTarefas();
            toast.success("Tarefa salva com sucesso");
            setOpen(null);
        } catch (error) {
            toast.error("Falha ao salvar tarefa");
        }
    };

    const handleUpdate = (tarefaEditada) => {
        const novosInserts = Inserts.map(t => t === tarefaSelecionada ? tarefaEditada : t);
        setInserts(novosInserts);
        setOpen(null);
        setTarefaSelecionada(null);
    };

    const controlemostra = {
        descricaomostrar : true,
        prazomostrar : true,
        statusmostrar : true,
        acoesmostrar : true,
        nomemostrar : true,
    }

    //use effect para buscar as tarefas da api quando o componente for montado
    useEffect(() => {
        const timer = setTimeout(() => {
            getTarefas();
        }, 0);

        return () => clearTimeout(timer);
    }, []);



    //comandos de front 
    //fixed para deixar modal fixo na telapm =
    //inset-0 para ocupar toda a tela
    //z-50 para ficar acima de outros elementos
    //flex, items-center e justify-center para centralizar o modal
    //bg-black/60 para dar um fundo preto com opacidade
    //backdrop-blur-sm para dar um efeito de desfoque no fundo
    //rounded-2xl para deixar as bordas arredondadas
    //p-6 para dar um padding interno
    //w-full e max-w-md para controlar a largura do modal
    //shadow-2xl para dar uma sombra mais intensa
    //bg-slate-900 para o fundo do modal
    //border e border-[#0CAFF0]/30 para dar uma borda com a cor personalizada
    //space-y-4 para dar um espaçamento entre os elementos internos
    //min-h-screen para garantir que a altura mínima seja a altura da tela
    //flex-col para organizar os elementos em coluna
    //bg-[#020617] para o fundo da página
    //text-white para a cor do texto
    //font-sans para a fonte sans-serif
    //flex-1 para o conteúdo ocupar o espaço restante
    //min-h-0 para permitir que o conteúdo encolha se necessário
    //px-2, py-2, sm:px-6, lg:px-8 para o padding responsivo
    //items-center e justify-center para centralizar o conteúdo
    //border-b e border-[#0CAFF0]/20 para dar uma borda inferior com a cor personalizada
    //max-w-5xl para limitar a largura do conteúdo
    //rounded-2xl para deixar as bordas arredondadas
    //border e border-[#0CAFF0]/30 para dar uma borda com a cor personalizada
    //bg-[#020617]/80 para um fundo com opacidade
    //p-6 para o padding interno
    //backdrop-blur-md para um efeito de desfoque mais intenso
    //shadow-[0_0_25px_rgba(12,175,240,0.15)] para uma sombra personalizada
    //grid e grid-cols-5 para organizar os elementos em uma grade de 5 colunas

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white font-sans">

            <div className="flex-1 min-h-0 px-2 py-2 sm:px-6 lg:px-8 flex items-center justify-center border-b border-[#0CAFF0]/20">
                
            <div className="w-full max-w-5xl rounded-2xl border border-[#0CAFF0]/30 bg-[#020617]/80 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(12,175,240,0.15)]">
                    <div className="mb-5 flex justify-between items-end">
                    <div className="flex-1 mr-4">
                                <h2 className="text-sm text-[#52F2ED] mb-2">Buscar tarefas</h2>
                            <input
                                type="text"
                                placeholder="Digite para buscar..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full rounded-lg border border-[#0CAFF0]/30 bg-[#020617] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF09B]/40 transition"
                            />
                        </div>
                            <button
                            onClick={() => setOpen("novo")}
                            className="bg-[#0CAFF0] hover:bg-[#52F2ED] text-[#020617] font-bold px-4 py-2 rounded-lg transition"
                        >
                            Nova Tarefa
                        </button>

                                <Modal 
                                isOpen={open === "novo"}
                                onSave={salvarTarefa}
                                onClose={() => setOpen(null)}
                            />
                            
                    </div>

                    <div className="grid grid-cols-5 px-2 py-2 text-sm text-[#52F2ED] border-b border-[#0CAFF0]/20 mb-2">
                        {controlemostra.nomemostrar && <span>Nome</span>}
                        {controlemostra.descricaomostrar && <span className="text-center">Descrição</span>}
                        {controlemostra.prazomostrar && <span className="text-center">Prazo</span>}
                        {controlemostra.statusmostrar && <span className="text-right">Status</span>}
                        {controlemostra.acoesmostrar && <span className="text-right">Ações</span>}
                    </div>

                    <div className="rounded-lg border flex-1 border-[#0CAFF0]/10 bg-[#020617]/60 min-h-36 p-3 space-y-2">
                        {filtrados
                            .slice(pagina - 5, pagina)
                            .map((insert, index) => (
                                

                                <div key={index} className="grid grid-cols-5 items-center px-2 py-2 rounded-md hover:bg-[#0CAFF0]/10 transition">
                                    {controlemostra.nomemostrar && (
                                        
                                    <div>
                                        <p className="text-sm text-[#52F2ED]">{insert.nome}</p>
                                        
                                        
                                        </div>
                                    )}

                                    {controlemostra.descricaomostrar && (
                                        <div>
                                            <p className="text-sm text-center text-gray-400 truncate px-2">{insert.descricao}</p>
                                        </div>
                                    )}
                                {controlemostra.prazomostrar && (
                                        <div>
                                            <p className="text-sm text-center text-gray-300">{insert.prazo}</p>
                                        </div>
                                    )}
                                    {controlemostra.statusmostrar && (
                                    <div className="flex justify-end">
                                        {insert.status === "1" ? (
                                            <GiConfirmed className="text-[#0CF04D] text-lg" />
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    const newInserts = [...Inserts];
                                                    const idx = Inserts.indexOf(insert);
                                                    newInserts[idx].status = "1";
                                                    setInserts(newInserts);
                                                }}
                                                className="text-[#0CAFF0] hover:text-[#0CF09B] transition"
                                            >
                                                <FaRegClock />
                                            </button>
                                        )}
                                    </div>
                                    )}
                                    {controlemostra.acoesmostrar && (
                                        <div className="flex justify-end">
                                            <button onClick={() => {
                                                setTarefaSelecionada(insert);
                                                setOpen("editar");
                                            }}>
                                                <CiEdit className="text-[#0DEFE6] hover:text-white transition cursor-pointer text-xl" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <Moedit 
                        isOpen={open === "editar"}
                        onClose={() => {
                            setOpen(null);
                            setTarefaSelecionada(null);
                        }}
                        tarefa={tarefaSelecionada}
                        onUpdate={handleUpdate}
                    />

                    <div className="flex justify-end items-center mt-4 gap-3 text-sm text-[#52F2ED]">
                        <button
                            disabled={pagina <= 5}
                            onClick={() => setPagina(pagina - 5)}
                            className="disabled:opacity-30"
                        >
                            <Image src="/seta-direita.png" alt="Anterior" width={20} height={20} className="rotate-180" />
                        </button>
                        <button
                            disabled={pagina >= filtrados.length}
                            onClick={() => setPagina(pagina + 5)}
                            className="disabled:opacity-30"
                        >
                            <Image src="/seta-direita.png" alt="Próxima" width={20} height={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}









{/*const tarefasFiltradas = useMemo(() => {
      const termo = busca.toLowerCase()
      return dados.filter((row) =>
      Object.values(row).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(termo);
        }
        if (
          typeof value === "number" ||
          typeof value === "boolean" ||
          value instanceof Date
        ) {
          return (String(value).toLowerCase()).includes(termo);
        }
        return false;
      })
    );
    }, [dados, busca])*/}