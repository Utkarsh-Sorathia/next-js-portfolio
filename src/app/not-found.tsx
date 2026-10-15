import NotFoundClient from "./not-found-client";
import { isLightDesign, THEME_COLOR } from "@/config/design";
import LightNotFound from "@/Components/light/LightNotFound";

export const metadata = {
  title: "404 | Page Not Found",
  description: "The page you are looking for does not exist on Utkarsh Sorathia's portfolio.",
};
     
export const viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
};

export default function NotFound() {
  return isLightDesign ? <LightNotFound /> : <NotFoundClient />;
}
