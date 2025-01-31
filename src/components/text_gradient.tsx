import { TextAnimate } from "../components/ui/text-animate";

interface TextAnimateProps {
    text: string;
}

export function TextAnimateDemo({ text }: TextAnimateProps) {
  return (
    <TextAnimate animation="blurInUp" by="character" className="whitespace-pre-line">
      {text}
    </TextAnimate>
  );
}
