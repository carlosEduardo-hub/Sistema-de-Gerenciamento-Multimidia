import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";

interface InputFileProps {
  onFileChange: (file: File | null) => void;
}

export function InputFile({ onFileChange }: InputFileProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onFileChange(file);
  };

  return (
    <label
      htmlFor="file"
      className="flex flex-col w-full max-w-sm items-center border border-dashed border-slate-600 bg-gray-200 hover:bg-gray-300 transition-all rounded-md gap-1.5 cursor-pointer p-4"
    >
      <CloudUpload size={30} />
      <span>{fileName || "Upload do Arquivo"}</span>
      <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
    </label>
  );
}
