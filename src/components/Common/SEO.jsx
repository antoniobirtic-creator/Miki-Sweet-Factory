import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => {
    const siteTitle = "Miki Sweet Factory";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = "Domaće torte i slastice rađene s ljubavlju. Miki Sweet Factory - vaša destinacija za najfinije okuse.";
    const siteUrl = "https://mikisweetfactory.hr"; // Promijeni u svoju domenu

    return (
        <Helmet>
            {/* Standardni meta tagovi */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDesc} />

            {/* Open Graph / Facebook (za ljepše dijeljenje na društvenim mrežama) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content={image || "/images/og-default.jpg"} />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
        </Helmet>
    );
};

export default SEO;