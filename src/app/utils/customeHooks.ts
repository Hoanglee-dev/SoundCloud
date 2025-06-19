import { Nuosu_SIL } from "next/font/google";
import { useEffect, useState } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

export const useHasMounted = () => {
    const [hasMouted,setHasMounted] = useState<boolean>(false)
    useEffect(() => {
setHasMounted(true)
    },[])
    return hasMouted
}


export  const useWaveSurfer = (
  containerRef: React.RefObject<HTMLDivElement>,
  option: Omit<WaveSurferOptions, "container">
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      ...option,
      container: containerRef.current,
    });
    setWavesurfer(ws);
    return () => {
      ws.destroy();
    };
  }, [option, containerRef]);
  return wavesurfer;
};
