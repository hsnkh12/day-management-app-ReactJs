

function Footer (props){


   return (
     <>
     <br/><br/>
     <footer class="footer bg-dark" >
            <div class="container">
                <div class="row-">
                    <div class="footer-col">
                        <h4>Goal</h4>
                        <ul>
                            <p style={{color:'white'}}>Manage all your days</p>
                            <p style={{color:'white'}}>Track all your works, tasks and goals</p>
                            <p style={{color:'white'}}>Have a healthy and active life</p>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">Documentaion (soon)</a></li>
                            <li><a href="#">Report for a problem</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Developer</h4>
                        <ul>
                            <li><a href="#">About me (My website soon)</a></li>
                            <li><a href="/contact">Contact me directly</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>follow me</h4>
                        <div class="social-links">
                            <a href="https://www.instagram.com/hassan.elabdulah/"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
       </footer>
    
    </>

   );
    
}
 
export default Footer ;