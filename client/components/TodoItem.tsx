import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, editTask } from '../apis/todos'
import { useState } from 'react'

interface Props {
  id: number
  taskDetails: string
}

function TodoItem({ id, taskDetails }: Props) {
  const [editing, setEditing] = useState(false)
  const [task, setTask] = useState(taskDetails)

  // mutating the todos when someone clicks the delete button
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  const handleDeleteClick = (id: number) => mutation.mutate(id)

  // edit task functions
  const mutation1 = useMutation({
    mutationFn: () => editTask({ id, taskDetails: task }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  const handleTaskEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation1.mutate()
    setEditing(!editing)
  }

  return (
    <>
      <li key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" />

          {editing ? (
            <form onSubmit={handleTaskEditSubmit}>
              <label>
                <input
                  type="text"
                  name={task}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </label>
            </form>
          ) : (
            <label onDoubleClick={() => setEditing(!editing)}>
              {taskDetails}
            </label>
          )}

          <button
            onClick={() => handleDeleteClick(id)}
            className="destroy"
          ></button>
        </div>
      </li>
    </>
  )
}

export default TodoItem
