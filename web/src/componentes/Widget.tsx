// importação da bliblioteca de iconnes, neste caso do icone de feedback
import {ChatTeardropDots} from 'phosphor-react';
// importação da biblioteca para uso ao clicar no botão de feedback, ter acessibilidade.
import {Popover} from '@headlessui/react';
import { WidgetForm } from './WidgetForm';

export function Widget(){

    return (
        // div que possui botão
        <Popover className='absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end'>
            {/*campo que será aberto ao cliar no botao */}
            <Popover.Panel>
                <WidgetForm/>
            </Popover.Panel>

            {/*botão de feedback*/}
            <Popover.Button className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group'>
                {/* icone do botão */}
                <ChatTeardropDots className='w-6 h-6'/>
                {/*hover do botão*/}
                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    <span className='pl-2'>Feedback</span>
                </span>
            </Popover.Button>
        </Popover>
    )
}