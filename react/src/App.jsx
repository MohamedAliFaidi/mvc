import "./App.css";

import Navbar from "./components/layouts/Navbar";
import Body from "./components/layouts/Body";
import Footer from "./components/layouts/Footer";
import "./App.css";
import { axiosClient } from "./utils/axiosClient";
import {  useLocation } from "react-router-dom";
import { useEffect } from "react";



function App() {
 const location = useLocation()
 useEffect(()=>{
 if(location.search.split('.').includes('googleapis')){
  console.log(`${location.search}`)
   }
 

 },[])
  return (
    // <div className="flex flex-col min-h-screen">
    //   <Navbar />
    //   <div className="flex-grow">
    //     <Body />
    //   </div>
    //   <Footer />
    // </div>
    <>


    <button onClick={()=>{
      axiosClient.get('/auth/oauth' ,{
        withCredentials:true
      }).then((res)=>{
        console.log(res)
        if(res?.data?.authorizationUrl){
         window.location.href = ""+ res?.data?.authorizationUrl
        }
      }).catch((err)=>{
        console.log(err)
      })
    }}> google</button>
    
    
    </>
  );
}

export default App;
