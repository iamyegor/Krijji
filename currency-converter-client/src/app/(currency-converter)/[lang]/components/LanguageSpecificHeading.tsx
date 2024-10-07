
interface LanguageSpecificHeadingProps {
    lang: string;
    title: string;
    emphasisedTitle: string;
}

export default function LanguageSpecificHeading({
    lang,
    title,
    emphasisedTitle,
}: LanguageSpecificHeadingProps) {
    function getHeadingClasses() {
        switch (lang) {
            case "ru":
                return "text-[34px] sm:text-[40px] md:text-[44px] flex flex-wrap text-center justify-center font-head-ru leading-[1.2] font-medium !space-x-3";
            case "fr":
                return "text-[30px] xs:text-[34px] sm:text-[40px] md:text-[44px] font-head tracking-[-.02em] leading-[1] font-bold";
            default:
                return "text-[34px] sm:text-[40px] md:text-[44px] flex flex-wrap text-center justify-center font-head tracking-[-.02em] leading-[1] font-bold";
        }
    }

    function getSpacingClass() {
        if (lang !== "fr" && title.includes(" ")) {
            return "space-x-2";
        }
        return "";
    }

    return (
        <h1 className={`${getHeadingClasses()} ${getSpacingClass()}`}>
            <span className="">{title}</span>
            <span className="text-prim">{emphasisedTitle}</span>
        </h1>
    );
}
