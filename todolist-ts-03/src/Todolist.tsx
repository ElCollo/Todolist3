import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTusk: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTusk: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState('')

    const addTusk = () => {
        if (title.trim() === '') {
            props.addTusk(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }


        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null)
            if (e.charCode === 13) {
                addTusk();
            }
        }

        const onAllClickHandler = () => {
            props.changeFilter('all')
        }
        const onActiveClickHandler = () => {
            props.changeFilter('active')
        }
        const onCompletedClickHandler = () => {
            props.changeFilter('completed')
        }

        return (<div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTusk}>+</button>
                    {error && <div className={'error-message'}>Field is required</div>}
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTusk(t.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked)
                            }

                            return <li key={t.id} className={ t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        )
    }
}