import React from 'react';
import '../style/searchImage.css';
import queryString from 'query-string';
import axios from 'axios';

class SearchImage extends React.Component{
    
    constructor(){
        super();
        this.state ={
            restaurant : [],
            resId: undefined
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
          render(){
            const { restaurant } = this.state;
                 return(
                    <div id='food-section'>
                      <div id="food-image">
                            <img src={restaurant.thumb} alt="Food Image" width="891px" height="556px" />
                    </div>

                    <button id="left-icon">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <button id="right-icon">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
                 )
          }

        }

export default SearchImage;
