'use client'
import { useParams, useSearchParams } from "next/navigation";
import Link from 'next/link'


export default function TestePage() {
    const parametros = useParams();
    const parametrosQuery = useSearchParams();


    return (
        <div className="flex justify-center">
            <h1>
                http://localhost:3000/teste/paulo?nome=oahjda
                <Link href={"/"}> va para home </Link>
                <br />
                {parametros.id} - {parametrosQuery.get('nome')}
            </h1>
        </div>
    )
}
