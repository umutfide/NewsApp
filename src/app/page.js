"use client";
import { useEffect, useState } from "react";
import CustomCard from "../component/newscard";

export default function Home() {

  // haberleri tutmak için bir state.
  const [articles, setArticles] = useState([]);
  //burada ise giirilen termleri tutuyo
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("https://api.newsdatahub.com/v1/news", {
          headers: {
            "X-Api-Key": "08OPQxmag-a9gOqdfBoDThjTHcTBRHCovcEMZ8zvAM0",
            "User-Agent": "news/1.0",
          },
        });
        // apiden gelen yanıtı JSON formatına çeviriyoruz
        const data = await response.json();
        console.log("veri:", data);

        if (data.data) {
          setArticles(data.data);
        }

      } catch (error) {
        console.error("hata:", error);
      }
    };

    fetchNewsData();
  }, []);
  // arama kutusuna girilen değere göre haberleri filtreliyoru ve varsa term gösteriyoruz
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gradient-to-r bg-red-900 text-white p-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">Haber Portalı</h1>
        <p className="mt-2 text-lg font-medium">
          En Güncel ve Popüler Haberleri Anında Takip Edin
        </p>
      </header>

      <div className="container mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="Başlığa göre arayın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-700"
        />
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-xl md:text-2xl font-bold text-white bg-red-900 rounded-t-lg py-3 px-4 mb-6">
            Son Haberler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              // kartları dinamik bir şekilde gösteriyouz. üstteki

              filteredArticles.map((item, index) => {
                //yönlendirm linki.
                const detailLink = `/detail?title=${encodeURIComponent(
                  item.title
                )}&description=${encodeURIComponent(
                  item.description || "Açıklama bulunamadı"
                )}`;

                return (
                  <CustomCard
                    key={item.id || index}
                    title={item.title}
                    description={item.content || "Açıklama bulunamadı"}
                    imageSrc={
                      item.media_url ||
                      "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    }
                    link={detailLink}
                  />
                );
              })
            ) : (
              <p className="text-center text-lg text-gray-500">
                Aradığınız kriterlere uygun haber bulunamadı.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-200 p-4 text-center">
        <p className="text-sm">&copy; 2025 Haber Portalı. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
