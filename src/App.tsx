import { useEffect, useState } from "react";
import { SpinnerInfinity } from "spinners-react";
import { FiDownloadCloud } from "react-icons/fi";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { FaGithub, FaGlobeAmericas } from "react-icons/fa";
const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

const gitRepo = "https://github.com/zeriaxdev/moldifier";
const publicUrl = "https://zeriax.com";

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<File | any>();
  const [mold, setMold] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [qualityVideo, setQualityVideo] = useState(70);
  const [qualityAudio, setQualityAudio] = useState(20);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    if (ffmpeg.isLoaded()) {
      setReady(true);
    } else {
      load();
    }
  }, []);

  const moldify = async () => {
    ffmpeg.FS("writeFile", "original.mp4", await fetchFile(video));
    setLoading(true);

    await ffmpeg.run(
      "-i",
      "original.mp4",
      "-b:v",
      `${qualityVideo}k`,
      "-b:a",
      `${qualityAudio}k`,
      "outmolded.mp4"
    );

    const data = ffmpeg.FS("readFile", "outmolded.mp4");

    const url = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );

    setMold(url);
    console.log(video);
    setLoading(false);
  };

  return (
    <div className="w-screen font-spaceMono bg-zinc-800 text-green-400 text-center">
      {ready ? (
        <div className="grid place-items-center justify-center h-screen">
          <div>
            <div className="m-3">
              <a
                className="text-5xl font-extrabold hover:underline hover:cursor-help"
                href={gitRepo}
              >
                moldifier
              </a>
            </div>
            <div
              className={`bg-zinc-900 rounded-3xl p-6 border-dashed border-8 border-green-300/25 m-3 grid place-items-center`}
            >
              <h1 className="text-xl font-bold">submit your file</h1>
              <div className="m-2">
                <input
                  className="transition-all block w-full text-sm text-green-300/50 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-green-400 
                  hover:file:bg-green-700/25 hover:file:cursor-pointer"
                  type="file"
                  id="file"
                  accept="video/mp4"
                  onChange={(e) => {
                    setVideo(e.target.files?.item(0));
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="m-2">
                  <h1 className="text-lg font-bold mb-1">video quality</h1>
                  <input
                    className="transition-all block w-full text-sm text-green-300/50 file:py-2 file:px-4 bg-zinc-800
                              p-2 rounded-xl placeholder:text-zinc-100/30"
                    type="number"
                    id="qualityVideo"
                    placeholder="video quality"
                    defaultValue={qualityVideo}
                    onChange={(e) => {
                      setQualityVideo(
                        Number(e.target.value.match(/\d+$/)?.toString())
                      );
                    }}
                  />
                </div>
                <div className="m-2">
                  <h1 className="text-lg font-bold mb-1">audio quality</h1>
                  <input
                    className="transition-all block w-full text-sm text-green-300/50 file:py-2 file:px-4 bg-zinc-800
                              p-2 rounded-xl placeholder:text-zinc-100/30"
                    type="number"
                    id="qualityAudio"
                    placeholder="audio quality"
                    defaultValue={qualityAudio}
                    onChange={(e) => {
                      setQualityAudio(
                        Number(e.target.value.match(/\d+$/)?.toString())
                      );
                    }}
                  />
                </div>
              </div>

              <div className="mt-1">
                <button
                  className={`bg-green-400 text-green-900 font-bold p-2 px-3 rounded-xl transition-all 
                            hover:bg-green-500 hover:text-green-100 hover:rounded-2xl hover:tracking-wider
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none 
                            ${loading ? "hover:cursor-progress" : ""}`}
                  onClick={moldify}
                  disabled={video ? false : true}
                >
                  {loading ? "loading..." : "moldify"}
                </button>
              </div>
              {mold ? (
                <div className="mt-5 grid place-items-center">
                  <h1 className="text-xl font-bold mb-2">moldified file</h1>
                  <video
                    className="rounded-lg block max-w-lg max-h-96 md:max-w-sm md:max-h-60"
                    src={mold}
                    controls
                    autoPlay
                    loop
                  />
                  <div>
                    <button
                      className={`mt-5 bg-transparent text-green-400 font-bold p-2 px-3 rounded-xl inline-flex
                                border-green-400 border-2 border-opacity-50
                              hover:bg-green-400 hover:text-green-900 transition-all place-items-center`}
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = mold;
                        a.download =
                          video.name.replace(".mp4", "MOLDY.mp4") ||
                          "moldy_output.mp4";
                        a.click();
                        a.remove();
                      }}
                    >
                      <FiDownloadCloud className="mr-3" />
                      download the mold
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex justify-center mt-1">
              <a href={gitRepo}>
                <FaGithub className="w-10 h-10 m-1 transition-all hover:text-white" />
              </a>
              <a href={publicUrl}>
                <FaGlobeAmericas className="w-10 h-10 m-1 transition-all hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-screen">
          <SpinnerInfinity
            speed={150}
            size={150}
            color="#4ADE80"
            secondaryColor="#1F1F22"
          />
        </div>
      )}
    </div>
  );
}

export default App;
