import AudioPlayerComponent from "./audio_player_component";
import { FileInfomations } from "@/components/file_infomations";

export function Audio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-perfilcolor p-4 rounded  flex flex-col items-center gap-4 shadow-both"
        >
          <AudioPlayerComponent
                src="/audios/musicateste.mp3"
                autoPlay={false}
                loop={false}
                volume={0.5} 
          />
          
          <FileInfomations />
        </div>
      ))}
    </div>
  );
}
