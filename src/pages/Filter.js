import React from 'react';
import '../style/filterpage.css'
import axios from 'axios';
import queryString from 'query-string';

class Filter extends React.Component{
    
    constructor(){
        super();
        this.state ={
            loc: [],
            restaurant: [],
            mealtypes : [],
            mealId : undefined,
            // rest : []

        }
    }

     componentDidMount(){
        // mealtype API

        const q = queryString.parse(window.location.search);
        const { mealtype } = q;
        //console.log(mealtype);
        //location API
        axios({
            url : `http://localhost:8000/mealtype/${mealtype}`,
            method : 'get',
            headers : {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ meals : res.data.meal, mealId: mealtype})
        })
        .catch((err => console.log(err)));
          
        //location API
        axios({
            url: 'http://localhost:8000/location',
            method: 'get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ loc: res.data.location })
        })
        .catch((err => console.log(err)))
    }

    // POST location API
    handleLocation = (val) => {
        const { lcost, hcost } = this.state;
        const loca = val.target.value;
        
        const filterObj = {
            location: loca,
            lcost,
            hcost
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, loca })
        })
        .catch((err => console.log(err)))
         
         //location API
        //  axios({
        //     url: `http://localhost:8000/rest/${loca}`,
        //     method: 'get',
        //     headers: { 'Content-Type': 'application/JSON'}
        // })
        // .then( res => {
        //     this.setState({ rest: res.data.restaurants })
        // })
        // .catch((err => console.log(err)))

    }

    handleCost = (lcost, hcost) => {
        const { loca } = this.state;
        
        const filterObj = {
            location: loca,
            lcost,
            hcost
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, lcost, hcost })
        })
        .catch((err => console.log(err)))

    }
    

   render(){
    // const {meals} = this.state;
    const { meals, loc, restaurant, rest } = this.state;
    console.log(meals);
    
        return(
              
            <div>
                {/* <div id="filter-section"> */}
                    
                    {/* <!--header--> */}
                    <div id="header">
                            <div style={{width: "1200px;" ,margin: "auto;"}}>
                                {/* <!--logo--> */}
                                <div id="logo-label">e!</div>
                                {/* <!--done--> */}
                                
                                {/* <!--login and create account button--> */}
                                <a href="">
                                    <div id="login_button">
                                    <h3>Login</h3>
                                    </div>
                                </a>
                                <div id="create_account">
                                    <button id="create_account_button">Create an account</button>
                                    
                                </div>
                                {/* <!--done--> */}
                            </div>
                    </div>
                    {/* <!--done--> */}
                    
                    <div style={{margin: "auto;", width: "1100px;"}}>
                                {/* <!--Breakfast heading--> */}
                                {
                                    // rest?.map((res) =>{
                                        meals?.map((res) =>{
                                         return(
                                            <div id="main_heading">
                                                {console.log(res)}
                                            <h2 className='mealtype-header'>{res.name} Places in Mumbai</h2>
                                            </div>

                                           
                                         )
                                    })
                                }
                               
                                {/* <!--done--> */}
        
                                {/* <!--block-1--> */}
                                    <div id="filter_block">
                                        {/* <!--filter--> */}
                                        <div id="filter"><h3>Filters</h3></div>
                                        {/* <!--done-->
                                        <!--select location--> */}
                                        <div id="select_location_text"><label for="location">Select Location</label></div>
                                        <div>
                                            <select id="location" onChange={this.handleLocation}>
                                            <option selected disabled>Select Location</option>
                                            {
                                                loc?.map((item) => {
                                                    return(
                                                        <option value={item.city_id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
                                    {/* <!--select location done--> */}
                                    
                                    {/* <!--cuisine--> */}
                                    <div id="cuisine-text">
                                        <label class='head-text'>Cuisine</label>
                                        <div id="cuisine-subtext">
                                            <input class="checkbox" type="checkbox" id="north indian" name="cuisine" onChange={() => this.handleCuisine(1)}/>
                                            <label class="checkbox-text" for="north indian">North Indian</label> 
                                        </div>
                                        <div>
                                            <input class="checkbox" type="checkbox" id="south indian" name="cuisine" onChange={() => this.handleCuisine(2)}/>
                                            <label class="checkbox-text" for="south indian">South Indian</label>
                                        </div>
                                        <div>
                                            <input class="checkbox" type="checkbox" id="chineese" name="cuisine" onChange={() => this.handleCuisine(3)}/>
                                            <label class="checkbox-text" for="chineese">Chinese</label>
                                        </div>
                                        <div>
                                            <input class="checkbox" type="checkbox" id="fast food" name="cuisine" onChange={() => this.handleCuisine(4)}/>
                                            <label class="checkbox-text" for="fast food">Fast Food</label> 
                                        </div>
                                        <div>
                                            <input class="checkbox" type="checkbox" id="street food" name="cuisine" onChange={() => this.handleCuisine(5)}/>
                                            <label class="checkbox-text" for="street food">Street Food</label>
                                        </div>
                                   </div>
                            
                            {/* <!--cuisine done--> */}
                            
                            {/* <!--cost--> */}
                            <div class="cost">
                                <label class='head-text'>Cost For Two</label>
                                <div id="costText">
                                    <input class="cost-radiobutton" type="radio" id="price-margin-1" name="cost" onChange={() => this.handleCost(1, 500)}/>
                                    <label class="radiobutton-text" for="price-margin-1">Less than ` 500</label> 
                                </div>
                                <div>
                                    <input class="cost-radiobutton" type="radio" id="price-margin-2" name="cost" onChange={() => this.handleCost(500, 1000)}/>
                                    <label class="radiobutton-text" for="price-margin-2">` 500 to ` 1000</label>
                                </div>
                                <div>
                                    <input class="cost-radiobutton" type="radio" id="price-margin-3" name="cost" onChange={() => this.handleCost(1000, 1500)}/>
                                    <label class="radiobutton-text" for="price-margin-3">` 1000 to ` 1500</label>
                                </div>
                                <div>
                                    <input class="cost-radiobutton" type="radio" id="price-margin-4" name="cost" onChange={() => this.handleCost(1500, 2000)}/>
                                    <label class="radiobutton-text" for="price-margin-4">` 1500 to ` 2000</label> 
                                </div>
                                <div>
                                    <input class="cost-radiobutton" type="radio" id="price-margin-5" name="cost" onChange={() => this.handleCost(2000, 5000)}/>
                                    <label class="radiobutton-text" for="price-margin-5">` 2000+</label>
                                </div>
                                {/* <!--cost done--> */}
                                
                                {/* <!--sort--> */}
                                <div class="sort">
                                    <label class='head-text' style={{font: "normal normal 600 16px/27px Poppins;"}}>Sort</label>
                                    <div id="radioSort-one">
                                    <input class="sort-radiobutton" type="radio" id="price-low-to-high" name="sort"/>
                                    <label class="sort-radiobutton-text" for="price-low-to-high">Price low to high</label> 
                                </div>
                                <div id="radioSort-two">
                                    <input class="sort-radiobutton" type="radio" id="price-high-to-low" name="sort"/>
                                    <label class="sort-radiobutton-text" for="price-high-to-low">Price high to low</label>
                                </div>
                                </div>
                            </div>
                       
                            <div>
                                {/* <!--block-2--> */}
                         
                                                   
                    {
                    
                    restaurant.map((res) => {

                            return( 
                                <div>                             
                                    <div id="block-2">
                                    <a href="" style={{textDecoration : "unset"}}>
                                                <div class="shop-details-1" >
                                                    <img class="image1" src={res.thumb} alt="food image"/>
                                                    <h3 class="shop-1-heading-1">{res.name}</h3>
                                                    <h4 class="shop-1-heading-2">{res.city_name}</h4>
                                                    <h1 class="shop-1-heading-3">{res.address}</h1>
                                                </div>
                                        </a>
                                        <hr/>
                                        <a href="" style={{textDecoration : "unset"}}>
                                        <div  style={{marginLeft : "59px"}}>
                                            <div class="price-1">
                                                <h5 class="">CUISINES: </h5>
                                                <h5 class="cost-1-price-detail">{res.Cuisine.map(cu => `${cu.name}, `)}</h5>
                                            </div>
                                            <div class="price-1">
                                                <h5 class="">COST FOR TWO: </h5>
                                                <h5 class="cost-1-price-detail">₹ {res.cost}</h5>
                                            </div>
                                        </div>
                                        </a>
                                                    
                                    </div>
                                </div>
                                

                            )
                     })
                     }
                                                   
                                                                                                  
                              
                               
                       
                      
                                
                                {/* <!--pagination--> */}
                                <div class="pagination">
                                    <button class="pagination_box" style={{opacity: "40%;"}}>&lt;</button>
                                    &ensp;
                                    <button class="pagination_box" style={{backgroundcolor: "#8C96AB;", color: "#FFFFFF;"}}>1</button>
                                    &ensp;
                                    <button class="pagination_box">2</button>
                                    &ensp;
                                    <button class="pagination_box">3</button>
                                    &ensp;
                                    <button class="pagination_box">4</button>
                                    &ensp;
                                    <button class="pagination_box">5</button>
                                    &ensp;
                                    <button class="pagination_box">&gt;</button>     
                                </div>
                        {/* <!--pagination done--> */}
                            </div>
                        {/* <!-- done--> */}
                    </div>
                </div>
            </div>
            // </div>
               
        )}}

export default Filter;