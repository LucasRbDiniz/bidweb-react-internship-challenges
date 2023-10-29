import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import logoBidWeb from './assets/logoBidWeb.png';
import CreateTaskBar from './components/createTaskBar/CreateTaskBar';
import TaskCard from './components/taskCard/TaskCard';
import Task from './model/task'
import './App.css'

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const setAndSaveTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    }

    const handleKeyUp = (key: string) => {
        if (key === 'Enter') { addTask() }
    }

    const addTask = () => {
        if (title.length < 1) { return }

        setAndSaveTasks([...tasks, {
            id: tasks.length + 1,
            title: title,
            completed: false,
        }]);

        setTitle('');
    }

    const toggleTaskDone = (taskid: number) => {
        setAndSaveTasks(tasks.map((task: Task) => {
            if (task.id === taskid) {
                return {...task, completed: !task.completed}
            }

            return task;
        }));
    }

    const deleteTask = (taskId: number) => {
        setAndSaveTasks(tasks.filter((task) => task.id !== taskId));
    }

    return (
        <>
            <div className='header'>
                <div>
                    <img width={70} src={logoBidWeb} alt="logo-bidWeb" />
                </div>
                <h1>ToDo List</h1>
            </div>
            <div className='create-bar-container'>
                <CreateTaskBar title={title} setTitle={setTitle} handleKeyUp={handleKeyUp} />
                <button
                    className='add-button'
                    onClick={addTask}
                    disabled={title.trim().length === 0}
                >
                    <AiFillPlusCircle size={35} />
                </button>
            </div>
            <div className='task-list-container'>
                {tasks.filter((task) => !task.completed).length > 0
                ? <h2>Pendentes</h2>
                : ''
                }
                {tasks.filter((task: Task) => !task.completed).map((task: Task) => (
                    <TaskCard key={task.id} task={task} toggleTaskDone={toggleTaskDone} deleteTask={deleteTask} />
                ))}
                {tasks.filter((task) => task.completed).length > 0
                ? <h2>Completas</h2>
                : ''
                }
                {tasks.filter((task: Task) => task.completed).map((task: Task) => (
                    <TaskCard key={task.id} task={task} toggleTaskDone={toggleTaskDone} deleteTask={deleteTask} />
                ))}
            </div>
        </>
    );
}

export default App