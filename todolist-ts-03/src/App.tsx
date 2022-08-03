import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

export function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }

    function addTusk(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function ChangeStatus(taskId:string, isDone:boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    let tusksForTodolist = tasks
    if (filter === 'completed') {
        tusksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tusksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tusksForTodolist}
                      removeTusk={removeTask}
                      changeFilter={changeFilter}
                      addTusk={addTusk}
                      changeTaskStatus={ChangeStatus}
                      filter={filter}
            />
        </div>)
}

export default App;