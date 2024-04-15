import React from 'react';
import '../style/filterpage.css'
import axios from 'axios';
import queryString from 'query-string';
import navHook from "./nav";

class Filter extends React.Component{
    
    constructor(){
        super();
        this.state ={
            loc: [],
            restaurant: [],
            mealtypes : [],
            mealId : undefined,
            Cuisine: [],
            sort: 1, 
            page: 1,
            meals: []
          
        }
    }

    


     // Post mealtype API
     componentDidMount() {
        const q = queryString.parse(window.location.search);
        const { mealtype } = q;
        const int = parseInt(mealtype);
        
        const filterObj = {
            mealtype: int
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, mealtype: int })
        })
        .catch((err => console.log(err)))

        // Mealtype
        axios({
            url: `http://localhost:8000/mealtype/${int}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ meals: res.data.meal })
        })
        .catch((err => console.log(err)))

        // GET location API
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
         axios({
            url: `http://localhost:8000/rest/${loca}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ rest: res.data.restaurants })
        })
        .catch((err => console.log(err)))

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

     // handle Cuisine
     handleCuisine = (i) => {
        const { loca, lcost, hcost, sort, page, mealtype } = this.state;

        let tempCuisine = this.state.Cuisine.slice();

        if(tempCuisine.indexOf(i) === -1) {
            tempCuisine.push(i);
        }else{
            tempCuisine.splice(tempCuisine.indexOf(i),1);
        }

        const filterObj = {
            location: loca,
            lcost,
            hcost,
            cuisine: tempCuisine.length > 0 ? tempCuisine : undefined,
            sort, 
            page, 
            mealtype
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, Cuisine: tempCuisine })
        })
        .catch((err => console.log(err)))
    }

     // handle Sort
     handleSort = (sort) => {

        const { loca, Cuisine, lcost, hcost, page, mealtype } = this.state;
        
        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            sort, 
            page, 
            mealtype
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, sort })
        })
        .catch((err => console.log(err)))
    }

     // handle Page
    handlePage = (page) => {
        const { loca, Cuisine, lcost, hcost, sort, mealtype } = this.state;
        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            sort,
            page, 
            mealtype
        }

        axios({
            url: 'http://localhost:8000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then( res => {
            this.setState({ restaurant: res.data.restraunts, page })
        })
        .catch((err => console.log(err)))
    }

    
    // Navigate
    handleNavigate= (ss) => {
        this.props.navigate(`/details?restuarant=${ss}`);
    }
     
    addItems = (index, operationType) => {
        var total = 0;
        const items = [...this.state.restaurant];
        const item = items[index];

        if(operationType == 'add'){
            item.length += 1;
        } else {
            item.length -= 1;
        }

        items[index] = item;

        items.map((x) => {
            total += x.length;
        })
        this.setState({ restaurant: items })
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
                                    <input class="sort-radiobutton" type="radio" id="price-low-to-high" name="sort" onClick={() => this.handleSort(1)}/>
                                    <label class="sort-radiobutton-text" for="price-low-to-high">Price low to high</label> 
                                </div>
                                <div id="radioSort-two">
                                    <input class="sort-radiobutton" type="radio" id="price-high-to-low" name="sort" onClick={() => this.handleSort(-1)}/>
                                    <label class="sort-radiobutton-text" for="price-high-to-low">Price high to low</label>
                                </div>
                                </div>
                            </div>
                       
                            <div>
                                {/* <!--block-2--> */}
                         
                                                   
                    
                    
                    {/* // restaurant.map((res) => { */}
                        { restaurant.length != 0 ?
                            restaurant.map((res) => {

                            return( 

                                <div class="results" onClick={() => this.handleNavigate(res._id)}>
                                <div class="d-flex">
                                    <div class="lt-box">
                                        <img src={res.thumb} alt="picture" class="img-fluid img-qse" />
                                    </div>
                                    <div class="rt-box">
                                        <h4 class="result-heading">{res.name}</h4>
                                        <p class="result-subheading">{res.city_name}</p>
                                        <p class="result-text">{res.address}</p>
                                    </div>
                                </div>
                                
                                <hr style={{color: "grey;"}} />

                                <div class="d-flex">
                                    <div class="ll-box">
                                        <p class="result-text-2">CUISINES:</p>
                                        <p class="result-text-2">COST FOR TWO:</p>
                                    </div>
                                    <div class="rl-box">
                                        <p class="result-text-blue">{res.Cuisine.map(cu => `${cu.name}, `)}</p>
                                        <p class="result-text-blue">₹{res.cost}</p>
                                    </div>
                                </div>
                            </div>
                                
                                
                                )
                            }) : <div className="results-2"> Sorry, No result found... </div>
                            }
                                 
                            
                                 
                                <div class="pagination">
                                    <button class="pagination_box" style={{opacity: "40%;"}}  onClick={() => this.handlePrevClick()}>&lt;</button>
                                    &ensp;
                                    <button class="pagination_box" style={{backgroundcolor: "#8C96AB;", color: "#FFFFFF;"}}  onClick={() => this.handlePage(1)}>1</button>
                                    &ensp;
                                    <button class="pagination_box"  onClick={() => this.handlePage(2)}>2</button>
                                    &ensp;
                                    <button class="pagination_box"  onClick={() => this.handlePage(3)}>3</button>
                                    &ensp;
                                    <button class="pagination_box"  onClick={() => this.handlePage(4)}>4</button>
                                    &ensp;
                                    <button class="pagination_box"  onClick={() => this.handlePage(5)}>5</button>
                                    &ensp;
                                    <button class="pagination_box" onClick={() => this.handlePrevClick}>&gt;</button>     
                                </div>

                                
                        </div>
                           
                                
                        {/* <!--pagination done--> */}
                            
                        {/* <!-- done--> */}
                    </div>
                </div>
            </div>
            // </div>

            
               
        )}}

export default navHook(Filter);