import React from "react";
import '../../App.css';

interface Image {
    src: string;
    alt: string;
}

interface TouchPushProps {
    title?: string;
    text?: string;
    image?: Image;
    imageWidth?: string;
    imageHeight?: string;
    height?: string;
    width?: string;
    color?: string;
    textColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    margin?: string;
    marginText?: string;
    borderColor?: string;
    fontSizeText?: string;
    fontSizeTitle?: string;
    textDecoration?: string;
    className?: string;
    href?: string;
    action?: React.MouseEventHandler<HTMLDivElement>;
    imagePosition?: 'above' | 'below';
    cursor?: string;

    // Hover styles
    heightHover?: string;
    widthHover?: string;
    colorHover?: string;
    textColorHover?: string;
    backgroundColorHover?: string;
    borderHover?: string;
    borderRadiusHover?: string;
    borderColorHover?: string;
    fontSizeTextHover?: string;
    fontSizeTitleHover?: string;
    textDecorationHover?: string;
    marginHover?: string;
    marginTextHover?: string;
    classNameHover?: string;
}

const TouchPush: React.FC<TouchPushProps> = ({
    title = "",
    text = "",
    image = { src: '', alt: '' },
    imageWidth,
    imageHeight,
    height,
    width,
    color,
    margin,
    marginText,
    textColor,
    backgroundColor,
    border,
    borderRadius,
    borderColor,
    fontSizeText,
    fontSizeTitle,
    textDecoration,
    href,
    action,
    imagePosition = 'above',
    cursor,

    // Hover styles
    heightHover,
    widthHover,
    colorHover,
    textColorHover,
    backgroundColorHover,
    borderHover,
    borderRadiusHover,
    borderColorHover,
    fontSizeTextHover,
    fontSizeTitleHover,
    textDecorationHover,
    marginHover,
    marginTextHover,
    classNameHover,
}) => {

    const cardStyle: React.CSSProperties = {
        height,
        width,
        borderRadius,
        backgroundColor,
        border: border ? border : `1px solid ${borderColor}`,
        cursor,
        margin
    };

    const cardHoverStyle: React.CSSProperties = {
        height: heightHover,
        width: widthHover,
        borderRadius: borderRadiusHover,
        backgroundColor: backgroundColorHover,
        border: borderHover ? borderHover : `1px solid ${borderColorHover}`,
        cursor: cursor
    };

    const titleStyle: React.CSSProperties = {
        fontSize: fontSizeTitle,
        textDecoration,
        color,
        margin,
    };

    const titleHoverStyle: React.CSSProperties = {
        fontSize: fontSizeTitleHover,
        textDecoration: textDecorationHover,
        color: colorHover,
        margin: marginHover
    };

    const textStyle: React.CSSProperties = {
        fontSize: fontSizeText,
        textDecoration: textDecoration,
        color: textColor,
        margin: marginText,
    };

    const textHoverStyle: React.CSSProperties = {
        fontSize: fontSizeTextHover,
        textDecoration: textDecorationHover,
        color: textColorHover,
        margin: marginTextHover,
    };

    const imageStyle: React.CSSProperties = {
        width: imageWidth,
        height: imageHeight,
    };

    return (
        <section>
            <div className="container">
                <a href={href} style={{ textDecoration: 'none',textAlign:'center' }}>
                    <div
                        className="card"
                        style={cardStyle}
                        onClick={action}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                    >
                        {imagePosition === 'above' && image && (
                            <div className="card-images">
                                <div className="imagecontainer">
                                    <img src={image.src} alt={image.alt} className="imgimgsmall" style={imageStyle} />
                                </div>
                            </div>
                        )}
                        <h2
                            className="cardh2"
                            style={titleStyle}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, titleHoverStyle)}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, titleStyle)}
                        >
                            {title}
                        </h2>
                        <p
                            style={textStyle}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, textHoverStyle)}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, textStyle)}
                        >
                            {text}
                        </p>
                        {imagePosition === 'below' && image && (
                            <div className="card-images">
                                <div className="imagecontainer">
                                    <img src={image.src} alt={image.alt} className="imgimgsmall" style={imageStyle} />
                                </div>
                            </div>
                        )}
                    </div>
                </a>
            </div>
        </section>
    );
}

export default TouchPush;
