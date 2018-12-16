class BodyTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      projects: [],
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentDidMount(){
    fetch('/api/v1/tasks.json')
      .then((response) => {return response.json()})
      .then((data) => {
        this.setState({
          tasks: data.tasks,
          projects: data.projects,
        })
      });
  }

  handleFormSubmit(name, deadline, priority, project_id){
    let body = JSON.stringify({task: {
      name: name,
      deadline: deadline,
      priority: priority,
      project_id: project_id,
    } })
    fetch('http://localhost:3000/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((task)=>{
      this.addNewTask(task)
    })
  }

  handleDelete(id){
    fetch(`http://localhost:3000/api/v1/tasks/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.deleteTask(id)
    })
  }

  deleteTask(id){
    newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({
      tasks: newTasks
    })
  }

  addNewTask(task){
    this.setState({
      tasks: this.state.tasks.concat(task)
    })
  }

  handleUpdate(task){
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({task: task}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateTask(task)
      })
  }

  updateTask(task){
    let newTasks = this.state.tasks.filter((f) => f.id !== task.id)
    newTasks.push(task)
    this.setState({
      tasks: newTasks
    })
  }

  render(){
    return(
      <React.Fragment>
        <AllTasks tasks={this.state.tasks} projects={this.state.projects} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
        <NewTask handleFormSubmit={this.handleFormSubmit} projects={this.state.projects}/>
      </React.Fragment>
    )
  }
}
