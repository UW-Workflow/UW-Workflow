import Link from "next/link";
import React from "react";
import { MainContainer } from "../components/MainContainer";

export default function PrivacyPolicy() {
  return (
    <MainContainer>
      <div className="xl:ml-20 lg:ml-20 md:ml-10 sm:ml-10 ml-5 mt-10 xl:mr-64 lg:mr-64 md:mr-32 sm:mr-24 mr-10">
        <h1 className="lg:text-4xl md:text-4xl sm:text-3xl text-3xl font-bold font-cabinet-grotesk md:font-bold sm:font-bold lg:font-bold font-medium">
          Privacy Policy
        </h1>
        <hr className="mt-5" />
        <p className="mt-14 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          We at&nbsp;
          <Link href="/">
            <p className="text-blue-text cursor-pointer inline">
              uwworkflow.com&nbsp;
            </p>
          </Link>
          are committed to maintaining the accuracy, confidentiality, and
          security of your personally identifiable information. As part of this
          commitment, our privacy policy governs our actions as they relate to
          the collection, use and disclosure of Personal Information. Our
          privacy policy is based upon the values set by the Canadian Standards
          Association&apos;s Model Code for the Protection of Personal
          Information and Canada&apos;s Personal Information Protection and
          Electronic Documents Act.
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Introduction
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          We are responsible for maintaining and protecting the Personal
          Information under our control. We collect Personal Information to
          provide you with the product or service you have requested and to
          offer you services. The purposes for which we collect Personal
          Information will be identified before or at the time we collect the
          information (email in Sign Up flow).
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Consent
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Knowledge and consent are required for the collection, use or
          disclosure of Personal Information except where required or permitted
          by law. Providing us with your Personal Information is always your
          choice. However, your decision not to provide certain information may
          limit our ability to provide you with our products or services. We
          will not require you to consent to the collection, use, or disclosure
          of information as a condition to the supply of a product or service,
          except as required to be able to supply the product or service.
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Limiting Use, Disclosure and Retention
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Personal Information may only be used or disclosed for the purpose for
          which it was collected unless you have otherwise consented, or when it
          is required or permitted by law. Personal Information will only be
          retained for the period of time required to fulfill the purpose for
          which we collected it or as may be required by law.
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Safeguarding Customer Information
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Personal Information will be protected by security safeguards that are
          appropriate to the sensitivity level of the information. We take all
          reasonable precautions to protect your Personal Information from any
          loss or unauthorized use, access or disclosure.
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Customer Access
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Upon request, you will be informed of the existence, use and
          disclosure of your Personal Information, and will be given access to
          it. You may verify the accuracy and completeness of your Personal
          Information, and may request that it be amended, if appropriate.
          However, in certain circumstances permitted by law, we will not
          disclose certain information to you. For example, we may not disclose
          information relating to you if other individuals are referenced or if
          there are legal, security or commercial proprietary restrictions.
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-8">
          Handling Customer Complaints and Suggestions
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          You may direct any questions or enquiries with respect to our privacy
          policy or our practices by contacting us at uwworkflow@gmail.com or by
          going to &nbsp;
          <Link href="/contactus">
            <p className="text-blue-text cursor-pointer inline">
              uwworkflow.com/contactus&nbsp;
            </p>
          </Link>
        </p>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg mt-10">
          Additional Information
        </h1>
        <h1 className="lg:text-xl md:text-xl sm:text-lg text-lg mt-10">
          Cookies
        </h1>
        <p className="mt-6 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          A cookie is a small computer file or piece of information that may be
          stored in your computer&apos;s hard drive when you visit our websites.
          We may use cookies to improve our website’s functionality and in some
          cases, to provide visitors with a customized online experience.
        </p>
        <p className="mt-4 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Cookies are widely used and most web browsers are configured initially
          to accept cookies automatically. You may change your Internet browser
          settings to prevent your computer from accepting cookies or to notify
          you when you receive a cookie so that you may decline its acceptance.
          Please note, however, if you disable cookies, you may not experience
          optimal performance of our website.
        </p>
        <h1 className="lg:text-xl md:text-xl sm:text-lg text-lg mt-10">
          Other Websites
        </h1>
        <p className="mt-6 mb-10 font-cabinet-grotesk font-extralight text-gray-800 text-lg">
          Our website may contain links to other third party sites that are not
          governed by this privacy policy. Although we endeavour to only link to
          sites with high privacy standards, our privacy policy will no longer
          apply once you leave our website. Additionally, we are not responsible
          for the privacy practices employed by third party websites. Therefore,
          we suggest that you examine the privacy statements of those sites to
          learn how your information may be collected, used, shared and
          disclosed.
        </p>
      </div>
    </MainContainer>
  );
}
