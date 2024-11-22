import Image from "next/image";
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
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
