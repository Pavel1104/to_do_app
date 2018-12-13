
class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      deadline: '',
      showForm: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onDeadlineChange = this.onDeadlineChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.showForm = this.showForm.bind(this);

    this.textInput = React.createRef();
  }

  onSubmit(event){
    event.preventDefault();
    this.props.handleFormSubmit(this.state.name, this.state.deadline);
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
    this.setState({showForm: true});
  }
  componentDidMount(){
    this.textInput.current.flatpickr({
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

  render() {
    return (
      <React.Fragment>
        <label className="show-form-add-task" style={!this.state.showForm ? {} : { display: 'none' }} onClick={this.showForm}><span className="plus">+</span> Add task</label>
        <form id="add-new-task"  style={this.state.showForm ? {} : { display: 'none' }}>
          <input type="text" name="name" value={this.state.name} onChange={this.onNameChange} placeholder=' Enter the name of the task' />
          <input type="text" name="deadline" value={this.state.deadline} onInput={this.onDeadlineChange} ref={this.textInput} placeholder='Deadline' />

          <button className="submit" onClick={this.onSubmit}>Submit</button>
          <button className="cancel" onClick={this.onCancel}>Cancel</button>
        </form>
      </React.Fragment>
    );
  }
}
