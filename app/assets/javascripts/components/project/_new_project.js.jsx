class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#FFFFFF',
      showForm: false,
      disabledSubmitButton: true,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.generateColor = this.generateColor.bind(this);
    this.validate = this.validate.bind(this);
  }

  generateColor(){
    let arr = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f'];
    let color = '#';
    for (let index = 0; index < 6; index++) {
      color +=  arr[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  validate(){
    if (this.state.name != '' && this.state.color != '') {
      this.setState({disabledSubmitButton: false});
    } else {
      this.setState({disabledSubmitButton: true});
    }
  }

  onSubmit(event){
    event.preventDefault();
    this.props.handleFormSubmit(this.state.name, this.state.color);
    this.clearForm();
  }
  onColorChange(event){
    fetch( this.setState({color: event.target.value}) )
    .then(() => { this.validate() });
  }
  onNameChange(event) {
    fetch( this.setState({name: event.target.value}) )
    .then(() => { this.validate() })
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
    this.setState({
      showForm: true,
      color: this.generateColor(),
    });
  }

  handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 27) {
      this.clearForm();
    } else if (event.keyCode === 13) {
      try {
        if ( !this.state.disabledSubmitButton ) {
          this.onSubmit(event);
        }
      } catch (error) {}
    }
  }

  render() {
    return (
      <React.Fragment>
        <label className="show-form-add-project" style={this.state.showForm ? {display: 'none'} : {}} onClick={this.showForm}><span className="plus">+</span> Add project</label>
        <form id="add-new-project"  style={this.state.showForm ? {} : { display: 'none' }}>
          <input type="color" name="color" value={this.state.color} onChange={this.onColorChange} onKeyUp={this.handleKeyUp} />
          <input type="text" name="name" value={this.state.name} onChange={this.onNameChange} onKeyUp={this.handleKeyUp} placeholder='Project' />

          <button className="submit" disabled={this.state.disabledSubmitButton? true : false} onClick={this.onSubmit}>Submit</button>
          <button className="cancel" onClick={this.onCancel}>Cancel</button>
        </form>
      </React.Fragment>
    );
  }
}
