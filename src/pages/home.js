import React from 'react';
import '../style/frontPages.css'
import Banner from './Banner';
import QuickSearch from './QuickSearch';
import axios from 'axios';
class HomePage extends React.Component{
    
     constructor(){
        super();
        this.state ={
            loc : [],
            mealtype : []
        }
     }

    componentDidMount(){
        
        //location API
        axios({
            url : "http://localhost:8000/location",
            method : 'get',
            headers : {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ loc : res.data.location})
        })
        .catch((err => console.log(err)));


         // mealtype  API
        axios({
            url : "http://localhost:8000/mealtype",
            method : 'get',
            headers : {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ mealtype : res.data.meal})
        })
        .catch((err => console.log(err)));


    }
    

   

    

   render(){

     const { loc} = this.state;
     const { mealtype} = this.state;
    // console.log(loc);
        return(
              
                   <div>

                        <Banner locationData = { loc }/>
                        <QuickSearch mealtypeData = {mealtype}/>
                   </div>
        )}}

export default HomePage;