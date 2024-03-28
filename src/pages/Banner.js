import React from 'react';
import axios from 'axios';
import navHook from "./nav";

class Banner extends React.Component{

    constructor(){
        super();
        this.state ={
            restaurant: [],
            inputText: undefined, 
            suggestion: []
        }
    }

    handleLocation = (e) => {
        const location = e.target.value;
        //sessionStorage.setState('location', location);

        axios({
            url: `http://localhost:8000/rest/${location}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ restaurant: res.data.restaurants })
        })
        .catch((err => console.log(err)))

    }

    handleInput = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestion = [];
        console.log(restaurant);
        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestion });
    }

    showSuggestion = () => {
        const { inputText, suggestion } = this.state;

        if(suggestion.length == 0 && inputText == undefined){
            return null;
        }

        if(suggestion.length > 0 && inputText == ''){
            return null;
        }

        if(suggestion.length == 0 && inputText){
            return (
                <li className="textColor">No Results Found !!</li>
            )
        }

        return(
            suggestion.map((item, index) => (
                <li key={index} className="suggList" onClick={() => this.selectRestaurant(item._id)}>
                    <img src={ item.thumb } className="suggImg" />         {/* restaurant image */}
                    <span className="suggName">{item.name}</span>   {/* restaurant name */}
                    <span className="suggLoc">{item.address}</span>   {/* restaurant Location */}
                   
                </li>
            ))
        )
    }

    selectRestaurant = (ss) => {
        this.props.navigate(`/details?restuarant=${ss}`);
    }

    
   render(){
       const {locationData} = this.props;
       //console.log(locationData);
        return(
              
                    <div>
                          <div id="background">
                            <div style= {{width:"1469px; margin-left: 18px; height: 500px;"}}>
                            <div class="row rowspart">
                                <div class="col-8 "></div>
                                <div class="col-3">
                                    <nav id="navigation_bar">
                                        {/* <!--login and create account button--> */}
                                        <div>
                                        <button type="button" class="me-4" id="login">Login</button>
                                        </div>
                                        <div>
                                        <button type="button" id="create_account" class="btn btn-outline-light">Create an account</button>
                                    </div>
                                    {/* <!--done--> */}
                                </nav>
                                {/* <!--navigation done--> */}
                                </div>
                               
                                {/* <!--coloumn-1--> */}
                                <div class="col-1"></div>
                        </div>
                            {/* <!--navigation row-1 done--> */}
                            {/* <!--logo start--> */}
                            <div class="row rowspart">
                                <div class="col-5"></div>
                                <div class="col-2">
                                <div class="logo">
                                    <div class="logo-text">e!</div>     
                                </div>
                                </div>
                                <div class="col-5"></div>
                        </div>  
                        {/* <!--logo row-2 done--> */}
                        {/* <!--heading start--> */}
                        <div class="row rowspart">
                            <div class="col-3"></div>
                                <div class="col-6" style= {{blocksize: "109px;"}}>
                                <h2 class="main-text">Find the best restaurants, cafés, and bars</h2>
                            </div>
                        </div>
                        {/* <!--main text row-3 done--> */}
                        {/* <!--row-4 start--> */}
                        <div class="row rowspart">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <div>
                                    {/* <!-----------------location dropdown-------------------> */}
                                    {/* <div class = "ui-widget">
                                        <input type="text" placeholder="Search for locations" id = "autocmplete-1"  class="location" oninput="openDropdown()"/>
                                    </div> */}


                                    <div>
                                    <select class="form-select form-select-sm selected-location location" style= {{display: "inline-block;"}} aria-label="Small select example" onChange={this.handleLocation}>
                                            <option value="0" selected disabled>Please type a location</option>
                                            {
                                                locationData?.map((item) =>{
                                                    return(
                                                        <option value={item.city_id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                           
                                            
                               
                                    </select>

                                    </div>

                                

                                    
                                        
                                    {/* <!--------------------------------------------------------> */}
                                        
                            <div class=" restraunt" style={{display: "inline-block;"}}>
                                    <input id="dropdown-text" class="restraunt-dropdown" placeholder="Search for restaurants" onChange={this.handleInput} />
                                
                                     {/********suggestion box *****************/}

                                     <ul className="suggestionBox">{this.showSuggestion()}</ul>

                            
                            </div>
                            <i class="bi bi-search"></i> 
                        
                            </div>
                            </div>
                        </div>
                        {/* <!--main text row-3 done-->  */}
                </div>      
                        </div>
                    </div>
               
        )}}

export default navHook(Banner);