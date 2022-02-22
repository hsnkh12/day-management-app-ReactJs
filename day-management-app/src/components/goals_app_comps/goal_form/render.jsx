import Loading from '../../reuseable_comps/all_loadings/laoding/render'

export default function GoalForm(props){

    return ( 
        <div>

            <div className="form-group">
                <label>Goal Title : </label>
                <input type="text" onChange={props.handleFormChange} className="form-control" placeholder="Add Title" name="title" required/>
            </div>

            <br/>
            <div className="form-group">
                <label>Target Hours : </label>
                <input type="number" onChange={props.handleFormChange} className="form-control" placeholder="Max is 20 hours" name="target_hours" required/>
            </div>
            <br/>
            <button className="btn btn-default bg-success" style={{color:'white'}} type="button" onClick={props.handleFormSubmit}>
                {props.formLoading ? <Loading /> : "Add"}
                </button>
        </div>
     )
}