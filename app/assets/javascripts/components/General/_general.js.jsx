class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchivedTasks: false,
    };
    this.onArciveClick = this.onArciveClick.bind(this);
  }

  onArciveClick(){
    this.setState({
      showArchivedTasks: !this.state.showArchivedTasks,
    })
  }

  render(){
    return(
      <React.Fragment>
        <header className="navbar navbar-fixed-top">
          <div className="logo">
            <i className="fas fa-mug-hot"></i>
          </div>
          <div className="user-name">
            <p>Hi, user</p>
          </div>
          <div className={`archived-tasks ${this.state.showArchivedTasks ? "hide-tasks" : "show-tasks"}`}>
            <i className="fas fa-trophy" onClick={this.onArciveClick}></i>
          </div>
        </header>

        <aside id="sidebar">
          <section id="projects">
            <MainProject />
          </section>
        </aside>

        <div id="main-tasks">
          <MainTask showArchivedTasks={this.state.showArchivedTasks} />
        </div>
      </React.Fragment>
    )
  }
}
