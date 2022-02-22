import React from 'react'
import RenderNotepadDetail from './render'
import { withRouter } from "react-router";
import {ApiUrl} from '../../baseApiUrl'


class NotepadDetail extends React.Component {

    state = { 
        
        note : {
            id : this.props.match.params.noteId,
            title : "---",
            text : "---"
        }
    }

    componentDidMount(){

        let note = {...this.state.note}

        ApiUrl.get("notepad/user-notes/"+note.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({
                note:res.data.Note
            })
        })


    }

    handleNoteChange = (event, editor=null) =>{

        let note = {...this.state.note}

        if (editor !== null){
            let data = editor.getData()
            note.text = data
        }
        else{
            note.title = event.target.value
        }
        this.setState({
            note:note
        })

    }

    handleNoteSave = () =>{

        let note = {...this.state.note}
        ApiUrl.put("notepad/user-notes/"+note.id+"/",note)
        .catch((err) => console.log(err))

        this.props.handleAlertMessage("Saved","success")
    }

    render() { 
        return ( <RenderNotepadDetail 
        state = {this.state}
        handleNoteChange = {this.handleNoteChange}
        handleNoteSave = {this.handleNoteSave}
        /> );
    }
}
 
export default withRouter(NotepadDetail);