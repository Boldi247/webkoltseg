import { UNPROTECTED_PATHS } from "../../constants/constants";

interface iNavbarItem {
    label: string;
    path: string;
}

export const navbarItems: iNavbarItem[] = [
    {
        label: "Főoldal",
        path: UNPROTECTED_PATHS.HOME
    },
    {
        label: "Funkciók",
        path: UNPROTECTED_PATHS.FUNCTIONS
    },
    {
        label: "Előnyök",
        path: UNPROTECTED_PATHS.ADVANTAGES
    },
    {
        label: "Árak",
        path: UNPROTECTED_PATHS.PRICING
    },
    {
        label: "Kapcsolat",
        path: UNPROTECTED_PATHS.CONTACT
    },
];