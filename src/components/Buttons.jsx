
export default function Buttons({
  action1,
  action2,
  onAction1Click,
  onAction2Click,
  action1Type = "submit",
  action2Type = "button"
}) {
  return (
    <div className="flex gap-4 justify-end">
          <button 
            type={action1Type}
            onClick={onAction1Click}
            className="bg-terciary w-20 rounded-4xl text-white cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {action1}
          </button>
          <button 
            type={action2Type}
            onClick={onAction2Click}
            className="bg-terciary w-20 rounded-4xl text-white cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {action2}
          </button>
        </div>
  )
}
