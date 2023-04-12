import React from "react";
import Header from "../../components/Header";
import PartnerHero from "../../components/PartnerHero";

const PartnerWithUs = () => {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <Header showLogo={true} />
      <PartnerHero />
    </div>
  );
};

export default PartnerWithUs;
