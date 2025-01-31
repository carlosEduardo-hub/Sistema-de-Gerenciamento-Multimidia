import  { HeroVideoDialogDemoTopInBottomOut }  from "../components/capa_video";
// import AudioPlayerComponent from "../components/audio_player_component";
import { FileInfomations } from "@/components/file_infomations";
// import { DialogImageDemo } from "@/components/image_component";

export function Galeria() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-perfilcolor p-4 rounded flex flex-col items-center gap-4 shadow-both"
        >
          {/* <DialogImageDemo /> */}
          <HeroVideoDialogDemoTopInBottomOut />
          {/* <AudioPlayerComponent
            src="/audios/musicateste.mp3"
            autoPlay={false}
            loop={false}
            volume={0.5}
          /> */}
          <FileInfomations />
        </div>
      ))}
    </div>
  );
}
  