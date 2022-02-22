
import axios from 'axios'
import { store } from 'react-notifications-component'


function handleAlertMessage(message,type){

    store.addNotification({
        title:"",
        message:message,
        type:type,
        container:"top-center",
        animationIn:['animated','fadeIn'],
        animationOut:['animated','fadeOut'],

        dismiss:{
            duration:1000
        }
    })
}


function formValidationCheck(formData){

    let field = null

    for ( let key in formData ){

        if( formData.[key]===""){ 
            field = key
            break
        }
    }

    return field? field+" is required":null


}

function formRespondCheck(res){


    if( res ){

        let dataList = res.data
        let lengthCheck = 0
        let c = 1

        for( let key in dataList){
            
            let value = res.data.[key]
            
            lengthCheck += Array.isArray(value)?1:0

            if(lengthCheck>0 && lengthCheck === c){

                return handleAlertMessage(key+" : "+value[0],"danger")
            }
            else{
                break
            }

            c+=1

        }

    }

    else{

        return null

    }

    return true


}



function filterState(objects,Wanted){

    objects = objects.filter( object=> {
        return object!== Wanted? object: null
    })

    return objects


}




function sendRequest(){

    axios({

        method : 'get',

        url : "https://md-be-db-758.herokuapp.com/api/accounts/profile/",

        headers :{
            Authorization : "Token "+localStorage.getItem("Token")
        }
        

    })
    .catch(err => { console.log(err)})
    .then( res => {
        if(res){
            localStorage.setItem('user',res.data.username)
        }
        else {
            localStorage.setItem('user',"not-auth")
        }

    })

 

}


function is_auth(){

    sendRequest()
    
    let auth = localStorage.getItem('user')

    if ( auth ){
        return auth !== "not-auth"? true : false
    }

    return false
}



export{ handleAlertMessage , formValidationCheck , formRespondCheck , filterState , is_auth }