const AllProjects = (props) => {
  let projects = props.projects.map((project) => {
    return(
      <li key={project.id}>
        <Project project={project} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
      </li>
    )
  })
  return(
    <React.Fragment>
      <ul className="project-list">
        {projects}
      </ul>
    </React.Fragment>
  )
}
