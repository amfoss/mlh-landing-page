import React from "react"
import { Link } from "gatsby"
import hacktoberfest19logo from "../images/hacktoberfest19.png"
import hacktoberfest19Art from "../images/hacktoberfest_art_1.png"
import amFOSSLogo from "../../../images/amfoss_logo.png"
import amritaLogo from "../../../images/amrita_logo.png"

import Particles from 'react-particles-js';

const Header = () => {
  return (
  <>
    <div id="header-area">
      <Particles
        canvasClassName="particleBg"
        params={{
          "particles": {
            "number": {
              "value": 300,
              "density": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "speed": 10,
                "size_min": 0.3
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "random": true,
              "speed": 3,
              "direction": "down",
              "out_mode": "out"
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble"
              },
              "onclick": {
                "enable": true,
                "mode": "repulse"
              }
            },
            "modes": {
              "bubble": {
                "distance": 50,
                "duration": 2,
                "size": 0,
                "opacity": 0
              },
              "repulse": {
                "distance": 40,
                "duration": 4
              }
            }
          }
        }}
       />
      <div id="top-bar" className="row m-0 p-4">
        <div className="col-6">
          <img className="amFOSSLogo" src={amFOSSLogo}/>
        </div>
        <div className="col-6 text-right">
          <img className="amritaLogo" src={amritaLogo}/>
        </div>
      </div>
      <img src={hacktoberfest19Art} id="header-art"/>
      <div className="d-flex align-items-center justify-content-center">
          <div className="row m-0 p-4 w-100">
            <div className="col-xl-8 col-lg-6">
              <img className="hacktoberLogo" src={hacktoberfest19logo} />
            </div>
            <div className="col">
                <div className="d-flex align-items-center text-lg-left text-center justify-content-center h-100">
                  <div>
                    <h1>Amritapuri</h1>
                    <h3>October 3, 3PM - 9PM</h3>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </>
)
}

export default Header;