import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./About.css";
// import MetaData from "../MetaData";

const About = () => {
  document.title = "About Us";
  return (
    <>
      <Header />

      <div className="about-section-container">
        <h1 className="Heading">
          About <span>Us</span>
        </h1>
        {/* <MetaData title={'About Us'} /> */}
        <div className="about-section-box">
          <div>
            <div>
              <img
                style={{
                  width: "20rem",
                  height: "20rem",
                  margin: "2rem 0",
                  borderRadius: "100%",
                }}
                src="https://tse3.mm.bing.net/th/id/OIP.xcJCY0nOyJajzz3KZeeQfwHaHU?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Founder"
              />
              <h1>SnapIt Team</h1>
              <button
                onClick={() =>
                  window.open("", "_blank")
                }
              >
                Visit Website
              </button>
              <br />
              <p>
                This is a sample wesbite made by SnapIt Admin
                <br />
                Only with the purpose to Learning MERN Stack
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
