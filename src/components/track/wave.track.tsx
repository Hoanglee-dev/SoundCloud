"use client";

import { useWaveSurfer } from "@/app/utils/customeHooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { PauseCircleOutline, Timer } from "@mui/icons-material";
import { renderToHTML } from "next/dist/server/render";
import { Tooltip } from "@mui/material";

const arrComments = [
  {
    id: 1,
    avatar: "http://localhost:8000/images/chill1.png",
    moment: 10,
    user: "username 1",
    content: "just a comment1",
  },
  {
    id: 2,
    avatar: "http://localhost:8000/images/chill1.png",
    moment: 30,
    user: "username 2",
    content: "just a comment3",
  },
  {
    id: 3,
    avatar: "http://localhost:8000/images/chill1.png",
    moment: 50,
    user: "username 3",
    content: "just a comment3",
  },
];

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const filename = searchParams.get("audio");
  const [time, setTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");

  const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    let gradient;
    let progressGradient;
    if (typeof window !== undefined) {
      const canvas = document.createElement("canvas");
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
      wavesurfer.on("interaction", () => {
        wavesurfer.play();
      }),
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

  const calTimeComment = (moment: number) => {
    const hardCodeTime = 199;
    const positionComment = (moment / hardCodeTime) * 100;
    return `${positionComment}%`;
  };
  return (
    <>
      <div style={{ padding: "10px 0 " }}>
        <div
          style={{
            display: "flex",
            gap: 15,
            padding: 20,
            height: 400,
            background:
              "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
          }}
        >
          <div
            className="left"
            style={{
              width: "75%",
              height: "calc(100% - 10px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="info" style={{ display: "flex" }}>
              <div>
                <div
                  onClick={() => onPlayPause()}
                  style={{
                    borderRadius: "50%",
                    background: "#f50",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying === true ? (
                    <PauseCircleOutline sx={{ fontSize: 30, color: "white" }} />
                  ) : (
                    <PauseCircleOutline sx={{ fontSize: 30, color: "white" }} />
                  )}
                </div>
              </div>
              <div style={{ marginLeft: 20 }}>
                <div
                  style={{
                    padding: "0 5px",
                    background: "#333",
                    fontSize: 30,
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  Hỏi Dân IT's song
                </div>
                <div
                  style={{
                    padding: "0 5px",
                    marginTop: 10,
                    background: "#333",
                    fontSize: 20,
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  Eric
                </div>
              </div>
            </div>

            <div ref={containerRef} className="wave-form-container">
              <div className="time"> {time}</div>
              <div className="duration">{duration}</div>
              <div ref={hoverRef} className="hover"></div>
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  height: "30px",
                  width: "100%",
                  bottom: "0",
                  background: "#cccc",
                  opacity: "inherit",
                }}
              ></div>
              <div
                className="list-comment"
                style={{
                  zIndex: 20,
                  position: "relative",
                  display: "flex",
                }}
              >
                {arrComments.map((item) => {
                  return (
                    <Tooltip title={item.content} arrow>
                      <img
                        onPointerMove={() => {
                          const hover = hoverRef.current!;
                          hover.style.width = calTimeComment(item.moment + 3);
                        }}
                        className={"" + item.id}
                        key={item.id}
                        style={{
                          width: 20,
                          height: 20,
                          top: 50,
                          left: calTimeComment(item.moment),
                          position: "absolute",
                        }}
                        src={item.avatar}
                        alt=""
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="right"
            style={{
              width: "25%",
              padding: 15,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#ccc",
                width: 250,
                height: 250,
              }}
            ></div>
          </div>
        </div>

        <button onClick={() => onPlayPause()} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

export default WaveTrack;
