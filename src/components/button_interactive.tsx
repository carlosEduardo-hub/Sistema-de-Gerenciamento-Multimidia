import { useNavigate } from "react-router";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
    const navigate = useNavigate();

  return (
    <div className="flex gap-4">
        <InteractiveHoverButton className="bg-fulvouscolor" onClick={() => navigate("/login")}>Login</InteractiveHoverButton>
        <InteractiveHoverButton className="bg-fulvouscolor" onClick={() => navigate("/register")}>Cadastro</InteractiveHoverButton>
    </div>
  );
}
