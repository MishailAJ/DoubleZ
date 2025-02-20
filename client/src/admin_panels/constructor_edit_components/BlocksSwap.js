import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {moveBlocks} from "../../http/blockAPI";
import {publicRoutes} from "../../routes";
import Block from "../../components/display/Block";
import {refetchAllContent} from "../../additional_commands/commonPanelsFunctions";


const BlocksSwap = () => {
    const {block_store} = useContext(Context);

    const [chosenPageLink, setChosenPageLink] = useState("");
    const [updatedBlocks, setUpdatedBlocks] = useState([]);
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        block_store.setSelectedBlocks(Array.from(block_store.blocks.filter(block => block.pageLink === chosenPageLink).sort((block1, block2) => block1.ordinal - block2.ordinal)))
        for (let i = 0; i < block_store.selectedBlocks.length; i++) {
            block_store.selectedBlocks[i].ordinal = i
        }
    }, [block_store.blocks, chosenPageLink]);

    useEffect(() => setUpdatedBlocks(block_store.selectedBlocks.sort((block1, block2) => block1.ordinal - block2.ordinal)), [block_store.selectedBlocks, chosenPageLink]);

    useEffect(() => {
        saveMessage.length > 0 && alert(saveMessage)
    }, [saveMessage])


    const swapBlocks = (index1, index2) => {
        let newBlockList = []
        for (let block of updatedBlocks) {
            if (block.ordinal !== index1 && block.ordinal !== index2) {
                newBlockList.push(block)
            } else {
                if (block.ordinal === index1) {
                    newBlockList.push({...block, ordinal: index2})
                } else {
                    newBlockList.push({...block, ordinal: index1})
                }
            }
        }
        newBlockList.sort((block1, block2) => block1.ordinal - block2.ordinal)
        setUpdatedBlocks(newBlockList)
    }

    const saveBlocksOrder = () => {
        const formData = new FormData()
        formData.append("blocks", JSON.stringify(updatedBlocks))
        moveBlocks(formData).then(data => {
            console.log(data)
            if (data && data.hasOwnProperty("0")) {
                refetchAllContent(block_store)
                setSaveMessage("Блок успешно обновлен")
            } else {
                setSaveMessage("Произошла ошибка на сервере")
            }
            console.log(data)
        })
    }


    return (
        <div>
            <p className="blue_section_title">Выбор страницы</p>
            <select value={chosenPageLink} onChange={e => {
                setChosenPageLink(e.target.value)
                console.log(e.target.value)
            }}>
                <option value="">Выберите страницу, на которой находится блок, который вы хотите изменить</option>
                {publicRoutes.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0)).map((publicRoute) => (
                    <option key={publicRoute.name} value={publicRoute.path}>{publicRoute.name}</option>
                ))}
            </select>

            {updatedBlocks.map(block =>
                <div style={{border: 'solid grey 5px', margin: "20px" }}>
                    <Block block={block}/>
                    {block.ordinal > 0 && <button onClick={() => swapBlocks(block.ordinal - 1, block.ordinal)}>Передвинуть блок на 1 выше</button>}
                    {block.ordinal < updatedBlocks.length - 1 && <button onClick={() => swapBlocks(block.ordinal, block.ordinal + 1)}>Передвинуть блок на 1 ниже</button>}
                </div>
            )}
            <button onClick={saveBlocksOrder}>Сохранить текущий порядок блоков</button>
        </div>
    );
};

export default BlocksSwap;