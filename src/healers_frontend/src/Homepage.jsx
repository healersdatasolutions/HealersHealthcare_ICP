import { useState } from 'react';
import { healers_backend } from 'declarations/healers_backend';
import Overview from '../components/Overview';
import Panels from '../components/Panels';
import Video from '../components/Video';
import Services from '../components/Services';
import KnowMore from '../components/KnowMore';
import Home from '../app/page';
import Header from '../components/Header';
import Footer from '../components/Footer';


function HomePage() {
  return (
    <>
    <Header/>
    <Overview/>
    <Panels/>
    <Video/>
    <Services/>
    <KnowMore/> 
    <Footer/>
    


    </>
  )
}

export default HomePage;
