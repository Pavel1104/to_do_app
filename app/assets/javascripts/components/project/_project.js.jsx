class Project extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false,
      name: this.props.project.name,
      color: this.props.project.color,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.updateProject = this.updateProject.bind(this);

    this.colorInput = React.createRef();
  }

  handleEdit(event){
    if (this.state.editable) {
      this.updateProject();
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onColorChange(event){
    this.setState({color: event.target.value});
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
      this.updateProject();
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
        <div className="project">
          <input type="color" name="color" value={this.state.color} disabled = {(!this.state.editable)? "disabled" : ""}  onChange={this.onColorChange} onKeyUp={this.handleKeyUp} ref={this.colorInput} placeholder='color' />
          <input type="text" name="name" value={this.state.name} disabled = {(!this.state.editable)? "disabled" : ""} onChange={this.onNameChange} onKeyUp={this.handleKeyUp} placeholder='Project name' />
        </div>
        <div className="project-menu">
          <i className="dots fas fa-ellipsis-v"></i>
          <div className="tooltip">
            <i className={`edit fas fa-pencil-alt ${this.state.editable? 'disabled' : ''}`} onClick={this.handleEdit} disabled = {(this.state.editable)? "disabled" : ""}></i>
            <i className="delete far fa-trash-alt" onClick={() => this.props.handleDelete(this.props.project.id)}></i>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
