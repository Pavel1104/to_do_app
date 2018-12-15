class Task extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false,
      showForn: false,
      name: props.task.name,
      deadline: props.task.deadline,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.onDeadlineChange = this.onDeadlineChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

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
        editable: false,
      })
    } else if (event.keyCode === 13) {
      let task = {
        id: this.props.task.id,
        name: this.state.name,
        deadline: this.state.deadline,
      };
      this.props.handleUpdate(task);
      this.setState({editable: false});
    }
  }

  componentDidMount(){
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
  }

  render(){
    return (
      <React.Fragment>
        <form className="task">
          <input type="text" name="name" value={this.state.name} disabled = {(!this.state.editable)? "disabled" : ""} onChange={this.onNameChange} onKeyUp={this.handleKeyUp} placeholder=' Enter the name of the task' />
          <input type="text" readOnly="true" name="deadline" value={this.state.deadline} disabled = {(!this.state.editable)? "disabled" : ""} onInput={this.onDeadlineChange} ref={this.deadlineInput} onKeyUp={this.handleKeyUp} placeholder='Deadline' />
        </form>
        <div className="task-menu">
          <i className="dots fas fa-ellipsis-v"></i>
          <i className={`edit fas fa-pencil-alt ${this.state.editable? 'disabled' : ''}`} onClick={this.handleEdit} disabled = {(this.state.editable)? "disabled" : ""}></i>
          <i className="delete far fa-trash-alt" onClick={() => this.props.handleDelete(this.props.task.id)}></i>
        </div>
      </React.Fragment>
    )
  }
}
