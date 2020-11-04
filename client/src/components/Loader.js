import React from "react";
import { stateContext } from "../App";
import KongaLoader from '../img/konga-desktop.png'
import './loader.css'


function Loader() {
    const { state, cartState, cartDispatch } = React.useContext(stateContext);
    const { loading } = state;

    React.useEffect(() => {
        const loader = document.querySelector('.background-loader')
    
        if (loading) {
          loader.style.display = 'block'
        }
        else {
          loader.style.display = 'none'
        }
      }, [loading])

  return (
    <div>
      {/* Loader Below Here! */}
      <div class="background-loader">
        <div id="loader">
          <img src={KongaLoader} alt="konga loader" />
        </div>
        <span className="loader__caption"> &copy;Developed And designed By Prince Agezi N.</span>
        <div className="divider"></div>
      </div>
      {/* Loader Above Here! */}
    </div>
  );
}

export default Loader;
