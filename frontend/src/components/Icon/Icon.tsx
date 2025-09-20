import React from "react";
import type { IconType } from "react-icons";

type IconProps = {
    icon: IconType;
    size?: number;
    color?: string;
    className?: string;
};

const Icon: React.FC<IconProps> = ({
    icon: IconComponent,
    size = 24,
    color,
    className,
}) => {
    return (
        <IconComponent
            className={className}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                color,
                display: "block",
                flexShrink: 0,
            }}
        />
    );
};

export default Icon;
