import { ReactNode, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CustomImageProps extends ImageProps {
    fallbackSvg: ReactNode;
}

const FallbackImage = ({ src, fallbackSvg, ...props }: CustomImageProps) => {
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | StaticImport>(src);

    useEffect(() => {
        setImgSrc(src);
        setErrorOccurred(false);
    }, [src]);

    if (errorOccurred) {
        return <>{fallbackSvg}</>;
    }

    return <Image {...props} src={imgSrc} onError={() => setErrorOccurred(true)} unoptimized />;
};

export default FallbackImage;
