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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "./ui/input";
import { Pencil } from "lucide-react";

// Esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  tags: z
    .string()
    .refine(
      (value) => value.split(",").filter((tag) => tag.trim()).length > 0,
      {
        message: "Adicione pelo menos uma tag separada por vírgulas.",
      }
    ),
});

// Tipagem do formulário
type FormValues = z.infer<typeof schema>;

interface DialogEditDemoProps {
  fileData: {
    name: string;
    description: string;
    tags: string[];
  };
}

export function DialogEditDemo({ fileData }: DialogEditDemoProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: fileData.name,
      description: fileData.description,
      tags: fileData.tags.join(", "), // Formatação das tags para um campo de texto
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: FormValues) => {
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());
    console.log("Dados enviados:", {
      name: data.name,
      description: data.description,
      tags: tagsArray,
    });
    reset(); // Reseta o formulário
    setIsDialogOpen(false); // Fecha o modal após o envio
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Pencil size={20} className="text-gray-600 hover:text-gray-800 transition-all" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primarylemon">
        <DialogHeader>
          <DialogTitle>Editar informações</DialogTitle>
          <DialogDescription>
            Preencha os campos para atualizar as informações.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-4">
            {/* Campo Name */}
            <div>
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
              />
              {errors.name?.message && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Campo Description */}
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

            {/* Campo Tags */}
            <div>
              <Label htmlFor="tags" className="text-right">
                Tags (separadas por vírgulas)
              </Label>
              <textarea
                id="tags"
                {...register("tags")}
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
                placeholder="Ex: tag1, tag2, tag3"
              />
              {errors.tags?.message && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-fulvouscolor text-white hover:bg-fulvoushover"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
