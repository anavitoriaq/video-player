"use client";

import { useRef, useState } from "react";

const videos = [
  {
    titulo: "Vídeo 1",
    arquivo: "/video1.mp4",
  },
  {
    titulo: "Vídeo 2",
    arquivo: "/video2.mp4",
  },
  {
    titulo: "Vídeo 3",
    arquivo: "/video3.mp4",
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [indice, setIndice] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [volume, setVolume] = useState(1);
  const [filtro, setFiltro] = useState("none");

  const filtros: Record<string, string> = {
  none: "none",

  red:
    "grayscale(100%) sepia(100%) saturate(700%) hue-rotate(-50deg)",

  blue:
    "grayscale(100%) sepia(100%) hue-rotate(180deg)",

  green:
    "grayscale(100%) sepia(100%) hue-rotate(70deg)",

  gray:
    "grayscale(100%)",
  };

  const playPause = () => {
    if (!videoRef.current) return;

    if (tocando) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setTocando(!tocando);
  };

  const mudarVolume = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = Number(e.target.value);

    setVolume(valor);

    if (videoRef.current) {
      videoRef.current.volume = valor;
    }
  };

  const mudarTempo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = Number(e.target.value);

    if (videoRef.current) {
      videoRef.current.currentTime = valor;
      setTempo(valor);
    }
  };

  const avancar = () => {
    if (videoRef.current)
      videoRef.current.currentTime += 10;
  };

  const voltar = () => {
    if (videoRef.current)
      videoRef.current.currentTime -= 10;
  };

  const proximo = () =>
    setIndice(
      (prev) => (prev + 1) % videos.length
    );

  const anterior = () =>
    setIndice(
      (prev) =>
        prev === 0
          ? videos.length - 1
          : prev - 1
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex justify-center items-center p-8">

      <div className="w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-center text-5xl font-bold text-white mb-8">
          🎬 Video Player
        </h1>

        <div className="rounded-3xl overflow-hidden shadow-2xl">

          <video
            ref={videoRef}
            src={videos[indice].arquivo}
            style={{
              filter: filtros[filtro],
            }}
            onTimeUpdate={() => {
              if (!videoRef.current)
                return;

              setTempo(
                videoRef.current.currentTime
              );

              setDuracao(
                videoRef.current.duration
              );
            }}
            className="w-full"
          />

        </div>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={anterior}
            className="rounded-full bg-white/10 px-5 py-3 text-white"
          >
            ⏮
          </button>

          <button
            onClick={voltar}
            className="rounded-full bg-blue-600 px-5 py-3 text-white"
          >
            -10s
          </button>

          <button
            onClick={playPause}
            className="rounded-full bg-green-500 px-8 py-4 text-white text-xl"
          >
            {tocando ? "⏸" : "▶"}
          </button>

          <button
            onClick={avancar}
            className="rounded-full bg-blue-600 px-5 py-3 text-white"
          >
            +10s
          </button>

          <button
            onClick={proximo}
            className="rounded-full bg-white/10 px-5 py-3 text-white"
          >
            ⏭
          </button>

        </div>

        <div className="mt-8">

          <p className="text-white mb-2">
            Tempo
          </p>

          <input
            type="range"
            min="0"
            max={duracao}
            value={tempo}
            onChange={mudarTempo}
            className="w-full accent-fuchsia-500"
          />

        </div>

        <div className="mt-6">

          <p className="text-white mb-2">
            Volume
          </p>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={mudarVolume}
            className="w-full accent-fuchsia-500"
          />

        </div>

        <div className="mt-8">

          <p className="text-white mb-3">
            Filtros
          </p>

          <div className="flex flex-wrap gap-3">

            {[
              ["none","Normal"],
              ["red","Vermelho"],
              ["blue","Azul"],
              ["green","Verde"],
              ["gray","Cinza"],
            ].map(([id,nome]) => (

              <button
                key={id}
                onClick={() =>
                  setFiltro(id)
                }
                className={`rounded-full px-5 py-2 text-white transition ${
                  filtro === id
                    ? "bg-fuchsia-600"
                    : "bg-white/10"
                }`}
              >
                {nome}
              </button>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}