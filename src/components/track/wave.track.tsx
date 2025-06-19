"use client";

import { useWaveSurfer } from "@/app/utils/customeHooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { Timer } from "@mui/icons-material";
const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const filename = searchParams.get("audio");
  const [time, setTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");

  const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    const canvas = document.createElement("canvas");
    let gradient;
    let progressGradient;
    if (typeof window !== undefined) {
      const ctx = canvas.getContext("2d")!;
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1);
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
      height: 80,
      url: `/api?audio=${filename}`,
    };
  }, []);

  const wavesurfer = useWaveSurfer(containerRef, optionMemo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
      setIsPlaying(wavesurfer.isPlaying());
    }
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      //@ts-ignore
      (e) => (hover.style.width = `${e.offsetX}px`)
    );
    const sub = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer?.on("decode", (duration) => {
        setDuration(formatTime(duration));
      }),
      wavesurfer?.on(
        "timeupdate",

        (currentTime) => {
          setTime(formatTime(currentTime));
        }
      ),
    ];

    return () => {
      sub.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <>
      <div style={{ marginTop: 100 }}>
        <div ref={containerRef} className="wave-form-container">
          <div className="time"> {time}</div>
          <div className="duration">{duration}</div>
          <div className="hover"></div>
        </div>

        <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

export default WaveTrack;
