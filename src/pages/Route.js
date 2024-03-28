import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import SearchImage from "./SearchImage";


const Router = () =>{
    return(
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/details" element={<SearchResult />} />
              <Route path="/searchImage" element={<SearchImage />} />
          </Routes>
        </BrowserRouter>
    )
}

export default Router;