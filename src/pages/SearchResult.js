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
            galleryModal: false,
            menuModal: false,
            menu: [],
            formModal: false
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
        console.log(resId);

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

    // Adding number of elements
    addItems = (index, operationType) => {
        var total = 0;
        const items = [...this.state.menu];
        const item = items[index];

        if(operationType == 'add'){
            item.qty += 1;
        } else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;
        })
        this.setState({ menu: items, subtotal: total })
    }

     // Payment
     initPayment = (data) => {
        const options = {
            key: "rzp_test_NhWj6TG94gioZu",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async(response) => {
                try{
                    
                    const verifyLink = "http://localhost:8000/api/payment/verify";
                    const {data} = await axios.post(verifyLink, response);

                } catch (error) {
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    handlePayment = async() => {
        const { subtotal } = this.state;

        try{
            const orderLink = "http://localhost:8000/api/payment/orders";
            const { data } = await axios.post(orderLink, { amount: subtotal });

            this.initPayment(data.data);

        } catch (error) {
            console.log(error);
        }
    }



    // selectRestaurant = (ss) => {
    //     this.props.navigate(`/searchImage?restuarant=${ss}`);
    // }
          render(){
            const { restaurant, galleryModal, menuModal, menu, subtotal, formModal } = this.state;
            console.log(menu);
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
                        <div className="container" style={{width: "961px;" ,  margin: "auto;", paddingBottom : "60px"}}>     
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
                            <button id="place_order_button" onClick={() => this.handleModal('menuModal', true)}>Place Online Order</button>
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
                            <div onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-lg closegallery"></i></div>
                            <div>
                            <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                                <div>
                                    <img src={restaurant.thumb} className="gallery_img" />
                                </div>
                            </Carousel>
                            </div>
                      </Modal>


                      <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('menuModal', false)}><i class="bi bi-x-lg closeMenu"></i></div>
                    <div>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        {/* Menu Item */}
                        { menu?.map((item, index) => {
                            console.log(item)
                            return(
                                
                                <div className="menu">
                                    <div className="menu_body">
                                    <div id="sign-outerpart">
                                        <div id="sign-innerpart"></div>
                                    </div>
                                        <h5 className="font_weight">{item.name}</h5>
                                        <h5 className="font_weight">₹ {item.price}</h5>
                                        <p className="item_details">{item.description}</p>
                                    </div>

                                    <div className="menu_image">
                                        <img className="item_image" src={`./images/${item.image}`} alt="food" />
                                        {/* <img className="item_image" src="./images/1.png" alt="food" /> */}
                                        {
                                            item.qty == 0 ? <div className="item_quantity_button" onClick={() => this.addItems(index, 'add')}>
                                                ADD
                                            </div> :
                                            <div className="item_quantity_button">
                                                <button  onClick={() => this.addItems(index, 'sub')}> - </button>
                                                <span className="qty"> {item.qty} </span>
                                                <button onClick={() => this.addItems(index, 'add')} style={{color: '#61B246'}}> + </button>
                                            </div>
                                        }
                                        
                                    </div>
                                </div>
                            )
                        })}
                        

                        {/* Payment Details */}
                        <div className="payment">
                            <h4 className="total font_weight">Subtotal: ₹ {subtotal}</h4>
                            <button className="btn btn-danger payment_button" onClick={() => {this.handleModal('menuModal', false); this.handleModal('formModal', true);}}>
                                Pay Now
                            </button>
                        </div>

                    </div>
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('formModal', false)}><i class="bi bi-x-lg closeForm"></i></div>
                    <div style={{ width: '24em' }}>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        <label htmlFor="name" className='label-text' style={{ marginTop: '10px' }}>Name</label>
                        <input type="text" placeholder="Enter your name" style={{ width: '100%'}} className="form-control input-text" id="name" />

                        <label htmlFor="mobile" className='label-text' style={{ marginTop: '10px' }}>Mobile Number</label>
                        <input type="text" placeholder="Enter mobile number" style={{ width: '100%'}} className="form-control input-text" id="mobile" />

                        <label htmlFor="address" className='label-text' style={{ marginTop: '10px' }}>Address</label>
                        <textarea type="text" rows="4" placeholder="Enter your address" style={{ width: '100%'}} className="form-control input-text" id="address">
                        </textarea>

                        <button className="btn btn-success" style={{ float: "right", marginTop: "18px" }} onClick={this.handlePayment}>Proceed</button>
                    </div>
                </Modal>


                           
            </div>
             
                       
                       

             )


            


          }

            

}

 

               

export default navHook(searchResult);