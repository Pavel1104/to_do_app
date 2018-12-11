class Task extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.textInput = React.createRef();
  }

  handleEdit(){
    if(this.state.editable){
      let name = this.name.value
      let deadline = this.deadline.value
      let id = this.props.task.id
      let task = {id: id, name: name, deadline: deadline}
      this.props.handleUpdate(task)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
    let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.task.name}/>:<h2>{this.props.task.name}</h2>
    let deadline = this.state.editable ? <input type='text' ref={input => this.deadline = input}  defaultValue={this.props.task.deadline}/>:<p>{this.props.task.deadline}</p>
    return(
      <div>
        {name}
        {deadline}
        <button onClick={() => this.handleEdit()} >{this.state.editable? 'Submit' : 'Edit'}</button>
        <button onClick={() => this.props.handleDelete(this.props.task.id)}>Delete</button>
      </div>
    )
  }
}
