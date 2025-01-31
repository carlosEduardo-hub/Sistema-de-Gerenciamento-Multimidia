import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[150px] bg-fulvouscolor gap-2 text-white hover:bg-fulvoushover transition-all border-none focus:ring-2 focus:ring-offset-2 focus:ring-fulvoushover flex items-center justify-center">
        <Filter size={20} />
        <SelectValue placeholder="Filtro" />
      </SelectTrigger>
      <SelectContent className="bg-primarylemon">
        <SelectGroup>
          <SelectLabel>Conteúdo</SelectLabel>
          <SelectItem
            value="Todos"
            className="hover:bg-fulvoushover focus:bg-fulvoushover focus:text-white transition-all"
          >
            Todos
          </SelectItem>
          <SelectItem
            value="Imagens"
            className="hover:bg-fulvoushover focus:bg-fulvoushover focus:text-white transition-all"
          >
            Imagens
          </SelectItem>
          <SelectItem
            value="Vídeos"
            className="hover:bg-fulvoushover focus:bg-fulvoushover focus:text-white transition-all"
          >
            Vídeos
          </SelectItem>
          <SelectItem
            value="Áudios"
            className="hover:bg-fulvoushover focus:bg-fulvoushover focus:text-white transition-all"
          >
            Áudios
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
