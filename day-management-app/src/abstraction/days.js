import {handleAlertMessage} from './general'
import {ApiUrl} from '../components/baseApiUrl'

function creationAllowed(check){

    return (check===-1 || check === 1)?
    {
        create : "False",
        start : "False"
    }:

    {
        create : "True",
        start : "True"
    }

}


function dayRespondCheck(res,check){
    


    if ( res ){

        if(res.data.detail || res.data.Error){
        
            return handleAlertMessage("Something went wrong, try again","danger")

        }
    }

    else{

        if(check === -1){

            return handleAlertMessage("Something went wrong, try again","danger")

        }
        else{

            return false

        }
    }

    return true

}



function daySendRequest( url , date , check ){

    let conditions = creationAllowed(check)

    return ApiUrl.get(
            url+"?"+
            "date="+date+
            "&if_not_create="+conditions.create+
            "&start="+conditions.start
        )
        .catch( err => {} )

}



function get_last_week(days){
    return days.length < 7? days : days.slice(0,7)
}


export { creationAllowed , dayRespondCheck , get_last_week , daySendRequest }