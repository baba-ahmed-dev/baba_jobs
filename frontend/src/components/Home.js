import React from 'react';
import Searchjob from './bars/Searchjob';
import Companybar from './bars/Companybar';
import Seekerbar from './bars/Seekerbar';

const Home = () => {
    return (
        <div className="container Home">
            <Searchjob />
            <Companybar/>
            <Seekerbar/>
           
        </div>
     
    );
  }
  
  export default Home;