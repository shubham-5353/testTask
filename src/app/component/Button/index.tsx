import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ButtonIcon = ({ buttonType }: any) => {
  const _renderButton = (type: string) => {
    switch (type) {
      case "plus":
        return <PlusIcon className="h-4 w-4" />;

      case "minus":
        return <MinusIcon className="h-4 w-4" />;

      case "delete":
        return <TrashIcon className="h-4 w-4" />;
      default:
        <ArrowRightIcon className="h-4 w-4" />;
    }
  };
  
  return (
    <Button variant="outline" size="icon">
      {_renderButton(buttonType)}
    </Button>
  );
};

export default ButtonIcon;
