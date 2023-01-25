import * as Slider from "@radix-ui/react-slider";

interface SliderInputProps {
  handleLength: (a: number) => void;
}

export default function SliderInput({ handleLength }: SliderInputProps) {
  return (
    <Slider.Root
      className="w-full h-2 bg-gray-very-dark relative flex items-center select-none touch-none"
      min={5}
      max={20}
      step={1}
      onValueChange={(e) => handleLength(e[0])}
    >
      <Slider.Track className="relative h-full flex grow">
        <Slider.Range className="absolute h-full rounded-full bg-neon-green" />
      </Slider.Track>
      <Slider.Thumb className="flex w-6 h-6 bg-white rounded-xl cursor-pointer hover:bg-gray-very-dark hover:border-2 hover:border-neon-green" />
    </Slider.Root>
  );
}
