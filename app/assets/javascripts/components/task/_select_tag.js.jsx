class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let options = this.state.options.map((item) => {
      return(
        <React.Fragment key={item}>
          <option value={item}>item</option>
        </React.Fragment>
      )
    })

    return(
      <select value={this.state.value} onChange={this.handleChange}>
        {options}
      </select>
    )
  }
}

  // <select value={this.state.value} onChange={this.handleChange}>
  //   <option value="grapefruit">Grapefruit</option>
  //   <option value="lime">Lime</option>
  //   <option value="coconut">Coconut</option>
  //   <option value="mango">Mango</option>
  // </select>
