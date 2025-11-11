import { ChevronDown } from "lucide-react";

export const Select: React.FC<{
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  label?: string;
}> = ({ value, onChange, children, placeholder, label }) => (
  <label className="flex items-center gap-2 text-sm text-gray-300">
    {label && <span className="sr-only">{label}</span>}
    <div className="relative w-56">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-10 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
    </div>
  </label>
);
