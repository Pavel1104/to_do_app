class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#FFFFFF',
      showForm: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    this.props.handleFormSubmit(this.state.name, this.state.color);
    this.clearForm();
  }
  onColorChange(event){
    this.setState({color: event.target.value});
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
      color: '#FFFFFF',
      showForm: false,
    })
  }

  showForm(){
    this.setState({showForm: true});
  }

  handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 27) {
      this.clearForm();
    } else if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }

  render() {
    return (
      <React.Fragment>
        <label className="show-form-add-project" style={this.state.showForm ? {display: 'none'} : {}} onClick={this.showForm}><span className="plus">+</span> Add project</label>
        <form id="add-new-project"  style={this.state.showForm ? {} : { display: 'none' }}>
          <input type="color" name="color" value={this.state.color} onChange={this.onColorChange} onKeyUp={this.handleKeyUp} />
          <input type="text" name="name" value={this.state.name} onChange={this.onNameChange} onKeyUp={this.handleKeyUp} placeholder='Project' />

          <button className="submit" onClick={this.onSubmit}>Submit</button>
          <button className="cancel" onClick={this.onCancel}>Cancel</button>
        </form>
      </React.Fragment>
    );
  }
}
