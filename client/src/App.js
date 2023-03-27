// BrowserRouter - обертка для запуска всех страниц. На каждой странице будут меню (NavBar), а также компонент-страница (какую страницу запускать решает AppRouter)

import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Menu from "./components/permanent/Menu";
import ShowFooter from "./components/permanent/ShowFooter";
import SideBar from './components/permanent/SideBar';
import LinksPanel from './components/permanent/LinksPanel';
import { Context } from "./index";
import ContentContext from './components/contexts/ContentContext';
import ProFooter from "./components/permanent/ProFooter";


const App = observer(() => {
    const {user} = useContext(Context);

    const [currentContent, setCurrentContent] = useState([]);  // Стейт с текущими блоками страницы (нужны для LinksPanel)

    const updateContent = (newContent) => {  /* Это callback, который будет передан в ContentContext.Provider, 
                                                чтобы внутренние компоненты могли передавать сюда блоки контента */
        // Изменяем currentContent только тогда, когда newContent отличается от него. Это нужно, чтобы избежать бесконечного ререндера.
        if (newContent.length !== currentContent.length) {
            setCurrentContent(newContent);
        } else {
            for (const i in newContent) {
                if (newContent[i].name !== currentContent[i].name) {
                    setCurrentContent(newContent);
                    break;
                }
            }
        }
    };
 
    return (
        <BrowserRouter>
            <Menu/>
            <div className='rootContainer' id="rootCont">
                <SideBar
                    alignment='left'
                    isSticky={true}
                >
                    <LinksPanel
                        links={currentContent.map(x => new Object({id: x.id, name: x.name, domNode: x.domNode}))}
                    />
                </SideBar>
                <ContentContext.Provider value={updateContent}>
                    <AppRouter/>
                </ContentContext.Provider>
                <SideBar 
                    alignment='right'
                    isSticky={false}
                >
                    <h1>Электронные ресурсы</h1>
                    <a href="">ЭБС</a>
                    <a href="">ЕОИС</a>
                </SideBar>
            </div>
            {/*<ShowFooter/>*/}
        </BrowserRouter>
    )
})

export default App;
