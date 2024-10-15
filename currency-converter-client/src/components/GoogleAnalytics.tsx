import Script from "next/script";

const GoogleAnalytics = () => {
    return (
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.gaId}`} />
            <Script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.gaId}');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
