import { AlertDialogDemo } from "./alert_dialog";
import { DialogEditDemo } from "./edit_file_informations";

export function FileInfomations() {
  // Dados do arquivo que já existem (exemplo)
  const fileData = {
    name: "Arquivo 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio dolorem magnam fuga nostrum quaerat at tempora.",
    tags: ["Html", "Css", "JavaScript", "Canvas"],
  };

  return (
    <>
      <div className="w-full flex justify-between px-2">
        <button>
          <DialogEditDemo fileData={fileData} />
        </button>
        <p className="text-gray-600 font-semibold">{fileData.name}</p>
        <button>
          <AlertDialogDemo />
        </button>
      </div>
      <hr className="w-full border-gray-200" />
      <div className="max-w-full overflow-hidden flex flex-col gap-2">
        <p className="font-semibold text-gray-500 italic opacity-75">
          Gênero:{" Natureza "}
        </p>
        <p className="break-words overflow-wrap">{fileData.description}</p>
      </div>
      <hr className="w-full border-gray-200" />
      <footer>
        <ul className="flex flex-wrap items-center gap-2 font-serif font-normal opacity-[0.6] max-w-full overflow-hidden">
          {fileData.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </footer>
    </>
  );
}
