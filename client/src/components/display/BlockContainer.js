import '../../css/component_styles/Block.css';
import ContentContext from '../contexts/ContentContext';
import {useContext, useEffect} from 'react';
import { findDOMNode } from 'react-dom';
import {observer} from "mobx-react-lite";

/**
 * Контейнер для всех блоков текущей страницы. Все блоки должны помещаться в этот контейнер. 
 * Помимо того, что этот контейнер определяет позиционирование блоков, он также служит интерфейсом между блоками страницы и боковой панелью с ссылками.
 * 
 * @param {array} children Массив из компонентов Block
 * @returns Компонент списка блоков
 */
const BlockContainer = observer(({ children }) => {
    const updateLinksPanel = useContext(ContentContext);  // Получаем callback из ContentContext для передачи текущих активных блоков

    const setBlocksLinks = (element) => {
        const domNode = findDOMNode(element);
        if (domNode && domNode.children) {
            const newContent = [];
            for (const block of domNode.children) {
                const blockDomNode = findDOMNode(block);
                const blockLinkName = blockDomNode.getAttribute('linkname');
                blockLinkName && newContent.push({
                    name: blockLinkName,
                    domNode: blockDomNode,
                    id: newContent.length
                });
            }
            updateLinksPanel(newContent);
        }
    };
    
    return (
        <div id='test' className="BlockContainer content" ref={setBlocksLinks}>
            { children }
        </div>
    );
})

export default BlockContainer;