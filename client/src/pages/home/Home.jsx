import "./home.css";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/featured/Featured";
import { FeaturedProperties } from "../../components/featuredProperties/FeaturedProperties";
import { Footer } from "../../components/footer/Footer";
import { LastProperties } from "../../components/lastProperties/LastProperties";

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <h1 className="homeTitle">Most loved Destinations</h1>
          <Featured />
          <h1 className="homeTitle">Homes Guest Love</h1>
          <FeaturedProperties/>
          <h1 className="homeTitle">Newest Properies</h1>
          <LastProperties/>
        </div>
        <Footer />
    </div>
  )
}
