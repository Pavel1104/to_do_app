class Task extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false,
      showForn: false,
      name: props.task.name,
      deadline: props.task.deadline,
      priority: props.task.priority,
      project_id: props.task.project_id,
      projects: props.projects,
      projectColor: '#ffffff',
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.onDeadlineChange = this.onDeadlineChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.findProject = this.findProject.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.updateProjectColor = this.updateProjectColor.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);

    this.deadlineInput = React.createRef();
  }

  handleEdit(event){
    event.preventDefault();
    this.deadlineInput.current.flatpickr({
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      enableTime: false,
      // dateFormat: "Y-m-d H:i",
      dateFormat: "Y-m-d",
      time_24hr: true,
    });
    this.setState({
      editable: !this.state.editable
    })
  }

  onDeadlineChange(event){
    this.setState({deadline: event.target.value});
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 27) {
      this.setState({
        name: this.props.task.name,
        deadline: this.props.task.deadline,
        priority: this.props.priority,
        project_id: this.props.project_id,
        editable: false,
      })
    } else if (event.keyCode === 13) {
      let task = {
        id: this.props.task.id,
        name: this.state.name,
        deadline: this.state.deadline,
        priority: this.state.priority,
        project_id: this.state.project_id,
      };
      this.props.handleUpdate(task);
      this.setState({editable: false});
    }
  }

  handleChangePriority(event) {
    this.setState({priority: event.target.value});
  }

  handleChangeProject(event) {
    let pColor = this.findProject(event.target.value).color;

    this.setState({
      project_id: event.target.value,
      projectColor: pColor,
    });
  }

  updateProjectColor() {
    let pColor = this.findProject().color;

    this.setState({
      projectColor: pColor,
    });
  }

  componentDidMount() {
    this.deadlineInput.current.flatpickr({
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      enableTime: false,
      // dateFormat: "Y-m-d H:i",
      dateFormat: "Y-m-d",
      time_24hr: true,
    });
    this.updateProjectColor();
  }

  findProject(project_id = this.props.task.project_id) {
    return this.state.projects.find(x => x.id === parseInt(project_id));
  }

  render(){

    let priorityOptions = [0, 1, 2].map((item) => {
      return (
        <option key={item} value={item}>{item}</option>
      )
    })

    let projectOptions = this.state.projects.map((project) => {
      return (
        <option key={project.id} value={project.id} >{project.name}</option>
      )
    })

    return (
      <React.Fragment>
        <div className="task-field">
          <form className="task">
            <div className={`color priority priority-${this.state.priority}`}
              style={this.state.editable ? {display: 'none'} : {}}
            ></div>
            <select className={`select priority priority-${this.state.priority}`}
              value={this.state.priority} disabled={(!this.state.editable)? "disabled" : ""}
              style={this.state.editable ? {} : {display: 'none'}}
              onChange={this.handleChangePriority}
            >
              {priorityOptions}
            </select>

            <input type="text" readOnly="true" name="deadline" value={this.state.deadline}
              disabled = {(!this.state.editable)? "disabled" : ""}
              onInput={this.onDeadlineChange} ref={this.deadlineInput}
              onKeyUp={this.handleKeyUp} placeholder='Deadline'
            />
            <input type="text" name="name" value={this.state.name}
              disabled = {(!this.state.editable)? "disabled" : ""}
              onChange={this.onNameChange} onKeyUp={this.handleKeyUp}
              placeholder=' Enter the name of the task'
            />

            <select className="project" value={this.state.project_id}
              disabled = {(!this.state.editable)? "disabled" : ""}
              onChange={this.handleChangeProject}
            >
              {projectOptions}
            </select>
            <input type="color" name="color" value={this.state.projectColor} disabled="disabled"/>
          </form>
          <div className="task-menu">
            <i className="dots fas fa-ellipsis-v"></i>
            <div className="tooltip">
              <i className="to-do fas fa-check"></i>
              <i className={`edit fas fa-pencil-alt ${this.state.editable? 'disabled' : ''}`}
                onClick={this.handleEdit} disabled = {(this.state.editable)? "disabled" : ""}
              ></i>
              <i className="delete far fa-trash-alt" onClick={() => this.props.handleDelete(this.props.task.id)}></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
