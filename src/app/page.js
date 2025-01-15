"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  Button,
  Avatar,
} from "@nextui-org/react";

import {
  Card,
  CardHeader,
  CardFooter,
  Image as NextUIImage,
} from "@nextui-org/react";

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
        console.error("hata:", error);
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
    arrows: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 font-sans">
      <div className="sticky top-0 z-50">
        <Navbar
          isBordered
          className="shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4"
        >
          <NavbarBrand className="flex items-center gap-2">
            <p className="font-extrabold text-white text-2xl">Havædis</p>
          </NavbarBrand>
          <NavbarContent
            className="hidden sm:flex gap-8 ml-4"
            justify="center"
          >
            <NavbarItem>
              <NextLink
                color="foreground"
                href="#"
                className="text-white text-lg hover:scale-105 transition-transform"
              >
                Anasayfa
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                color="foreground"
                href="#"
                className="text-white text-lg hover:scale-105 transition-transform"
              >
                Teknoloji
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                color="foreground"
                href="#"
                className="text-white text-lg hover:scale-105 transition-transform"
              >
                Sağlık
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                color="foreground"
                href="#"
                className="text-white text-lg hover:scale-105 transition-transform"
              >
                Spor
              </NextLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="flex items-center gap-4">
            <NavbarItem>
              <Button
                auto
                light
                icon={<span className="material-icons text-white">notifications</span>}
              ></Button>
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

      <div className="w-full py-14 text-center mt-5 bg-gradient-to-r from-gray-200 to-gray-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-600 mb-3">
          Havædis'e Hoşgeldiniz!
        </h2>
        <p className="text-xl md:text-2xl font-bold text-gray-700 px-4 max-w-2xl mx-auto">
          En güncel haberler ✍️ <span className="text-red-600">ilham 💡</span>,
          <span className="text-red-600"> bilgi 📖</span>, ve{" "}
          <span className="text-red-600">eğlence! 🎬</span>.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 my-10">
        {!loading && articles.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <Slider {...sliderSettings}>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-between p-4">
                    <h2 className="text-white text-2xl font-semibold mr-4 line-clamp-2">
                      {article.title}
                    </h2>
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
          </div>
        )}
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-md shadow-md py-6 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">
              Son Haberler
            </h2>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-spin border-2 border-blue-800 border-t-transparent"></div>
                  <span className="text-blue-800 font-semibold">
                    Yükleniyor...
                  </span>
                </div>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((item, index) => (
                  <Card
                    key={index}
                    isFooterBlurred
                    className="relative w-full h-auto overflow-hidden"
                  >

                    <NextUIImage
                      removeWrapper
                      alt={item.title}
                      className="z-0 w-full h-48 object-cover"
                      src={
                        item.media_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                    />

                    <CardFooter className="absolute bottom-0 z-10 bg-black/40 text-white backdrop-blur-sm flex items-center justify-between w-full p-4">
                      <div className="pr-2 text-sm line-clamp-2">
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
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white font-semibold"
                      >
                        Oku
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 text-gray-900 py-10">
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
