type IconProps = {
    iconPath: string;
    altText: string;
    size?: number;
  };
  
  const Icon: React.FC<IconProps> = ({ iconPath, altText, size = 24 }) => {
    return <img src={iconPath} alt={altText} className={`h-${size} w-${size}`} />;
  };
  
  export default Icon;
  