import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "./ScreenShotButton";

{/*Definri os tipos de dados receberá.*/}
interface feedbackContentStepProps{
    /*Importado os tipos de feedback.*/
    feedbackType: feedbackType;
    /*Função para voltar a tela de feedback no início. */
    onFeedbackRestartRequested: () => void;
    /*Função para definir como verdadeiro se feedback foi enviado.*/
    onFeedbackSent: () => void
}
export function FeedbackContentStep({
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent}
    : feedbackContentStepProps){
    /*useState para definir o print de tela.*/
    const [screenshot, setScreenshot] = useState<string | null>(null);
    /*Variável que recebe os tipos de feedback importado.*/
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    /*usaState para definir o comentário do feedback*/
    const [comment, setComment] = useState("");
    
    /*Função chamada quando usuário envia feedback.*/
    function handleSubmitFeedback(event: FormEvent){
        /*Previne o reload da página.*/
        event.preventDefault();
        /*Mostra no console os dados enviados.*/
        console.log({screenshot, comment});
        /*Chama função que define como true se o feedback foi enviado.*/
        onFeedbackSent();
    }

    return(
        <>
            {/*Cabeçalho do componente.*/}
            <header>
                {/*Botão de voltar uma tela atras.*/}
                <button 
                type="button" 
                className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                /*Função chamada que volta o feedback ao começo.*/
                onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex items-center gap-3">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6'/>
                    {feedbackTypeInfo.title}
                    {/*Componente de fechar o feedback.*/}
                    <CloseButton/>
                </span>
                
            </header>
            {/*Formulário de envio de feedback.*/}
            <form
            /*Função chamada quando usuário envia feedback.*/ 
            onSubmit={handleSubmitFeedback} 
            className="my-4 m-full" >
                <textarea
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                /*Texto de placeholder.*/
                placeholder="Conte o que está acontecendo...."
                /*Chama função para definir qual é o feedback que será enviado.*/
                onChange={event => setComment(event.target.value)}/>
                {/*Rodapé do componente.*/}
                <footer className="flex gap-2 mt-2">
                    {/*Botão camera para tirar print.*/}
                    <ScreenShotButton 
                    /*Envia o print tirado.*/
                    screenshot={screenshot}
                    /*Função para defirnir o print.*/ 
                    onScreenshotTook={setScreenshot}/>
                    {/*Botão de submeter o envio do feedback.*/}
                    <button
                    type="submit"
                    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    /*Desativado quando o textArea não estiver preenchido.*/
                    disabled={comment.length === 0}>
                        Enviar
                    </button>
                </footer>
            </form>
        </>
    )
}