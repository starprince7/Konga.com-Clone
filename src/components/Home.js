import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css'

function Home() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }, []);


    return (
        <div className="row">
            <div class="card">
                <h3>title</h3>
                <p>img</p>
                <p>price: N2,000</p>
            </div>
        </div>
    )




export default Home;
