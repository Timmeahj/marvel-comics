"use client";
import Image from "next/image";
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Hero from "../../components/organisms/Hero";
import Main from "../../components/organisms/Main";
import favicon from '../../public/favicon.png';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon.src;
    document.head.appendChild(link);
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
