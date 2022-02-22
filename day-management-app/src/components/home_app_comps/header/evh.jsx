import React from 'react'
import { is_auth } from '../../../abstraction/general'
import {ApiUrl} from '../../baseApiUrl'
import { Navbar , Nav , NavDropdown } from 'react-bootstrap'


class Header extends React.Component {
    state = {  }

    handleLogout = () =>{

        ApiUrl.get("accounts/logout/")
        .then( res => {

            localStorage.clear()
            this.props.handleAlertMessage("Logged out","success")

            window.location.href="/"
            
        })
    }
    render() { 

        const font = {
            color:'white'
        }
        return ( 
            <>
            <Navbar bg="dark" expand="lg" >
                <Navbar.Brand href="/" className="ml-2" style={font}>DayManagementApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/" style={font}>Home</Nav.Link>

                    { is_auth()?<Nav.Link onClick={this.handleLogout} style={font}>Logout</Nav.Link>:
                    <Nav.Link href="/login" style={font}>Login</Nav.Link>}

                    <Nav.Link href="/profile" style={font}>Profile</Nav.Link>
                    <Nav.Link href="/contact" style={font}>Report</Nav.Link>
                    
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
            <br/><br/>
            </>

         );
    }
}
 
export default Header ;