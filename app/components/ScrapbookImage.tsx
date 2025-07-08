import Image, { StaticImageData } from 'next/image';

type ScrapbookImageProps = {
  src: string | StaticImageData;
  alt: string;
  rotation: number;
  width: number;
  height: number;
  className?: string;
};

const ScrapbookImage: React.FC<ScrapbookImageProps> = ({ src, alt, rotation, width, height, className }) => {
  return (
    <div
      className={`relative p-2.5 pb-8 bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      <div
        className="absolute top-[-10px] left-[50%] translate-x-[-50%] w-20 h-6 bg-yellow-200/40 transform -rotate-6"
        style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}
      ></div>
    </div>
  );
};

export default ScrapbookImage;
