import { FC, PropsWithChildren } from "react";
import "@/app/shared/css/globals.css";

const Rootlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
};

export default Rootlayout;
