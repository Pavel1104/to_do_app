class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      deadline: '',

      priority: 0,
      project_id: '',
      projectColor: '#ffffff',

      showForm: false,
      showFormInfo: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onDeadlineChange = this.onDeadlineChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.findProject = this.findProject.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);

    this.deadlineInput = React.createRef();
  }

  onSubmit(event){
    event.preventDefault();
    this.props.handleFormSubmit(
      this.state.name,
      this.state.deadline,
      this.state.priority,
      this.state.project_id,
    );
    this.clearForm();
  }

  onDeadlineChange(event){
    this.setState({deadline: event.target.value});
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onCancel(event){
    event.preventDefault();
    this.clearForm();
  }

  clearForm(){
    this.setState({
      name: '',
      deadline: '',
      showForm: false,
    })
  }

  showForm(){
    let pColor;
    try {
      this.setState({
        showForm: true,
        projectColor: this.props.projects[0].color,
        project_id: this.props.projects[0].id,
        showFormInfo: false,
      });
    } catch(e) {
      this.setState({
        showFormInfo: true,
      });
    }
  }

  findProject(project_id) {
    return this.props.projects.find(x => x.id === parseInt(project_id));
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

  componentDidMount() {
    this.deadlineInput.current.flatpickr({
      altInput: false,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      // minDate: "today",
      enableTime: false,
      // dateFormat: "Y-m-d H:i",
      dateFormat: "Y-m-d",
      time_24hr: true,
    });
  }

  render() {
    let priorityOptions = [0, 1, 2].map((item) => {
      return (
        <option key={item} value={item}>{item}</option>
      )
    })

    let projectOptions = this.props.projects.map((project) => {
      return (
        <option key={project.id} value={project.id} >{project.name}</option>
      )
    })

    return (
      <React.Fragment>
        <label className="show-form-add-task" style={!this.state.showForm ? {} : { display: 'none' }}
          onClick={this.showForm}><span className="plus"
        >+</span> Add task</label>

        <div className="task-field" style={this.state.showForm ? {} : { display: 'none' }}>
          <form id="add-new-task">
            <select className={`select priority priority-${this.state.priority}`}
              value={this.state.priority} onChange={this.handleChangePriority}
            >
              {priorityOptions}
            </select>

            <input type="text" readOnly="true" name="deadline" value={this.state.deadline}
              onInput={this.onDeadlineChange} ref={this.deadlineInput}
              onKeyUp={this.handleKeyUp} placeholder='Deadline'
            />
            <input type="text" name="name" value={this.state.name}
              onChange={this.onNameChange} onKeyUp={this.handleKeyUp}
              placeholder=' Enter the name of the task'
            />

            <select className="project" value={this.state.project_id}
              onChange={this.handleChangeProject}
            >
              {projectOptions}
            </select>
            <input type="color" name="color" readOnly={true} value={this.state.projectColor} disabled="disabled"/>
            <div className={`color priority priority-${this.state.priority}`}></div>

            <button className="submit" onClick={this.onSubmit}>Submit</button>
            <button className="cancel" onClick={this.onCancel}>Cancel</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
