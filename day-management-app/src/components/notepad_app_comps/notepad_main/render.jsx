import React from 'react'
import CardList from '../../reuseable_comps/card_list/render'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'

export default function RenderNotepad(props){
    const state = props.state
    const addBtn = <button className="btn btn-success" onClick={props.handleNoteCreate}>Add Note</button>

    return ( 
        <div className="container" href="#1">


            <CardList 
            inputs={["Your notes","",addBtn]}
            bg = {"light"}          
            />

            <br/><hr/><br/>

            {       state.isLoading?
                    <ListLoading />
                    :

                    state.notes.length>0?
                    
                    state.notes.map( note => 
                <>

                    <CardList 
                        inputs={[note.title,note.date,<button className="btn btn-danger" onClick={()=>props.handleNoteDelete(note)} >Delete</button>]} 
                        link = {"/notepad/"+note.id}       
                    />
                    <br/>


                </>) 
                :
                <EmptyList />
                
            }


        </div>
     )
}