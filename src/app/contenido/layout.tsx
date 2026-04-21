import ReactDOM from "react-dom";

export default function ContenidoLayout({ children }: { children: React.ReactNode }) {
  ReactDOM.preload("/images/backgrounds/backgroundFULL.webp", {
    as: "image",
    fetchPriority: "high",
  });
  return <>{children}</>;
}
