import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function RenderNotepadDetail(props){
    
    const state = props.state
    
    return ( 
        
        <div className="container">


            Title:
            <input type="text" className="form-control" onChange={props.handleNoteChange} value={state.note.title}/>

            <br/>
            
            Note:
            <CKEditor
                editor={ClassicEditor}
                data={state.note.text}
                onChange={(event,editor) => props.handleNoteChange(event,editor)}
                
               
            />
            <br/>
            <hr/>
            <br/>
            <button className="btn btn-success" onClick={props.handleNoteSave}>Save</button>
        </div>
     )
}