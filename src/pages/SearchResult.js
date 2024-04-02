import React from 'react';
import '../style/searchResult.css';
import axios from 'axios';
import queryString from 'query-string';
import navHook from "./nav";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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


class searchResult extends React.Component{
    constructor(){
        super();
        this.state ={
            restaurant : [],
            resId: undefined,
            galleryModal: false
        }
     }
     componentDidMount(){
        const q = queryString.parse(window.location.search);
        const { restuarant } = q;
        console.log(restuarant);
        //location API
        axios({
            url : `http://localhost:8000/restraunts/${restuarant}`,
            method : 'get',
            headers : {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ restaurant : res.data.restraunts, resId: restuarant})
        })
        .catch((err => console.log(err)));

    }

     // For Modal
     handleModal = (state, value) => {
        const {resId} = this.state;

        if(state == "menuModal" && value == true){
            axios({
                url: `http://localhost:8000/menu/${resId}`,
                method: 'get',
                headers: { 'Content-Type': 'application/JSON'}
            })
            .then( res => {
                this.setState({ menu: res.data.menu })
            })
            .catch((err => console.log(err)))
        }

        this.setState({ [state]: value });
    }

    // selectRestaurant = (ss) => {
    //     this.props.navigate(`/searchImage?restuarant=${ss}`);
    // }
          render(){
            const { restaurant, galleryModal, menuModal, menu, } = this.state;
            console.log(galleryModal);
             return(
                <div>
                    
                        <div id="header">
                            {/* <!--header part--> */}
                            <div id="headerPart">
                                <div id="logo">
                                    <label id="logo_name">e!</label>
                                </div>
                                <a href="">
                                    <div id="loginButton">
                                        <h2 id="login_text">Login</h2>
                                    </div>
                                </a>
                                </div>
                                <div id="createAccount">
                                    <button id="create_account-text">Create an account</button>
                                </div>
                        </div>
               
                        {/* <!--header part complete--> */}
                        <div className="container" style={{width: "961px;" ,  margin: "auto;"}}>     
                            {/* <!--background image--> */}
                            <div id="background_image">
                                <img src={restaurant.thumb} className="coverImg"/>
                               
                                    <div id="image_gallery_button">
                                        <button id="image_gallery_text" onClick={() => this.handleModal('galleryModal', true)} >Click to see Image Gallery</button>
                                    </div>
                                
                            </div>
                            {/* <!--background image done--> */}
                            
                            {/* <!--restraunt name heading--> */}
                            <div id="restaurant-name">
                          
                                     <h2 id="text-2">{restaurant.name}</h2>
                                    
                                
                            </div>
                            {/* <!--done--> */}
                
                            {/* <!--Place order button--> */}
                            <div id="place_order">
                            <button id="place_order_button">Place Online Order</button>
                            </div>
                            {/* <!--end--> */}
                             

                            <div className="footer-part">
                                <div className="tabs">
                                        <div className="tab">
                                            <input type="radio" className="" id="tab-1" name="tab-group" checked />
                                            <label className="radiotext" htmlFor="tab-1">Overview</label>

                                            <div className="content">
                                                <div className="about">About this place</div>

                                                <div className="head">Cuisine</div>
                                                <div className="value">
                                                    {restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cu => `${cu.name}, `)}
                                                </div>

                                                <div className="head">Average Cost</div>
                                                <div className="value">₹{restaurant.cost} for two people (approx.)</div>
                                            </div>
                                        </div>

                                        <div className="tab ms-4">
                                            <input type="radio" className="" id="tab-2" name="tab-group" />
                                            <label htmlFor="tab-2" className="radiotext">Contact</label>

                                                <div className="content">

                                                        <div className="value">Phone Number</div>
                                                        <div className="value-red">+91 {restaurant.contact_number}</div>

                                                        <div className="head">{restaurant.name}</div>
                                                        <div className="value">{restaurant.address}</div>
                                                </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                           {/* <!--done-->    */}
                    

                        <Modal
                            isOpen={galleryModal}
                            style={customStyles}
                        >
                            <div onClick={() => this.handleModal('galleryModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                            <div>
                            <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                                <div>
                                    <img src={restaurant.thumb} className="gallery_img" />
                                </div>
                            </Carousel>
                            </div>
                      </Modal>

                           
            </div>
             
                       
                       

             )


            


          }

            

}

 

               

export default navHook(searchResult);