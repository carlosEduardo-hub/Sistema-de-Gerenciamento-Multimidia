import {DialogImageDemo}   from "./image_component";
import { FileInfomations } from "@/components/file_infomations";


export function Fotos() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-perfilcolor p-4 rounded  flex flex-col items-center gap-4 shadow-both"
        >
          <DialogImageDemo />
          
          <FileInfomations />
        </div>
      ))}
    </div>
    );
  }
  