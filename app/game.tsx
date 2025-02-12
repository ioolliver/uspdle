'use client';

import { useState } from "react";
import { ImagePixelated } from "next-pixelate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Confetti } from "@/components/magicui/confetti";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

type TGuess = {
    name: string;
    imageUrl: string;
}

function SearchBar({ options, addGuess } : { options: string[], addGuess: (name: string) => void }) {
    function handleSelect(item : {id: number, name: string}) {
        addGuess(item.name);
    }

    return <ReactSearchAutocomplete 
    items={options.map((v, i) => ({ id: i, name: v }))}
    className="w-full rounded-sm"
    onSelect={handleSelect}
    showNoResultsText="Não encontrado"
    />
}

function getTodayGuess(institutos : TGuess[]) {
    const date = new Date();
    const randomNumber = date.getFullYear() + date.getMonth() + date.getDate();
    const dataSize = institutos.length;
    const index = randomNumber % dataSize;
    return institutos[index]; 
}

const INITIAL_PIXEL_SIZE = 70;
const DECREASE_PIXEL_RATE = 10;
const SITE_LINK = "https://uspdle.vercel.app"

export function Game({ options, institutos } : { institutos: TGuess[], options: string[] }) {
    
    const todayGuess = getTodayGuess(institutos);

    const [currentPixelSize, setCurrentPixelSize] = useState(INITIAL_PIXEL_SIZE);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    function winPlayer() {
        setTimeout(() => {
            setOpenDialog(true);
        }, 1000);
    }

    function addGuess(name : string) {
        setGuesses([name, ...guesses]);
        let newRate = currentPixelSize - DECREASE_PIXEL_RATE;
        if(newRate < 0) newRate = 0;
        setCurrentPixelSize(newRate);
        if(name == todayGuess.name) {
            winPlayer();
        }
    }

    function copyResult() {
        const text = `Eu acertei o local da USP em ${guesses.length} tentativas!
${generateEmojis(guesses.length)}
        
Tente em ${SITE_LINK}`;
        navigator.clipboard.writeText(text);
    }

    function generateEmojis(len : number) {
        let text = "";
        for(let i = 0; i < len; i++) {
            if(i == len-1) text += "✅"
            else text += "❌"
        }
        return text;

    }

    return <div className="bg-slate-950 max-w-96 w-[80%] text-center p-4 rounded-lg items-center flex flex-col gap-4">
        <h1 className="text-2xl text-white">Que local da USP é esse?</h1>
        <ImagePixelated className="w-[80%]" src={todayGuess.imageUrl} pixelSize={currentPixelSize} />
        <SearchBar options={options.filter(op => !guesses.includes(op))} addGuess={addGuess} />
        <ul className="flex flex-col gap-4 w-full">
            {
                guesses.map(guess => <li key={guess} className={cn("w-full bg-red-500 p-4 rounded-full", {
                    "bg-green-500": (todayGuess.name == guess)
                })}>
                    <p className="text-white">{guess}</p>
                </li>)
            }
        </ul>
        <Dialog open={openDialog} onOpenChange={(v) => { setOpenDialog(v) }}>
            <DialogContent>
                <DialogTitle className="text-3xl text-center">Parabéns! Você acertou.</DialogTitle>
                <Confetti className="absolute w-screen" />
                <p>A resposta era: {todayGuess.name}</p>
                <Image src={todayGuess.imageUrl} alt="Imagem do instituto correto." width={500} height={500} />
                <p className="text-center">Volte amanhã para o próximo local!</p>
                <p className="border-2 p-2 border-slate-900">Eu acertei o local da USP em {guesses.length} tentativas!<br />{generateEmojis(guesses.length)}<br /><br />Tente em {SITE_LINK}</p>
                <AnimatedSubscribeButton onClick={copyResult} className="w-full">
                <span className="group inline-flex items-center">
                    Compartilhar
                </span>
                <span className="group inline-flex items-center">
                    Copiado!
                </span>
                </AnimatedSubscribeButton>
            </DialogContent>
        </Dialog>
    </div>
}