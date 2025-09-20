import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { BiCalculator } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UNPROTECTED_PATHS } from "../../constants/constants";
import Icon from "../Icon/Icon";
import CustomLink from "../Link/Link";
import Text from "../Text/Text";
import "./NavBar.css";
import { navbarItems } from "./navbarItems";

const NavBar = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    const navigateToLogin = useCallback(() => {
        navigate(UNPROTECTED_PATHS.LOGIN);
    }, [navigate]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-content">
                <div className="navbar-title-wrapper">
                    <div className="navbar-title-icon-wrapper">
                        <Icon
                            icon={BiCalculator}
                            size={20}
                            color="var(--text-color-white)"
                        />
                    </div>
                    <CustomLink
                        className="typography-heading-1 gradient-primary-text navbar-title"
                        to={UNPROTECTED_PATHS.HOME}
                    >
                        WebKöltség
                    </CustomLink>
                </div>
                <div className="navbar-items-wrapper">
                    {navbarItems.map((item, idx) => (
                        <CustomLink to={item.path} key={idx} hover>
                            <Text className="typography-body-semibold">
                                {item.label}
                            </Text>
                        </CustomLink>
                    ))}
                </div>
                <div className="navbar-buttons-container">
                    <Button
                        className="navbar-sign-in-button"
                        outlined
                        severity="secondary"
                        size="small"
                        onClick={navigateToLogin}
                    >
                        Bejelentkezés
                    </Button>
                    <Button
                        className="navbar-sign-in-button"
                        size="small"
                        onClick={navigateToLogin}
                    >
                        Ingyenes próba
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
