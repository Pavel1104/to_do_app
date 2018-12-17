class Project extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false,
      name: this.props.project.name,
      color: this.props.project.color,
      undoneTasks: this.props.project.tasks_count,
      disabledSubmitButton: true,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.validate = this.validate.bind(this);
    this.canDelete = this.canDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.colorInput = React.createRef();
  }

  validate(){
    if (this.state.name != '' && this.state.color != '') {
      this.setState({disabledSubmitButton: false});
    } else {
      this.setState({disabledSubmitButton: true});
    }
  }

  canDelete(){
    if (this.state.undoneTasks == 0) {
      return true;
    }
  }

  handleDelete(){
    if (this.canDelete()) {
      this.props.handleDelete(this.props.project.id)
    }
  }

  handleEdit(event){
    if (this.state.editable && !this.state.disabledSubmitButton) {
      this.updateProject();
    }

    if (!this.state.editable) {
      this.setState({
        editable: !this.state.editable
      })
    }
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
    this.validate();
  }

  onColorChange(event){
    this.setState({color: event.target.value});
    this.validate();
  }

  handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 27) {
      this.setState({
        name: this.props.project.name,
        color: this.props.project.color,
        editable: false,
      })
    } else if (event.keyCode === 13) {
      try {
        if ( !this.state.disabledSubmitButton ) {
          this.updateProject();
        }
      } catch (error) {}
    }
  }

  updateProject() {
    let project = {
      id: this.props.project.id,
      name: this.state.name,
      color: this.state.color,
    };
    this.props.handleUpdate(project);
    this.setState({editable: false});
  }

  render(){
    return (
      <React.Fragment>
        <label className="undone-tasks">{(this.state.undoneTasks > 0) ? this.state.undoneTasks : ''}</label>
        <div className="project">
          <input type="color" name="color" value={this.state.color} disabled = {(!this.state.editable)? "disabled" : ""}  onChange={this.onColorChange} onKeyUp={this.handleKeyUp} ref={this.colorInput} placeholder='color' />
          <input type="text" name="name" value={this.state.name} disabled = {(!this.state.editable)? "disabled" : ""} onChange={this.onNameChange} onKeyUp={this.handleKeyUp} placeholder='Project name' />
        </div>
        <div className="project-menu">
          <i className="dots fas fa-ellipsis-v"></i>
          <div className="tooltip">
            <i className={`edit fas fa-pencil-alt ${this.state.editable? 'disabled' : ''}`}
              onClick={this.handleEdit} disabled = {(this.state.editable)? "disabled" : ""}
            ></i>
            <i className={`delete far fa-trash-alt ${!this.canDelete() ? "disabled" : ""}`}
              onClick={this.handleDelete}
            ></i>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
