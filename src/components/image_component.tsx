import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  export function DialogImageDemo() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <img
            src="/robot_perfil.png" 
            alt="Imagem pequena"
            className="w-auto h-auto object-cover cursor-pointer rounded shadow transition duration-200 hover:brightness-75"
          />
        </DialogTrigger>
        <DialogContent className="flex justify-center items-center bg-black border-none text-white">
          <img
            src="/robot_perfil.png" 
            alt="Imagem ampliada"
            className="max-w-full max-h-[90vh] rounded shadow-lg"
          />
        </DialogContent>
      </Dialog>
    );
  }
  