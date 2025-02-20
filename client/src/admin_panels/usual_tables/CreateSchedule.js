// Окно для добавления партнеров и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет).

import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import "../../css/page_styles/AdminPanel.css"
import {Context} from "../../index";
import {updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import {createSchedule, removeSchedule, updateSchedule} from "../../http/scheduleAPI";
import FilesPicker from '../FilesPicker';


const CreateSchedule = observer(({schedule, mode}) => {
    const isEmpty = schedule.hasOwnProperty("fakeParam");


    const [name, setName] = useState(isEmpty ? "" : schedule.name)
    const [kind, setKind] = useState(isEmpty ? "Бакалавриат" : schedule.kind);
    const [group, setGroup] = useState(isEmpty ? "" : schedule.group);
    const [fileLink, setFileLink] = useState(isEmpty ? "" : schedule.fileLink);
    const [prevFileLink, setPrevFileLink] = useState(isEmpty ? "" : schedule.fileLink);

    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('kind').value = kind
            document.getElementById('group').value = group
        }
    }, [])


    const updateUsagesOnSave = () => {
        if (fileLink !== prevFileLink) {
            (prevFileLink !== null) && updateFileUsages(prevFileLink, -1);
            updateFileUsages(fileLink, 1);
        }
        setPrevFileLink(fileLink);
    }

    const saveSchedule = async () => {
        const formData = new FormData()
        schedule.id && formData.append("id", schedule.id)
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("group", group)
        formData.append("fileLink", fileLink);

        (mode === "edit") ? updateSchedule(formData).then(() => alert("Успешно обновлено")): createSchedule(formData).then(() => {
            alert("Успешно добавлено")
            mode = "edit"
        })
    }

    return (
        <div>
            <div>
                <label className="mini-info" htmlFor="name">Название файла с расписанием</label>
                <input className="big-info" id="name" type="text"
                          onChange={e => setName(e.target.value)}/>
            </div>

            <select id="kind" size="3" value={kind} onChange={e => setKind(e.target.value)}>
                <option id="Бакалавриат">Бакалавриат</option>
                <option id="ДПО">ДПО</option>
            </select>

            <div>
                <label className="mini-info" htmlFor="group">Номер группы</label>
               <input id="group" onChange={e => setGroup(e.target.value)}/>
            </div>


            <div style={{marginBottom: "2%"}}>
                <label className="mini-info" htmlFor="fileLink">Файл с расписанием</label>
                <FilesPicker
                    pickedFiles={fileLink}
                    setPickedFiles={setFileLink}
                    isMultiple={false}
                    isRequired={true}
                    isImage={false}
                />
            </div>


            <Button className="buttom-add" variant="outline-success" onClick={() => {
                saveSchedule().then(() => {
                    updateUsagesOnSave()
                })
            }}>
                Сохранить расписание
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => window.location.reload()}>
                Выйти без сохранения
            </Button>

            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => {
                            removeSchedule(schedule.id).then((data) => {
                                if (!isNaN(parseInt(data))){
                                    alert("Успешно удалено");
                                    (prevFileLink !== null) && updateFileUsages(prevFileLink, -1);
                                } else {
                                    alert("Что-то пошло не так...");
                                }
                            })
                        }}>
                    Удалить расписание
                </Button>
            }
        </div>
    );
});

export default CreateSchedule;