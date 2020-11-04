import React from "react";
import { stateContext } from "../App";
import KongaLoader from '../img/konga-desktop.png'
import './loader.css'


function Loader() {
    const { state, cartState, cartDispatch } = React.useContext(stateContext);
    const { loading } = state;

    React.useEffect(() => {
        const loader = document.querySelector('.background-loader')
        const loaderBack = document.querySelector('.loader__dark-background ')
    
        if (loading) {
          loader.style.display = 'block'
          loaderBack.style.opacity = '1'
          loaderBack.style.display = 'block'
        }
        else {
          loader.style.display = 'none'
          loaderBack.style.opacity = '0'
          loaderBack.style.display = 'none'
        }
      }, [loading])

  return (
    <div className="loader__dark-background">
      {/* Loader Below Here! */}
      <div class="background-loader">
        <div id="loader">
          <img src={KongaLoader} alt="konga loader" />
        </div>
        <span className="loader__caption">&copy;Developed And designed By Prince Agezi N.</span>
        <div className="divider"></div>
      </div>
      {/* Loader Above Here! */}
    </div>
  );
}

export default Loader;
