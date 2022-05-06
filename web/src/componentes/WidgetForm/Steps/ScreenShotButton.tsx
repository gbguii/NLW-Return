import { Camera, Trash } from "phosphor-react";
{/*Blioteca que realiza o print.*/}
import html2canvas from 'html2canvas';
import { useState } from "react";
import { Loading } from "../../Loading";
{/*Definição dos tipos de dados recebidos.*/}
interface ScreenShotButtonProps{
    /*print convertida em string.*/
    screenshot: string | null;
    /*Quando print foi tirado.*/
    onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenShotButton({screenshot ,onScreenshotTook}: ScreenShotButtonProps){
    {/*Define se está tirando o print.*/}
    const [isTakingScreenshot, setIsTakingScreenchot] = useState(false);

    {/*Função chamada quando usuário clica para tirar print.*/}
    async function handleTakeScreenShot(){
        {/*Define como verdadeiro o estado de esta tirando print.*/}
        setIsTakingScreenchot(true);
        {/*Define o local que será tirado o print, neste caso todo o html da página.*/}
        const canvas = await html2canvas(document.querySelector('html')!);
        {/*Recupera o print tirado da página, definindo no formato png.*/}
        const base64image = canvas.toDataURL('image/png');
        {/*Defini imagem que será mostrado no lugar do icone de camera.*/}
        onScreenshotTook(base64image);
        {/*Define como falso o estado se está tirando print.*/}
        setIsTakingScreenchot(false);
    }
    {/*Se já existe um print tirado, é o previo do print.*/}
    if(screenshot){
        return(
            <button
            type="button" 
            className="p1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            /*Define o print como nulo.*/
            onClick={() => onScreenshotTook(null)}
            style={{
                /*Previo do print tirado.*/
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 100,
            }}>
                {/*Icone de lixeira para apagar print tirado.*/}
                <Trash weight="fill"/>
            </button>
        )
    }
    {/*Se nenhum print existe, é mostrado icone de camera para realizar print.*/}
    return(
        <button type="button"
                /*Realiza o print.*/
                onClick={handleTakeScreenShot}
                className="p-2 bg-zinc-800 rounded border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500">
                {/*Se foi tirado print, loading é exibido, se não, icone de camera é exibido.*/}
                {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/> }
        </button>
    )
}