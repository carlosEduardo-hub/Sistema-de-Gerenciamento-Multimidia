import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputFile } from "./input_file";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { api } from "../api/token"; // Importação da instância Axios configurada
import { Upload } from "lucide-react";

// Esquema de validação com Zod
const schema = z
  .object({
    file: z
      .custom<File>((value) => value instanceof File, {
        message: "Você deve selecionar um arquivo.",
      })
      .refine(
        (file) =>
          [
            "image/jpeg",
            "image/png",
            "video/mp4",
            "audio/mpeg",
            "audio/mp3",
          ].includes(file?.type),
        {
          message:
            "Apenas arquivos JPEG, PNG, MP4, MP3 ou MPEG são permitidos.",
        }
      ),
    description: z.string().min(1, { message: "A descrição é obrigatória." }),
    tags: z
      .string()
      .min(1, { message: "Adicione pelo menos uma tag separada por vírgulas." })
      .refine(
        (value) => value.split(",").filter((tag) => tag.trim()).length > 0,
        {
          message: "As tags não podem estar vazias.",
        }
      ),
    genre: z.string().optional(), 
  })
  .superRefine((data, ctx) => {
    const isAudioOrVideo = ["video/mp4", "audio/mpeg", "audio/mp3"].includes(
      data.file?.type
    );
    if (isAudioOrVideo && (!data.genre || !data.genre.trim())) {
      ctx.addIssue({
        code: "custom",
        path: ["genre"],
        message: "O gênero é obrigatório para arquivos de áudio ou vídeo.",
      });
    }
  });


type FormValues = z.infer<typeof schema>;

export function DialogDemo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const selectedFile = watch("file");
  const isGenreEnabled =
    selectedFile &&
    ["video/mp4", "audio/mpeg", "audio/mp3"].includes(selectedFile.type);

  useEffect(() => {
    if (!isGenreEnabled) {
      resetField("genre");
    }
  }, [isGenreEnabled, resetField]);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    // Adiciona os campos ao FormData
    formData.append("file", data.file);
    formData.append("description", data.description);
    formData.append("tags", data.tags); // Envia diretamente como string no formato "tag1,tag2,tag3"
    if (data.genre) {
      formData.append("genre", data.genre);
    }

    console.log("FormData enviado:", {
      file: data.file.name,
      description: data.description,
      tags: data.tags,
      genre: data.genre || "Não especificado",
    });

    try {
      setUploading(true);

      const userId = sessionStorage.getItem("user_id");
      const token = sessionStorage.getItem("token");

      if (userId) {
        formData.append("user_id", userId);
      }

      const response = await api.post("/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });

      console.log("Upload bem-sucedido:", response.data);
      reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-fulvouscolor text-white px-4 py-2 rounded shadow hover:bg-fulvoushover transition-all flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-2">
            <Upload size={20} />
            Adicionar arquivo multimídia
          </span>
          <span className="sm:hidden">
            <Upload size={20} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primarylemon">
        <DialogHeader>
          <DialogTitle>Adicionar arquivo</DialogTitle>
          <DialogDescription>
            Faça o upload de um arquivo multimídia.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-4">
            <div>
              <InputFile
                onFileChange={(file: File | null) => {
                  if (file) {
                    setValue("file", file, { shouldValidate: true });
                  }
                }}
              />
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
              />
              {errors.description?.message && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="tags" className="text-right">
                Tags (separadas por vírgulas)
              </Label>
              <input
                id="tags"
                type="text"
                {...register("tags")}
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
                placeholder="Ex: tag1, tag2, tag3"
              />
              {errors.tags?.message && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="genre" className="text-right">
                Gênero (somente para áudio/vídeo)
              </Label>
              <input
                id="genre"
                type="text"
                {...register("genre")}
                className={`w-full px-3 py-2 border rounded outline-none bg-gray-200 ${
                  isGenreEnabled
                    ? "bg-gray-200"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                placeholder="Ex: Comédia, Rock, etc."
                disabled={!isGenreEnabled}
              />
              {errors.genre?.message && (
                <p className="text-red-500 text-sm">{errors.genre.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-fulvouscolor text-white hover:bg-fulvoushover"
              disabled={uploading}
            >
              {uploading ? "Enviando..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
