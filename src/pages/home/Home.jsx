import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Background from "../../img/vh.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../footer/Footer";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="home">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=932&q=80"
          alt=""
        />
        <div className="home-text">
          <p data-aos="flip-left" data-aos-duration="2000">
            Hello there! Select a lecture hall to view available lecture rooms
          </p>
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Footer />
    </>
  );
};

export default Home;
