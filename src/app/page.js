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
  const [currentIndex, setCurrentIndex] = useState(0);
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-red-600" : "bg-gray-400"
          }`}
      ></div>
    ),
    beforeChange: (_, next) => setCurrentIndex(next),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <div className="sticky top-0 z-50">
        <Navbar isBordered>
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit ml-5">Havædis</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <NextLink color="foreground" href="#">
                Ana Sayfa
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink color="foreground" href="#">
                Dünya
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink color="foreground" href="#">
                Teknoloji
              </NextLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={NextLink} color="red" href="#" variant="flat">
                Giriş Yap!
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>

      <div className="max-w-6xl mx-auto px-4 my-8">
        {!loading && articles.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Slider {...sliderSettings}>
              {articles.map((article, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      article.media_url ||
                      "https://via.placeholder.com/800x400?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold px-4 text-center">
                      {article.title}
                    </h2>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-md shadow-md py-6 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-red-900 border-b-2 border-red-900 pb-2 mb-6">
              Son Haberler
            </h2>
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-spin border-2 border-red-800 border-t-transparent"></div>
                  <span className="text-red-800 font-semibold">Yükleniyor...</span>
                </div>
              </div>
            )}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((item, index) => (
                  <div key={index} className="bg-white rounded-md shadow p-4">
                    <img
                      src={
                        item.media_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={item.title}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                    <h3 className="text-lg font-bold mt-4">{item.title}</h3>
                    <p className="text-gray-700 mt-2 text-sm truncate">
                      {item.content || "Açıklama bulunamadı"}
                    </p>
                    <a
                      href={`/detail?title=${encodeURIComponent(
                        item.title
                      )}&content=${encodeURIComponent(
                        item.content || "Açıklama bulunamadı"
                      )}`}
                      className="text-red-600 font-bold mt-4 inline-block"
                    >
                      Devamını Oku
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 Haber Portalı. Tüm Hakları Saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
