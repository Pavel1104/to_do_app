const NewTask = (props) => {
  let formFields = {}

  return(
    <form onSubmit={ (e) => {
        e.preventDefault();
        props.handleFormSubmit(formFields.name.value, formFields.deadline.value);
        e.target.reset();
      }
    }>
      <input ref={input => formFields.name = input} placeholder='Enter the name of the task'/>
      <input ref={input => formFields.deadline = input} placeholder='Enter a deadline' />
      <button>Submit</button>
    </form>
  )
}
