import { useEffect, useState } from "preact/hooks";

const colors = ["red", "orange", "green", "teal", "purple", "pink"] as const;
type Color = (typeof colors)[number];

export default function ColorPicker() {
  const [currentColor, setColor] = useState<Color>("purple");

  useEffect(() => {
    const defaultColor = window.localStorage.getItem("color");
    if (defaultColor && colors.includes(defaultColor as Color)) {
      setColor(defaultColor as Color);
    }
  }, []);

  return (
    <div class="color-picker">
      {colors.map((color) => (
        <button
          className="color-picker-button"
          data-active={color === currentColor}
          style={{
            "--color": `var(--color-core-${color})`,
          }}
          onClick={() => {
            setColor(color);
            document.documentElement.style.setProperty(
              "--color-brand-primary",
              `var(--color-core-${color})`
            );
            window.localStorage.setItem("color", color);
          }}
        ></button>
      ))}
    </div>
  );
}
