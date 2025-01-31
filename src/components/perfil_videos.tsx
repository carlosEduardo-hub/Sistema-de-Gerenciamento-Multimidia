import { HeroVideoDialogDemoTopInBottomOut } from './capa_video';
import { FileInfomations } from "@/components/file_infomations";

export function Videos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-perfilcolor p-4 rounded flex flex-col items-center gap-4 "
        >
          <HeroVideoDialogDemoTopInBottomOut />

          <FileInfomations />
        </div>
      ))}
    </div>
  );
}
