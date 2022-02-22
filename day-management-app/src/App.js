
import Footer from "./components/home_app_comps/footer/evh"
import Header from "./components/home_app_comps/header/evh"
import Home from "./components/home_app_comps/home/evh"

import DayTasks from './components/todo_app_comps/day_tasks/evh'
import LongTermTasks from "./components/todo_app_comps/long_term_tasks/evh"
import RandomTasks from './components/todo_app_comps/random_tasks/evh'

import DaySpendEarn from "./components/wallet_app_comps/day_spend_earn/evh"
import SpendingsPlan from './components/wallet_app_comps/spend_plans/evh'
import SpendPlansDetail from './components/wallet_app_comps/spend_plans_detail/evh'

import DayCalories from './components/health_app_comps/day_calories/evh'
import FoodSearch from './components/health_app_comps/food_search/evh'
import FoodDetail from './components/health_app_comps/food_detail/evh'

import GoalsMain from './components/goals_app_comps/goals_main/evh'
import GoalDetail from './components/goals_app_comps/goal_detail/evh'

import NotepadMain from './components/notepad_app_comps/notepad_main/evh'
import NotepadDetail from './components/notepad_app_comps/notepad_detail/evh'

import DaySpendsActivity from './components/preformance_app_comps/day_spends_act/evh'
import DayCaloriesActivity from './components/preformance_app_comps/day_calories_act/evh'
import DayTasksActivity from './components/preformance_app_comps/day_tasks_act/evh'

import Login from './components/accounts_app_comps/login/evh'
import Register from './components/accounts_app_comps/register/evh'
import Profile from './components/accounts_app_comps/profile/evh'
import Contact from './components/accounts_app_comps/contact/evh'

import {BrowserRouter as Router, Switch, Route , Redirect } from 'react-router-dom'
import ScrollToTop from './scroll_to_top'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import { is_auth } from './abstraction/general'

function App() {
  const handleAlertMessage = (message,type)=>{

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

  const get_today = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return  yyyy + '-' + mm + '-' + dd;
  }

  const DateCheck = (idate) => {

    if(idate===get_today()){ return 0}
    var today = new Date(get_today()).getTime(),
        idate = idate.split("-");
    
    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();

    if(today - idate===0){return 0}
    return (today - idate) < 0 ? 1 : -1;
  }
  return (
    <>
    <ReactNotification/>
    <Header handleAlertMessage={handleAlertMessage}/>
    
      <Router>
        <ScrollToTop />
        
          <Switch >

            <Route path="/todo/random-tasks" component={() => 
              is_auth()? <RandomTasks handleAlertMessage={handleAlertMessage}/>:
              <Redirect to="/login" />}
            />
            <Route path="/todo/day-tasks/:date" component={() => 
              is_auth()? <DayTasks  get_today={get_today} handleAlertMessage={handleAlertMessage} DateCheck = {DateCheck}/>:
              <Redirect to="/login" />} 
            />

            <Route path="/todo/long-term-tasks" axact component={() => 
              is_auth()?<LongTermTasks get_today={get_today}/>:
              <Redirect to="/login" />} 
            />



            <Route path="/wallet/spending-plans/:planId" component={() => 
              is_auth()?<SpendPlansDetail handleAlertMessage={handleAlertMessage}/>:
              <Redirect to="/login" />}
            />

            <Route path="/wallet/spending-plans" exact component={() => 
              is_auth()?<SpendingsPlan handleAlertMessage={handleAlertMessage}/>:
              <Redirect to="/login" />} 
            />

            <Route path="/wallet/day-spendings-earnings/:date" component={() => 
              is_auth()?<DaySpendEarn get_today={get_today} handleAlertMessage={handleAlertMessage} DateCheck = {DateCheck}/>:
              <Redirect to="/login" />
            }
            />



            <Route path="/health/day-calories/:date" component={() => 
              is_auth()?<DayCalories get_today={get_today} handleAlertMessage={handleAlertMessage} DateCheck = {DateCheck}/>:
              <Redirect to="/login" />}
            />

            <Route  path="/health/food-search/:foodId" component={()=> 
              <FoodDetail handleAlertMessage={handleAlertMessage} is_auth={is_auth} get_today={get_today}/>
              } 
            />

            <Route  path="/health/food-search/" exact component={()=> 
              <FoodSearch handleAlertMessage={handleAlertMessage} />
              } 
            />



            <Route path="/goals/:goalId" axact component={() => 
              is_auth()?<GoalDetail handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />

            <Route path="/goals" axact component={() => 
              is_auth()?<GoalsMain handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />



            <Route path="/notepad/:noteId" axact component={() => 
              is_auth()?<NotepadDetail handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />

            <Route path="/notepad" axact component={() => 
              is_auth()?<NotepadMain handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />



            <Route path="/performace/days-spends-earns-activity" axact component={() => 
              is_auth()?<DaySpendsActivity handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />

            <Route path="/performace/days-calories-activity" axact component={() => 
              is_auth()?<DayCaloriesActivity handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />

            <Route path="/performace/days-tasks-activity" axact component={() => 
              is_auth()?<DayTasksActivity handleAlertMessage={handleAlertMessage} />:
              <Redirect to="/login" />}
            />



            <Route path="/login" axact component={() => 
              <Login handleAlertMessage={handleAlertMessage} />
              }
            />

            <Route path="/register" axact component={() => 
              <Register handleAlertMessage={handleAlertMessage} />
              }
            />

            <Route path="/contact" axact component={() => 
              <Contact handleAlertMessage={handleAlertMessage} />
              }
            />

            <Route path="/profile" axact component={() => 
              is_auth()? <Profile handleAlertMessage={handleAlertMessage} />
              :
              <Login handleAlertMessage={handleAlertMessage} />
              }
            />
            
            
            <Route path="/" axact component={() => <Home get_today={get_today} />}/>
            
          </Switch>
      
      </Router>
    <Footer/>

    </>
  );
}

export default App;
