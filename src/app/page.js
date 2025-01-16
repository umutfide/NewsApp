"use client";

import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  Button,
  Avatar,
  User
} from "@nextui-org/react";
import { Card, CardFooter, Image as NextUIImage } from "@nextui-org/react";
import { CircularProgress } from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllWriter, setShowAllWriter] = useState(false);

  const sliderRef = useRef(null);
  const authors = [
    {
      name: "Jane Doe",
      description: "Product Designer",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      name: "Alex Young",
      description: "BB NCews",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Abdurrahim Dilipak",
      description: "CNN",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Alexa Timber",
      description: "Formula 1",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
  ];
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("https://api.newsdatahub.com/v1/news", {
          headers: {
            "X-Api-Key": "08OPQxmag-a9gOqdfBoDThjTHcTBRHCovcEMZ8zvAM0",
            "User-Agent": "news/1.0",
          },
        });
        const data = await response.json();
        if (data.data) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNewsData();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CircularProgress
          aria-label="Loading..."
          color="primary"
          size="lg"
          value={50}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <div className="sticky top-0 z-50">
        <Navbar
          isBordered
          className="shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4"
        >
          <NavbarBrand className="flex items-center gap-2">
            <AcmeLogo />
            <p className="font-extrabold text-white text-2xl">Havædis</p>
          </NavbarBrand>
          <NavbarContent
            className="hidden sm:flex gap-6 ml-4"
            justify="center"
          >
            {["Anasayfa", "Teknoloji", "Sağlık", "Spor"].map((item) => (
              <NavbarItem key={item}>
                <NextLink
                  href="#"
                  className="text-white text-lg hover:scale-105 transition-transform"
                >
                  {item}
                </NextLink>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end" className="flex items-center gap-4">
            <NavbarItem>
              <Button
                auto
                light
                icon={
                  <span className="material-icons text-white">notifications</span>
                }
              />
            </NavbarItem>
            <NavbarItem>
              <Avatar
                size="md"
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="ring-2 ring-white"
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>

      <div className="w-full py-14 text-center bg-gradient-to-r from-gray-200 to-gray-300">
        <h2 className="text-4xl font-extrabold text-gray-700 mb-4">
          Havædis'e Hoşgeldiniz!
        </h2>
        <p className="text-xl text-gray-600 px-4 max-w-3xl mx-auto">
          En güncel haberler ✍️ <span className="text-red-500">ilham 💡</span>,{" "}
          <span className="text-blue-500">bilgi 📖</span> ve{" "}
          <span className="text-yellow-500">eğlence! 🎬</span>.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 my-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Slider ref={sliderRef} {...sliderSettings}>
            {articles.map((article, index) => (
              <div key={index} className="relative">
                <img
                  src={
                    article.media_url ||
                    "https://via.placeholder.com/800x400?text=No+Image"
                  }
                  alt={article.title}
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <a
                    href={`/detail?title=${encodeURIComponent(
                      article.title
                    )}&content=${encodeURIComponent(
                      article.content || "Açıklama bulunamadı"
                    )}`}
                    className="text-white underline font-medium"
                  >
                    Devamını Oku
                  </a>
                </div>
              </div>
            ))}
          </Slider>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => sliderRef.current.slickGoTo(index)}
                  className={`w-8 h-8 text-center rounded-full border-2 ${currentSlide === index
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-600"
                    } transition-all duration-200`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-md shadow-md py-6 px-4">
          <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">
            Son Haberler
          </h2>
          <div
            className={`grid gap-6 ${showAllArticles
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-hidden"
              }`}
          >
            {articles.slice(0, showAllArticles ? articles.length : 6).map(
              (item, index) => (
                <Card key={index} className="relative">
                  <NextUIImage
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    src={
                      item.media_url ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                  />
                  <CardFooter className="absolute bottom-0 z-10 bg-black/40 text-white backdrop-blur-md flex justify-between items-center p-4">
                    <div className="pr-2 text-sm truncate">
                      {item.title || "Açıklama bulunamadı"}
                    </div>
                    <Button
                      as="a"
                      href={`/detail?title=${encodeURIComponent(
                        item.title
                      )}&content=${encodeURIComponent(
                        item.content || "Açıklama bulunamadı"
                      )}`}
                      size="sm"
                      radius="full"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Oku
                    </Button>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowAllArticles(!showAllArticles)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {showAllArticles ? "Daralt" : "Genişlet"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-md shadow-md py-6 px-4">
          <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">
            Yazarlar
          </h2>
          <div className="flex flex-wrap justify-between gap-12 p-6 rounded-lg">
            {authors.map((author, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-500 p-4 rounded-lg w-64"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-base font-semibold text-white">{author.name}</p>
                  <p className="text-sm text-gray-400">{author.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowAllWriter(!showAllWriter)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {showAllWriter ? "Daralt" : "Genişlet"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-gray-100 rounded-lg p-12 flex flex-col md:flex-row items-center md:justify-between space-y-10 md:space-y-0">
          <div className="md:w-1/2">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
              Haberleri ilk sen al!
            </p>
            <h2 className="text-3xl md:text-4xl text-gray-900 mt-4">
              Son haberleri{" "}
              <span className="text-red-500">abone ✍️</span> olarak takip et!
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto md:flex-shrink-0">
            <input
              type="email"
              placeholder="Mailini gir."
              className="flex-1 px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md font-semibold">
              Abone Ol!
            </button>
          </div>
        </div>
      </div>


      <footer className="bg-gray-200 text-gray-700 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Havædis</h3>
            <p className="text-sm">
              En güncel havædisler.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Havædis</h3>
            <p className="text-sm">En güncel haberler ve içerikler.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Küresel</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Güncel
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Uluslararası Ticaret
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Diplomasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Teknoloji</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Yeni Çıkanlar
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Devam Halindeki Projeler
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gelecek Teknolojisi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Daha Fazlası</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Dizayn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Mentorluk
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Yatırım
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Havædis İçin Çalışın
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bizi Destekleyin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 Havædis. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
