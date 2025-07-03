import { Code, Globe, Palette, Server, Smartphone } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Globe,
  Palette,
  Server,
  Smartphone,
};

export const getIconComponent = (
  iconName: string | null | undefined
): React.ElementType => {
  if (!iconName) return Code;
  return iconMap[iconName] || Code;
};
