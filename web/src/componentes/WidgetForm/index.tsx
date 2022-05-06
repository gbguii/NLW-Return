import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import {FeedbackTypeStep} from './Steps/FeedbackTypeStep'
import { useState } from "react";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


{/*Objetos conteudo o conteúdo dos tipos de feedback.*/}
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
{/*Exportar o objeto de feedback para outros componente.*/}
export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    {/*UseState para defenir o tipo de feedback.*/}
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
    {/*UseState para definir se o feedback foi enviado.*/}
    const [feedbackSent, setFeedbackSent] = useState(false);

    {/*Função para voltar a tela de feedback ao inicio.*/}
    function handleRestartFeedack(){
        {/*Definir como false se o feedback foi enviado.*/}
        setFeedbackSent(false);
        {/*Definir o tipo de feedback como nulo.*/}
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {/*Vericação de qual componente deve ser exibido em tela.*/}
            {/*Se feedback for enviado, componente de Sucesso de Feedback é exibido, se não é feito outra verificação.*/}
            {feedbackSent ? 
                    <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedack}/> : (
                        <>
                            {/*Vericação de qual componente deve ser exibido em tela.*/}
                            {/*Se o tipo de feedback não for nulo, o componente de Tipo de feedback será exibido. */}
                            {!feedbackType ? 
                            (
                            <FeedbackTypeStep   /*Envio da função para definir o tipo de feedback.*/
                                                onFeedBackTypeChanged={setFeedbackType}/>
                            ) : 
                            (
                            /*Se não é exibido o componente de Couteúdo do Feedback.*/
                            <FeedbackContentStep /*Envio de  tipos de feedback.*/
                                                feedbackType={feedbackType}
                                                 /*Envio função para reiniciar feedback.*/
                                                 onFeedbackRestartRequested={handleRestartFeedack}
                                                 /*Envio de função para definir como verdadeiro se o feedback foi submetido.*/
                                                 onFeedbackSent={() => setFeedbackSent(true)}/>
                            )
                            }  
                        </>
                    )
            }
            
            {/*Rodape que será exibido em todas as páginas*/}
            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="#">Rocketseat</a>
            </footer>
        </div>
    ) 
}