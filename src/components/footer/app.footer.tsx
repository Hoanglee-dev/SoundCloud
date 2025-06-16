"use client";
import { useHasMounted } from "@/app/utils/customeHooks";
import { AppBar, Container } from "@mui/material";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container sx={{ display: "flex", gap: "10px" }}>
          <AudioPlayer
            autoPlay
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            onPlay={(e) => console.log("onPlay")}
            style={{
              boxShadow: "unset",
              background: "#f2f2f2",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              minWidth: 100,
              justifyContent: "center",
            }}
          >
            <div style={{ color: "#ccc" }}>Hoang</div>
            <div style={{ color: "black" }}>Who am I</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
