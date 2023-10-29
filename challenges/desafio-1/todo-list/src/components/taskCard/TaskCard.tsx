import './TaskCard.css'
import Task from '../../model/task'
import {BsCheckCircleFill , BsCircle, BsFillTrashFill} from 'react-icons/bs'

interface TaskCardProps {
    task: Task,
    toggleTaskDone: (taskId: number) => void,
    deleteTask: (taskId: number) => void,
}

export default function TaskCard({task, toggleTaskDone, deleteTask}: TaskCardProps){
    return (
        <div className='card-container'>
            <button className='button' onClick={ () => toggleTaskDone(task.id)}>
                {task.completed 
                ? <BsCheckCircleFill/> 
                : <BsCircle/>}
            </button>
            <span className='title'>
                {task.title}
            </span>
            <button className='button delete-button' onClick={() => deleteTask(task.id)}>
                    <BsFillTrashFill/>
            </button>
        </div>
    );
}

