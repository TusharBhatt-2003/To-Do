'use client'
import React, { useState } from 'react'

function Page() {
  const [task, setTask] = useState("")
  const [desc, setDesc] = useState('')
  const [mainTask, setMainTask] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null)
  const [filter, setFilter] = useState('all') // "all", "completed", or "incomplete"

  const submitHandler = (e) => {
    e.preventDefault()
    if (isEditing) {
      // Update the existing task
      let updatedTasks = [...mainTask]
      updatedTasks[currentTaskIndex] = { task, desc, completed: updatedTasks[currentTaskIndex].completed }
      setMainTask(updatedTasks)
      setIsEditing(false)
      setCurrentTaskIndex(null)
    } else {
      // Add a new task
      setMainTask([...mainTask, { task, desc, completed: false }])
    }
    setTask("")
    setDesc("")
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask]
    copyTask.splice(i, 1)
    setMainTask(copyTask)
  }

  const completeHandler = (i) => {
    let updatedTasks = [...mainTask]
    updatedTasks[i].completed = !updatedTasks[i].completed
    setMainTask(updatedTasks)
  }

  const editHandler = (i) => {
    setTask(mainTask[i].task)
    setDesc(mainTask[i].desc)
    setIsEditing(true)
    setCurrentTaskIndex(i)
  }

  // Function to filter tasks based on the selected filter
  const filteredTasks = mainTask.filter((t) => {
    if (filter === 'completed') return t.completed
    if (filter === 'incomplete') return !t.completed
    return true // for 'all'
  })

  return (
    <>
      <div className='flex flex-col items-center p-5'>
        <h1 className='bg-black text-3xl text-white text-center font-bold rounded px-3 m-2'>
        To-Do List
        </h1>
        <form className='flex flex-col items-center mt-2'
          onSubmit={submitHandler}>
          <input type='text'
            className='border-black border-2 rounded-lg text-xl m-5 p-1'
            placeholder='Enter your task...'
            value={task}
            onChange={(e) => setTask(e.target.value)}>
          </input>
          <input type='text'
            className='border-black border-2 rounded-lg text-xl m-5 p-1'
            placeholder='Enter description here'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}>
          </input>
          <button className='w-24 bg-black text-white rounded-lg m-5 py-1 px-2 '>
            {isEditing ? "Update Task" : "Add To List"}
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex space-x-2 m-5">
          <button
            className={`focus:text-black focus:border-black hover:text-zinc-900 hover:border-b-2 hover:border-black border-b-2 text-zinc-500  px-3 py-1`}
            onClick={() => setFilter('all')}>
            All Tasks
          </button>
          <button
            className={`focus:text-black focus:border-black hover:text-zinc-900 hover:border-b-2 hover:border-black border-b-2 text-zinc-500 px-3 py-1`}
            onClick={() => setFilter('completed')}>
            Completed
          </button>
          <button
            className={`focus:text-black focus:border-black hover:text-zinc-900 hover:border-b-2 hover:border-black border-b-2 text-zinc-500 px-3 py-1`}
            onClick={() => setFilter('incomplete')}>
            Incomplete
          </button>
        </div>

        <hr />
        <div className='w-full lg:w-1/2 p-8 bg-black text-white rounded-md'>
          <ul>
            {filteredTasks.length === 0 ? (
              <h2
              className='text-center'
              >No tasks available</h2>
            ) : (
              filteredTasks.map((t, i) => (
                <div
                  className='flex justify-between items-center mb-1 '
                  key={i}>
                  <div className={`w-1/3 text-lg font-semibold ${t.completed ? 'line-through text-gray-500' : ''}`}>
                    <h2>{t.task}</h2>
                  </div>
                  <div className={`w-1/3 text-sm font-light ${t.completed ? 'line-through text-gray-500' : ''}`}>
                    <h5>{t.desc}</h5>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => completeHandler(i)}
                      className='rounded-lg px-2 py-1'>
                      {t.completed ? <svg className='undo-btn' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path></svg> 
                                   : <svg className='cmplt-btn' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>}
                    </button>
                    {!t.completed && (
                      <button
                        onClick={() => editHandler(i)}
                        className= 'text-white rounded-lg px-2 py-1'>
                        <svg className='edit-btn' width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteHandler(i)}
                      className='rounded-lg px-2 py-1'>
                     <svg className='dlt-btn' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Page
