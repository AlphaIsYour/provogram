import {
  Award,
  Code,
  Database,
  Palette,
  Server,
  Smartphone,
  Brain,
  Globe,
  Shield,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  Code,
  Database,
  Palette,
  Server,
  Smartphone,
  Brain,
  Globe,
  Shield,
  Default: Award,
};

// Ini adalah komponen yang akan merender ikon berdasarkan nama string dari database
export const IconRenderer = ({
  iconName,
  ...props
}: { iconName: string | null } & LucideProps) => {
  const IconComponent =
    iconName && iconMap[iconName] ? iconMap[iconName] : iconMap.Default;
  return <IconComponent {...props} />;
};
