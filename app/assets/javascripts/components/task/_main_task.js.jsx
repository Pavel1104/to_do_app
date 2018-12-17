const MainTask = (props) => {
  return(
    <React.Fragment>
      <HeaderTask />
      <BodyTasks showArchivedTasks={props.showArchivedTasks}/>
    </React.Fragment>
  )
}
