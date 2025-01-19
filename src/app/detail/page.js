"use client";

import { useSearchParams } from "next/navigation";
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

export default function DetailPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("content");
  const image = searchParams.get("image");

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
          </NavbarContent>
        </Navbar>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] object-cover rounded-lg mb-8 shadow-md"
          />
        )}
        <h1 className="text-4xl font-bold text-blue-900 mb-6">{title}</h1>
        <p className="text-lg leading-relaxed text-gray-700">{description}</p>
      </div>

      <footer className="bg-gray-200 text-gray-700 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Havædis</h3>
            <p className="text-sm">En güncel havædisler.</p>
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
