import { useEffect, useState } from "react";
import "../pages/Home.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../action/userAction";


const Home = () =>{
    const [quote , setQuote] = useState('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    const handelogout = ()=>{
        dispatch(logoutUser())
        nav("/")
      }

    const getQuote = async ()=>{
        await fetch(`https://famous-quotes4.p.rapidapi.com/random?rapidapi-key=2464eeeab8msh0af4e38807c89f7p15638ejsn11a2f910587c`)
        .then(res => res.json())
        .then(data => {
            let randomNum = Math.floor(Math.random()*data.length);
            setQuote(data[randomNum]);
        });
        };
    
        useEffect(() =>{
            getQuote();
        },[]);
    return (
        <div className="home">
            <h1 className="h1">Quotes...</h1>
            <div className="quote">
                <p>
                    {quote.text}
                </p>
                <p>
                    -{quote.author}
                </p>
                <div>
                <button onClick={getQuote} className="btn">Get Quote</button>
                <button onClick={handelogout} className="btn">Logout</button></div>
            </div>
        </div>
    )
}

export default Home;
