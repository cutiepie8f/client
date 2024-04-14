import React from "react";
import Modal from 'react-modal';
import '../style/header.css';

const customStyles = {
    overlay:{
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            loginModal: false
        }
    }

    // For Modal
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    google = () => {
        window.open("http://localhost:8000/auth/google", "_self");
    }

    logout = () => {
        window.open("http://localhost:8000/auth/logout", "_self");
    }

    render(){
        const { loginModal } = this.state;
        const {user} = this.props;
        return(
            <div>            
             <div className="position-absolute end-0 me-5 z-3 mt-4">

                        {console.log(user)}
                        {!user ? (
                            <form class="d-flex nav-form">
                                <button type="button" class="btn text-white fs-4 me-2" onClick={() => {this.handleModal('loginModal', true)}}>Login</button>
                                <button type="button" class="btn btn-outline-light create-account fs-5">Create an account</button>
                            </form>
                        ) : (
                            <form class="d-flex nav-form">
                                <img src={user.photos[0].value} className="circle" />
                                <p className="text-white m-3">{user.displayName}</p>
                                <button type="button" class="btn btn-outline-light logout" onClick={this.logout}>Logout</button>
                            </form>
                        )}
                        
                        {/* my modal */}
                        {/* {console.log(user)}
                        {!user ? (
                              <div  id="signup">
                              <a href="#" class="link-underline-light signup-decoration">
                                 <div id="login-modal" onClick={() => {this.handleModal('loginModal', true)}}>Login</div>
                                 <i class="bi bi-x-lg"></i>
                             </a>
                              
                             <a href="#" class="link-underline-light">
                                 <div id="modal-box">
                                     <div id="gmail-logo">
                                         <img src="./images/signup.png"  width= {"29px"} height={"22px"}/>
                                         </div>
                                         <span id="gmail-text">Continue with Gmail</span>
                                  </div>
                              </a>
                              
                              <a href="#" class="link-underline-light">
                                 <div id="modal-box" style={{marginTop: "22px;"}}>
                                     <div id="facebook">f</div>
                                     <span id="facebook-text">Continue with Facebook</span>
                                </div>
                              </a>
                 
                              <hr id="modalLine"/>
                              <a href="#" class="link-underline-light login-decoration">
                                 <span id="modal-footerPart">Don’t have account? </span>
                                 <span style={{color: "#ED5A6B"}}>Sign UP</span>
                              </a>
                         </div>
                        ) : (
                            <form class="d-flex nav-form">
                                <img src={user.photos[0].value} className="circle" />
                                <p className="text-white m-3">{user.displayName}</p>
                                <button type="button" class="btn btn-outline-light logout" onClick={this.logout}>Logout</button>
                            </form>
                        )} */}

        
                <Modal
                    isOpen={loginModal}
                    style={customStyles}

                    
                >
           
                    <div>
                        <h4 style={{color: "#192F60;" }}  id="login-modal">Login</h4>
                        <div onClick={() => this.handleModal('loginModal', false)} ><i class="bi bi-x-lg close"></i></div>
                    </div>
                    
                    <div>
                        <div className="m-5">
                            {/* <input type="button" className="btn btn-outline-success px-4 " value="GOOGLE" onClick={this.google} /> */}
                            <a href="#" class="link-underline-light">
                                 <div id="modal-box" onClick={this.google}>
                                     <div id="gmail-logo">
                                         <img src="./images/signup.png"  width= {"29px"} height={"22px"}/>
                                         </div>
                                         <span id="gmail-text">Continue with Gmail</span>
                                  </div>
                              </a>
                              
                              <a href="#" class="link-underline-light">
                                 <div id="modal-box" style={{marginTop: "22px;"}}>
                                     <div id="facebook">f</div>
                                     <span id="facebook-text">Continue with Facebook</span>
                                </div>
                              </a>
                              <hr id="modalLine"/>
                              <a href="#" class="link-underline-light login-decoration">
                                 <span id="modal-footerPart">Don’t have account? </span>
                                 <span style={{color: "#ED5A6B"}}>Sign UP</span>
                              </a>
                        
                        </div>
                    </div>
                </Modal>
                
                </div> 
            </div>
        )
    }
}

export default Header;