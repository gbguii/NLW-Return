import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import {FeedbackTypeStep} from './Steps/FeedbackTypeStep'
import { useState } from "react";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

export const feedbackTypes = {
    BUG: {
        title: 'Bug',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inceto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image:{
            source: ideaImageUrl,
            alt: 'Imagem de uma lampada'
        }
    },
    OTHER: {
        title: 'Outro',
        image:{
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem de pensamento'
        }
    }
}

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
    
    function handleRestartFeedack(){
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {!feedbackType ? (
                <FeedbackTypeStep onFeedBackTypeChanged={setFeedbackType}/>
            ): (
                <FeedbackContentStep feedbackType={feedbackType}
                                     onFeedBackRestartRequested={handleRestartFeedack}/>
            )}
            

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="#">Rocketseat</a>
            </footer>
        </div>
    ) 
}