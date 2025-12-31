"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Star, MapPin, Clock, ArrowLeft, Heart, Share2 } from "lucide-react";

interface Place {
  _id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  zona: string;
  direccion: string;
  horario: string;
  precio: string;
  fotos: string[];
  promedioRating: number;
  menu: {
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
  }[];
  coordenadas: {
    coordinates: [number, number];
  };
}

export default function PlaceDetailPage() {
  const params = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (!params.id) return;
        const response = await api.get(`/lugares/${params.id}`);
        setPlace(response.data);
      } catch (err) {
        console.error("Error fetching place:", err);
        setError("No se pudo cargar la información del lugar.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-4">Error</h1>
        <p className="text-zinc-600 mb-6">{error || "Lugar no encontrado"}</p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="relative w-full h-64 md:h-96 bg-zinc-200">
        {place.fotos && place.fotos.length > 0 ? (
          <Image
            src={place.fotos[0]}
            alt={place.nombre}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            Sin foto
          </div>
        )}
        <div className="absolute top-4 left-4">
           <Link href="/">
            <Button variant="ghost" className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 h-auto">
              <ArrowLeft className="h-5 w-5 text-black" />
            </Button>
           </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 h-auto text-black">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 h-auto text-black">
              <Heart className="h-5 w-5" />
            </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-t-3xl md:rounded-xl shadow-sm border border-zinc-100 p-6 md:p-8">
            
            {/* Title & Badge */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                            {place.tipo}
                        </span>
                        <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-black font-bold text-sm ml-1">{place.promedioRating || "New"}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{place.nombre}</h1>
                    <div className="flex flex-col gap-1 text-zinc-500 text-sm">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{place.direccion}, {place.zona}</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>{place.horario}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col gap-3">
                     <Button className="flex-1 bg-black text-white px-6">Ir ahora</Button>
                     <Button variant="outline" className="flex-1">Ver menú</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Info & Menu */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-3">Sobre el lugar</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            {place.descripcion || "Sin descripción disponible."}
                        </p>
                    </section>
                    
                    <hr className="border-zinc-100" />

                    <section>
                         <h2 className="text-xl font-bold mb-4">Menú destacado</h2>
                         {place.menu && place.menu.length > 0 ? (
                            <div className="space-y-4">
                                {place.menu.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start group">
                                        <div>
                                            <h3 className="font-medium group-hover:text-emerald-700 transition-colors">{item.nombre}</h3>
                                            <p className="text-sm text-zinc-500 line-clamp-1">{item.descripcion}</p>
                                        </div>
                                        <div className="font-bold text-zinc-900">
                                            Bs {item.precio}
                                        </div>
                                    </div>
                                ))}
                            </div>
                         ) : (
                             <p className="text-zinc-400 italic">No hay menú registrado.</p>
                         )}
                    </section>
                </div>

                {/* Sidebar / Map (Placeholder until we fix map import if needed, or if we want mini map) */}
                <div className="space-y-6">
                    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                         <h3 className="font-bold mb-2 text-sm">Ubicación</h3>
                         {/* We can re-use the Map component here but ensure it handles single marker properly. For now simple placeholder */}
                         <div className="aspect-video bg-zinc-200 rounded-lg flex items-center justify-center text-zinc-400 text-xs">
                             Mapa Component Aquí
                         </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
