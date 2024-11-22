import Image from "next/image";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container">
      </div>
      <Footer />
    </div>
  );
}
