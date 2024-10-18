import React from 'react';

// Definimos los tipos de las propiedades del componente
interface TouchProps {
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  borderRadius?: string;
  cursor?: string;
  display?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  imageName?: string;
  imageAlt?: string;
  text?: string;
  textDecoration?:string;
  fontSize?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  border?: string;
  borderColor?: string;
  position?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  shadow?:'shadow'|'none';
  touch?:'touch'|'none';
}

export const Touch: React.FC<TouchProps> = ({
  color ,
  backgroundColor,
  borderRadius ,
  boxShadow,
  cursor,
  display,
  padding,
  margin,
  width ,
  height,
  onClick,
  children,
  imageName,
  imageAlt,
  text,
  textDecoration,
  fontSize,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  border,
  borderColor,
  position,
  shadow,
}) => {

  const imageSrc = imageName ? require(`../../assets/${imageName}`) : undefined;

  const style: React.CSSProperties = {
    backgroundColor: backgroundColor || 'transparent',
    borderRadius: borderRadius||'30px',
    display,
    padding,
    margin: margin || 'auto',
    width: backgroundColor || '',
    height: backgroundColor || '',
    justifyContent: 'center' ,
    alignItems: 'center',
    cursor: cursor || 'pointer',
    border: border || 'none',
    borderColor: borderColor || 'none',
    boxShadow: shadow=='shadow'? '0 4px 8px rgba(0, 0, 0, 0.1)':'none',
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    fontSize,
    textAlign: 'center',
    background: backgroundColor,
  };

  const textStyle: React.CSSProperties = {
    color: color||'#db1313',
    fontSize: fontSize || '1em',
    textDecoration: textDecoration||'none',
  };

  return (
    <div style={style} onClick={onClick}>
      {imageSrc && <img src={imageSrc} alt={imageAlt} style={{ width: '100%', borderRadius: borderRadius }} />}
      <br />
      {text && <p style={textStyle}>{text}</p>}
      {children}
    </div>
  );
};

