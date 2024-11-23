import Image from "next/image";
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Hero from "../../components/organisms/Hero";
import Main from "../../components/organisms/Main";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
