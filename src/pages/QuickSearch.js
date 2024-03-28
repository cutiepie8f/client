import React from 'react';
import navHook from "./nav";

class QuickSearch extends React.Component{
    
    showFilter = (ss) => {
        console.log(ss);
        this.props.navigate(`/filter?mealtype=${ss}`);
    }


   render(){
    const {mealtypeData} = this.props;
     console.log(mealtypeData);
        return(
            <div >
                    {/* <!--quick search--> */}
                    <div style={{width: "1485px;"}}>        
                        <div class="row rowspart">
                                <div class="col-1"></div>
                                                <div class="col-10 ms-5">
                                                        <h2 class="heading-1">Quick Searches</h2>
                                                        <h4 class="heading-2">Discover restaurants by type of meal</h4>
                                                </div>
                               </div>
                        </div>   
                
                    {/* <!-- quick search done--> */}
                    {/* <!--food block row-1 start--> */}
                   
                            
                          
                            
                                    {/* items */}
                                     
       
                                  
            {/* <a href='./Filter' style={{textDecoration : "unset"}}> */}
    
                <div class="d-flex flex-wrap" style={{ margin : "33px 0px 95px 180px"}}>
                    {
                        
                        mealtypeData?.map((meal) =>{
                            return(
                                <div class="d-flex box mt-4" style={{border: "1px solid greenyellow;"}} onClick={() => this.showFilter(meal._id)}>
                                        <div class="l-box">
                                            <img src={`./images/${meal.image}`} class="img-fluid img-qs" />
                                        </div>
                                        <div class="r-box">
                                            <h4 class="card-title">{meal.name}</h4>
                                            <p class="card-content">{meal.content}</p>
                                        </div>
                               </div>
                            )
                            
                        })
                        
                    }
                    
                  
                </div>
            {/* </a> */}
                
                                

                                                                    
                                                            
                        {/* <!--food block done--> */}

                </div> 
           
               
        )}}

export default navHook(QuickSearch);