import * as CheckBox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";

interface CheckboxProps {
  label: string;
  handleCheckbox: (a: boolean) => void;
  id: number;
}

export default function Checkbox({ label, handleCheckbox, id }: CheckboxProps) {
  const [isChecked, setisChecked] = useState<boolean>(false);

  useEffect(() => {
    handleCheckbox(isChecked);
  }, [isChecked]);

  return (
    <div className="flex items-center gap-4">
      <CheckBox.Root
        className={clsx(
          "w-6 h-6 border-2 border-white hover:border-neon-green",
          {
            ["border-none bg-neon-green"]: isChecked,
          }
        )}
        id={`${id}`}
        onCheckedChange={() => setisChecked(!isChecked)}
      >
        <CheckBox.Indicator>
          <BsCheck size={24} />
        </CheckBox.Indicator>
      </CheckBox.Root>
      <label className="text-white" htmlFor={`${id}`}>
        {label}
      </label>
    </div>
  );
}
