'use client';

import { useState } from "react";
import Glowbutton from "@/components/ui/GlowButton";

export default function ModalBasico() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            {open && (
                <div className="w-full max-w-md rounded-2xl border border-cyan-900/45 bg-slate-900/80 p-5 shadow-[0_0_36px_rgba(34,211,238,0.14)] backdrop-blur-md">
                    <h2 className="font-semibold mb-4 text-cyan-100 tracking-wide">tarefa</h2>
                    <div className="space-y-2 justify-center">
                        <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100">nome</div>
                        <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100">data</div>
                        <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100">importancia</div>
                        <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100">status</div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

