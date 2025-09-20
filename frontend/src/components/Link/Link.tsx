import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import "./Link.css";

const CustomLink = ({
    children,
    to,
    className,
    hover,
}: {
    children: React.ReactNode;
    to: string;
    className?: string;
    hover?: boolean;
}) => {
    return (
        <Link to={to}>
            <Text className={`${className} ${hover && "link-hover"}`}>
                {children}
            </Text>
        </Link>
    );
};

export default CustomLink;
