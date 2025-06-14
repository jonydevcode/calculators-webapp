import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { type ChangeEvent } from "react";

interface InputSliderProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: number;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  onInputChange: (value: number) => void;
  onSliderChange: (value: number) => void;
}

export default function InputSlider({
  id,
  label,
  placeholder = "",
  value = 0,
  sliderMin = 0,
  sliderMax = 100,
  sliderStep = 1,
  onInputChange,
  onSliderChange,
}: InputSliderProps) {
  const handleInputChanged = function (event: ChangeEvent<HTMLInputElement>) {
    onInputChange(Number(event.target.value));
  };

  const handleSliderChanged = function (value: number[]) {
    onSliderChange(value[0]);
  };

  return (
    <div>
      <Label htmlFor={id} className="my-2">
        {label}
      </Label>
      <div className="flex gap-5">
        <Input
          type="number"
          id={id}
          placeholder={placeholder}
          className="relative w-1/3"
          value={value}
          onChange={handleInputChanged}
        />
        <Slider
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          className=""
          value={[value]}
          onValueChange={handleSliderChanged}
        />
      </div>
    </div>
  );
}
