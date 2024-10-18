import React from "react";
import '../../App.css';

interface IconProps {
    alt?: string;
    href?: string;
    src?: string;
    onClick?:() => void;
}

export const Icon: React.FC<IconProps> = ({ alt,href, onClick, src }) => {
    const img = src ? require(`../../assets/${src}.png`) : undefined;

    return (

        <a href={href} onClick={onClick}>
            {img ? <img className="icon" alt={alt} src={img} /> : <p className="button">{alt}</p> }
        </a>
    );
};
