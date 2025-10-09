import NotFoundClient from "./not-found-client";

export const metadata = {
  title: "404 | Page Not Found",
  description: "The page you are looking for does not exist on Utkarsh Sorathia's portfolio.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
