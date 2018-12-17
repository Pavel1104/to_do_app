const AllTasks = (props) => {
  let tasks = props.tasks.map((task) => {
    return(
      <div key={task.id}>
        <Task task={task} projects={props.projects} handleDelete={props.handleDelete}
        handleUpdate={props.handleUpdate} showArchivedTasks={props.showArchivedTasks}
        />
      </div>
    )
  })
  return(
    <div>
      {tasks}
    </div>
  )
}
