import Loading from '../../reuseable_comps/all_loadings/laoding/render'

export default function TaskForm(props){

    return ( 
        <div>

            <div className="form-group">
                <label>Task : </label>
                <input type="text" onChange={props.handleFormChange} className="form-control" placeholder="Add Task" name="text" required/>
            </div>

            <br/>

            <div className="form-group">
                <label>Time : &nbsp;</label>
                <input type="time" onChange={props.handleFormChange} className="form-control" name="time" required/>
            </div>

            <br/>

            <label>
                Important : &nbsp;
                <input type="checkbox" onChange={props.handleFormChange} className="form-check-input" name="important"/> 
            </label>
            
            <br/>
            <br/>
            <button className="btn btn-default bg-success" style={{color:'white'}} type="button" onClick={props.handleFormSubmit}>
                { props.formLoading ? <Loading /> : "Add"}
            </button>
        </div>
     )
}