import './CreatTaskBar.css';

interface CrateTaskBarProps{
    title: string,
    setTitle: (event: string) => void
    handleKeyUp: (key: string) => void
}

export default function CreateTaskBar({title, setTitle,  handleKeyUp}: CrateTaskBarProps){
    
    return(
        <>
            <input type="text" 
            placeholder="Adicione uma Task" 
            value={title} onChange={(event) => 
            setTitle(event.target.value)}
            onKeyUp={(event) => handleKeyUp(event.key)}
            />
        </>
    )

}