
export default function Buttons({
  action1,
  action2,
  onAction1Click,
  onAction2Click,
  action1Type = "submit",
  action2Type = "button"
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end">
          <button
            type={action1Type}
            onClick={onAction1Click}
            className="bg-terciary w-full sm:w-24 md:w-28 lg:w-32 px-4 py-2 rounded-4xl text-white cursor-pointer hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            {action1}
          </button>
          <button
            type={action2Type}
            onClick={onAction2Click}
            className="bg-terciary w-full sm:w-24 md:w-28 lg:w-32 px-4 py-2 rounded-4xl text-white cursor-pointer hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            {action2}
          </button>
        </div>
  )
}
