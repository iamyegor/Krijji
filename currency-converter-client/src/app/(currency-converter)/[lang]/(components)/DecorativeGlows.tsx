import Image from "next/image";
import decorativeBlueGlow from "@/assets/glows/decorative-blue-glow.png";
import rightFaintGlowImg from "@/assets/glows/faint-glow-right.png";
import leftFaintGlowImg from "@/assets/glows/faint-glow-left.png";
import decorativeMeshUpperLeft from "@/assets/meshes/decorative-mesh-upper-left.png";
import decorativeMeshBottomRight from "@/assets/meshes/decorative-mesh-bottom-right.png";
import bottomFaintGlowImg from "@/assets/glows/faint-glow-bottom.png";
import React from "react";

export default function DecorativeGlows() {
    return (
        <>
            <Image
                src={decorativeBlueGlow}
                alt="Decorative blue glow"
                className="absolute top-[350px] md:-[320px] lg:top-[290px] left-[50%] transform -translate-x-1/2 right-[50%] w-[400px] h-[400px] xs:w-[500px] xs:h-[500px] object-cover pointer-events-none opacity-80"
                draggable={false}
            />

            <Image
                src={rightFaintGlowImg}
                alt="Faint glow"
                className="block xl:hidden absolute top-[110px] xs:top-[70px] sm:top-[20px] right-0 w-[400px] h-[400px] pointer-events-none"
                draggable={false}
            />

            <Image
                src={leftFaintGlowImg}
                alt="Faint glow"
                className="absolute top-[700px] xs:top-[680px] sm:top-[650px] md:top-[560px] lg:top-[450px] w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] left-0 pointer-events-none"
                draggable={false}
            />
            <Image
                src={decorativeMeshUpperLeft}
                alt="Decorative mesh"
                className="absolute top-0 left-0 w-[200px] xs:w-[250px] lg:w-[340px] xl:w-[400px] h-auto object-cover pointer-events-none opacity-mesh"
                draggable={false}
            />
            <Image
                src={decorativeMeshBottomRight}
                alt="Decorative mesh"
                className="absolute bottom-0 right-0 w-[240px] md:w-[320px] h-auto object-cover pointer-events-none opacity-mesh"
                draggable={false}
            />
            <Image
                src={bottomFaintGlowImg}
                alt="Faint glow"
                className="absolute -bottom-0 -right-0 w-[400px] h-[400px] pointer-events-none"
                draggable={false}
            />
        </>
    );
}
