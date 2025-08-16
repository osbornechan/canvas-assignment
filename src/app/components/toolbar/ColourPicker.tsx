import { HexColorPicker } from "react-colorful";

export default function ColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) {
  return (
    <HexColorPicker color={color} onChange={onChange} style={{ padding: 10 }} />
  );
}
