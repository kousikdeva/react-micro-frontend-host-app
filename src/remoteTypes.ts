declare module "remoteApp/Button" {
    import { FC } from "react";
    const Button: FC<{ onClick: () => void; children: React.ReactNode; }>;
    export default Button;
}