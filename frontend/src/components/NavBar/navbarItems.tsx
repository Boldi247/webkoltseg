import type { JSX } from "react";
import { FaHome } from "react-icons/fa";

interface iNavbarItem {
    label: string;
    icon?: string | React.ReactNode | JSX.Element;
    link: string;
}

export const navbarItems: iNavbarItem[] = [
    {
        label: "Kezdőlap",
        icon: <FaHome/>,
        link: "/",
    },
];
