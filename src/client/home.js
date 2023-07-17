import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import Logo from "./image/logo.png";
import Image1 from "./image/2672502.jpg";
import Image2 from "./image/2706868.jpg";
import Image3 from "./image/2802333.jpg";
import Image4 from "./image/28491.jpg";

const Counter = ({ elementId, targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentNumber < targetNumber) {
        const increment = Math.ceil(targetNumber / 20);
        const newNumber = currentNumber + increment;
        setCurrentNumber(newNumber > targetNumber ? targetNumber : newNumber);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentNumber, targetNumber]);

  const formattedNumber = (number) => {
    if (number < 500) {
      return number;
    } else if (number < 1000000) {
      return (number / 1000) + 'k';
    } else {
      return (number / 1000000) + 'm';
    }
  };

  return <span id={elementId}>{formattedNumber(currentNumber)}</span>;
};

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    axios
      .get('http://localhost:5000/check-login', { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.isLoggedIn);
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
      });
  };

  const handleLogout = () => {
    axios
      .post('http://localhost:5000/logout', null, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
// //     // Counter Script 
// function formatNumber(number) {
//   if (number < 500) {
//     return number;
//   } else if (number < 1000000) {
//     return (number / 1000) + 'k';
//   } else {
//     return (number / 1000000) + 'm';
//   }
// }

// function animateCounter(elementId, targetNumber) {
//   var counterElement = document.getElementById(elementId);
//   var currentNumber = 0;

//   var interval = setInterval(function() {
//     if (currentNumber < targetNumber) {
//       currentNumber += Math.ceil(targetNumber / 20);
//       if (currentNumber > targetNumber) {
//         currentNumber = targetNumber;
//       }
//       counterElement.textContent = formatNumber(currentNumber);
//     } else {
//       clearInterval(interval);
//     }
//   }, 50); // Adjust the animation speed here (lower value = faster animation)
// }

// animateCounter('counter1', 990);
// animateCounter('counter2', 156);
// animateCounter('counter3', 43000000);
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap" rel="stylesheet" />
      <title>Document</title>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href=" https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <section className="header">
        {/* Navbar starts */}
        <nav>
          <a href="index.html"> <img src={Logo} alt="Logo" /> </a>
          <div className="nav-links" id="navLinks">
            <i className="fa fa-times"  />
            <ul>
              <li><a href="/">HOME</a></li>
              <li><a href="/">ABOUT</a></li>
              <li><a href="/">COMPANY</a></li>
              <li><a href="search.html">SEARCH</a></li>
              {isLoggedIn ? (
              <li><a href="#" onClick={handleLogout}>LOGOUT</a></li>
            ) : (
              <li><a href="/login">LOGIN</a></li>
            )}
            </ul>
          </div>
          <i className="fa fa-bars"  />
        </nav>
      {/* Navbar Ends */}
      {/* Center starts */}
      <div className="text-box">
        <h1>Blood Bank Management System</h1>
        <p>A blood bank is a center where blood gathered as a result of blood donation <br /> is stored and preserved for later use in blood transfusion.</p>
        <a href className="hero-btn"> Donate Blood Now</a>
      </div>
    </section>
    {/* Center Ends */}
    {/* Card Starts */}
    <h1 className="title">Card Gallery</h1>
    <div className="card-container" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="card">
        <img src={Image1} alt="Image" />
        <div className="card-text">
          <h2>Card Title 1</h2>
          <p>This is the description for Card 1.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src={Image2} alt="Image" />
        <div className="card-text">
          <h2>Card Title 2</h2>
          <p>This is the description for Card 2.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src={Image3 } alt="Image" />
        <div className="card-text">
          <h2>Card Title 3</h2>
          <p>This is the description for Card 3.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src={Image4}alt="Image" />
        <div className="card-text">
          <h2>Card Title 4</h2>
          <p>This is the description for Card 4.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
    </div>
    {/* Cards Ends */}
    {/* Counter Starts */}
    <h2 className="title">Counter Section</h2>
    <div className="container-wrapper">
      <div className="container" style={{fontSize:"55px"}}>
      <Counter elementId="counter1" className="counter" targetNumber={990} />
        <div className="text">Counter 1</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
      <div className="container" style={{fontSize:"55px"}}>
      <Counter elementId="counter2" className="counter"targetNumber={156} />
      
        <div className="text">Counter 2</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
      <div className="container" style={{fontSize:"55px"}}>
      <Counter elementId="counter3" className="counter" targetNumber={43000000} />
        <div className="text">Counter 3</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
    </div>
    {/* Counter Ends */}
    <div className="sliding-text">
      <span>
        <div className="sliding-text-content">
          <h2 className="sliding-text-title">Blood Bank Management System</h2>
        </div>
      </span>
      <div className="static-text">
        <p>Transform your workplace culture and drive success.</p>
        <a className="hero-btn" href="#" style={{top: '50px'}}>Learn More</a>
      </div>
    </div>
    {/* call to action*/}
    <section className="cta">
      <h1>Enroll For Our Various Recruitment Solution <br /> Anywhere From The World</h1>
      <a href className="hero-btn">CONTACT US</a>
    </section>
    {/* call to action */}
    {/* Footer */}
    <section className="footer">
      <h4>About Us</h4>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi adipisci quos ab consequatur reprehenderit
        sequi eos<br /> doloremque! Atque dicta, nisi obcaecati, deserunt corrupti possimus in ipsum enim quidem ut vel.
      </p>
      <div className="icons">
        <i className="fa fa-facebook" />
        <i className="fa fa-twitter" />
        <i className="fa fa-instagram" />
        <i className="fa fa-linkedin" />
      </div>
    </section>
    {/* footer ends */}
    {/* Javascrit for trrogle menu */}
  </div>
  );
};

export default Home;