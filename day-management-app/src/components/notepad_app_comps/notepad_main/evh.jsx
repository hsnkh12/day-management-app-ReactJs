import React from 'react'
import RenderNotepad from './render'
import {ApiUrl} from '../../baseApiUrl'



class NotepadMain extends React.Component {
    state = { 
        notes : [],
        isLoading : true,
    }

    componentDidMount(){

        ApiUrl.get("notepad/user-notes/")
        .catch((err) => console.log(err))
        .then((res) => {

            this.setState({
                notes : res.data.Notes,
                isLoading : false,
            })
        })

    }

    handleNoteCreate = ()=>{

        let body = {
            title:"---",
            text:"---"
        }

        ApiUrl.post("notepad/user-notes/",body)
        .catch((err) => console.log(err))
        .then((res) => {

            const link = "/notepad/"+res.data.id
            window.location.href = link
        })


    }

    handleNoteDelete = (Wanted) =>{

        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("notepad/user-notes/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let notes = this.state.notes

            notes = notes.filter( note => {
                return note !== Wanted? note : null
            })

            this.setState({notes:notes})
            this.props.handleAlertMessage("Note deleted","success")

            
        })

    }
    render() { 
        return ( <RenderNotepad 
        state = {this.state}
        handleNoteCreate = {this.handleNoteCreate}
        handleNoteDelete = {this.handleNoteDelete}
        /> 
        
        );
    }
}
 
export default NotepadMain;