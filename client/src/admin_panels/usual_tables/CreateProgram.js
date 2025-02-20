// Frontend модального окна для добавления направления и функции, изменяющие состояния(установлено в модальном окне определенное значение или нет). Возможно, не будет использоваться.


import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {createAdditionalProgram, removeAdditionalProgram, updateAdditionalProgram} from "../../http/admissionAPI";
import {Button} from "react-bootstrap";
import "../../css/page_styles/AdminPanel.css"
import {updateFileUsages} from "../../additional_commands/commonPanelsFunctions";
import FilesPicker from '../FilesPicker';


const CreateProgram = observer(({program, mode}) => {
    const isEmpty = program.hasOwnProperty("fakeParam");

    const [name, setName] = useState(isEmpty ? "" : program.name)
    const [kind, setKind] = useState(isEmpty ? "" : program.kind);
    const [description, setDescription] = useState(isEmpty ? "" : program.description);
    const [modules, setModules] = useState(isEmpty ? [] : program.modules);
    const [hours, setHours] = useState(isEmpty ? 0 : program.hours);
    const [form, setForm] = useState(isEmpty ? "" : program.form);
    const [cost, setCost] = useState(isEmpty ? 0 : program.cost);
    const [programImg, setProgramImg] = useState(isEmpty ? null : program.programImg)
    const [supervisorName, setSupervisorName] = useState(isEmpty ? "" : program.supervisorName);
    const [supervisorDescription, setSupervisorDescription] = useState(isEmpty ? "" : program.supervisorDescription);
    const [supervisorImg, setSupervisorImg] = useState(isEmpty ? null : program.supervisorImg)

    const [prevProgramImg, setPrevProgramImg] = useState(isEmpty ? null : program.programImg)
    const [prevSupervisorImg, setPrevSupervisorImg] = useState(isEmpty ? null : program.supervisorImg)

    useEffect(() => {
        if (mode === "edit") {
            document.getElementById('name').value = name
            document.getElementById('kind').value = kind
            document.getElementById('description').value = description
            document.getElementById('modules').value = modules
            document.getElementById('hours').value = hours
            document.getElementById('form').value = form
            document.getElementById('cost').value = cost
            document.getElementById('supervisorName').value = supervisorName
            document.getElementById('supervisorDescription').value = supervisorDescription
        }
    }, [])


    const saveProgram = async () => {
        const formData = new FormData()
        program.id && formData.append("id", program.id)
        formData.append("name", name)
        formData.append("kind", kind)
        formData.append("description", description)
        formData.append("modules", JSON.stringify(modules))
        formData.append("hours", `${hours}`)
        formData.append("form", form)
        formData.append("cost", `${cost}`)
        formData.append("programImg", programImg)
        formData.append("supervisorName", supervisorName)
        formData.append("supervisorDescription", supervisorDescription)
        formData.append("supervisorImg", supervisorImg);
        (mode === "edit") ? updateAdditionalProgram(formData).then(() => alert("Успешно обновлено")) : createAdditionalProgram(formData).then(() => {
            alert("Успешно добавлено")
            mode = "edit"
        })
    }

    return (
        <div>
            <div>
                <label htmlFor="name" className="mini-info">Название</label>
                <input type="name" id="name" onChange={e => setName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="kind" className="mini-info">Тип программы</label>
                <select id="kind" size="1" value={kind} onChange={e => setKind(e.target.value)}>
                    <option id="Программа профессиональной переподготовки">Программа профессиональной переподготовки
                    </option>
                    <option id="Программа повышения квалификации">Программа повышения квалификации</option>
                </select>
            </div>

            <div>
                <label htmlFor="description" className="mini-info">Описание программы</label>
                <textarea className="big-info" id="description"
                          onChange={e => setDescription(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="modules" className="mini-info">Модули программы</label>
                <textarea className="big-info" id="modules"
                          onChange={e => setModules(e.target.value.split(";"))}/>
            </div>

            <div>
                <label htmlFor="hours" className="mini-info">Длительность (в часах)</label>
                <input type="number" id="hours" onChange={e => setHours(Number(e.target.value))}/>
            </div>

            <div>
                <label htmlFor="form" className="mini-info">Тип программы</label>
                <select id="form" size="1" value={form} onChange={e => setForm(e.target.value)}>
                    <option id="Очная">Очная</option>
                    <option id="Очно-заочная">Очно-заочная</option>
                    <option id="Заочная">Заочная</option>
                </select>
            </div>

            <div>
                <label htmlFor="cost" className="mini-info">Стоимость</label>
                <input type="text" id="cost" onChange={e => setCost(Number(e.target.value))}/>
            </div>


            <div style={{marginBottom: "2%"}}>
                <label htmlFor="programImg" className="mini-info">Обложка программы</label>
                <FilesPicker
                    pickedFiles={programImg}
                    setPickedFiles={setProgramImg}
                    isMultiple={false}
                    isRequired={false}
                    isImage={true}
                />
            </div>

            <div>
                <label htmlFor="supervisorName" className="mini-info">ФИО руководителя программы</label>
                <input type="name" id="supervisorName" onChange={e => setSupervisorName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="supervisorDescription" className="mini-info">Описание руководителя программы</label>
                <textarea className="big-info" id="supervisorDescription"
                          onChange={e => {
                              console.log(e.target.value)
                              setSupervisorDescription(e.target.value)
                          }}/>
            </div>

            <div style={{marginBottom: "2%"}}>
                <label htmlFor="supervisorImg" className="mini-info">Фото руководителя программы</label>
                <FilesPicker
                    pickedFiles={supervisorImg}
                    setPickedFiles={setSupervisorImg}
                    isMultiple={false}
                    isRequired={false}
                    isImage={true}
                />
            </div>

            <Button className="buttom-add" variant="outline-success" onClick={() => {
                saveProgram().then((bool) => {
                    if (programImg !== prevProgramImg) {
                        (prevProgramImg !== null) && updateFileUsages(prevProgramImg, -1);
                        updateFileUsages(programImg, 1);
                    }
                    setPrevProgramImg(programImg);

                    if (supervisorImg !== prevSupervisorImg) {
                        (prevSupervisorImg !== null) && updateFileUsages(prevSupervisorImg, -1);
                        updateFileUsages(supervisorImg, 1);
                    }
                    setPrevSupervisorImg(supervisorImg);
                })
            }}>
                Сохранить программу
            </Button>
            <Button className="buttom-close" variant="outline-warning" onClick={() => document.location.reload()}>
                Выйти без сохранения
            </Button>
            {mode === "edit" &&
                <Button className="buttom-close" variant="outline-danger"
                        onClick={() => {

                            removeAdditionalProgram(program.id).then((data) => {
                                if (!isNaN(parseInt(data))){
                                    (prevProgramImg !== null) && updateFileUsages(prevProgramImg, -1);
                                    (prevSupervisorImg !== null) && updateFileUsages(prevSupervisorImg, -1);
                                    document.location.reload()
                                } else {
                                    alert("Что-то пошло не так...");
                                }
                            })
                        }}>
                    Удалить программу
                </Button>
            }
        </div>
    );
});


export default CreateProgram;