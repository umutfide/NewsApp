"use client";
import { useSearchParams } from "next/navigation";

export default function DetailPage() {
  //tasarım yapmadım ancak direkt olarak yansıtıyor şu anda. çok fazla detay gelmediği için az gösterdi. 
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="text-lg leading-relaxed">{description}</p>
    </div>
  );
}
