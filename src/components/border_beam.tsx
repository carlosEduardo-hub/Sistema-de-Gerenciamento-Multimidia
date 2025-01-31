import { AnimatedBeamMultipleOutputDemo } from "./animated_beam";
import { InteractiveHoverButtonDemo } from "./button_interactive";
import { TextAnimateDemo } from "./text_gradient";
import { BorderBeam } from "./ui/border-beam";

export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[500px] w-[350px] sm:h-[600px] sm:w-[500px] flex-col items-center justify-start overflow-hidden rounded-lg border-2 border-gray-700 bg- shadow-xl">
      {/* Texto dentro do card */}
      <div className="flex flex-col justify-center items-center space-y-4">
        <span className="mt-4 text-fulvouscolor font-bold text-5xl">
          <TextAnimateDemo text="Contentify" />
        </span>

        <p className="text-sm text-center italic text-gray-500 opacity-75 sm:px-6 px-7 whitespace-pre-line">
          <TextAnimateDemo
            text="Bem-vindo ao Contentify:O seu sistema de upload de arquivos para armazenar e gerenciar seu conteúdo com facilidade!"
          />
        </p>

        <div>
          <AnimatedBeamMultipleOutputDemo />
        </div>

        <div>
          <InteractiveHoverButtonDemo />
        </div>
      </div>

      {/* Borda com efeito de linha animada */}
      <div className="absolute top-0 left-0 w-full h-[4px]">
        <BorderBeam
          size={500}
          duration={12}
          delay={9}
          className="h-[4px] w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[4px]">
        <BorderBeam
          size={500}
          duration={12}
          delay={9}
          className="h-[4px] w-full"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-[4px]">
        <BorderBeam
          size={500}
          duration={12}
          delay={9}
          className="w-[4px] h-full"
        />
      </div>
      <div className="absolute top-0 right-0 h-full w-[4px]">
        <BorderBeam
          size={500}
          duration={12}
          delay={9}
          className="w-[4px] h-full"
        />
      </div>
    </div>
  );
}
