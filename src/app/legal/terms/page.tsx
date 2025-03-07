import React, { type JSX } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Richard H. Nguyen Site",
};

export default function Terms(): JSX.Element {
  return (
    <div className="prose max-w-full dark:prose-invert xl:prose-lg">
      <h1>Terms of Spervice</h1>
      <span>Updated: March 6, 2025</span>

      <hr />

      <p>
        These terms of service are entered into between you and me, Richard H.
        Nguyen (&ldquo;me&rdquo;, &ldquo;I&rdquo;, &ldquo;me&rdquo;) for the use
        of my application. By accessing this websites (the
        &ldquo;Services&rdquo;) of mine, you acknowledge that you have read,
        understood, and agree to the most recent version of these Terms of
        Service (&ldquo;Terms&rdquo;).
      </p>

      <p>
        I reserve the right to revise these Terms at any time. If I do, I will
        post the modified Terms on this page and indicate the date of most the
        recent change above. You agree to read all notifications I send you and
        to periodically check this page for updates to these Terms. Your
        continued use of the Services constitutes acceptance of these Terms and
        any modifications thereto. If you object to any changes, your sole
        recourse is to cease use of the Services.
      </p>

      <h2>I. USE OF SERVICES</h2>

      <p>
        You agree that by visiting my site, reading my articles and using other
        services on the site, you have accepted these Terms and understand your
        obligations herein and under the Privacy Policies. You further agree
        that you are authorized to use my site for your sole benefit. I reserve
        the right, at my sole discretion, to terminate any transactions or
        activities where I believe that the activities violate these Terms,
        Privacy Policies, or any laws. Notification of termination may be given
        at my discretion.
      </p>

      <h3>i. RESTRICTIONS</h3>

      <p>
        You agree that the use of my Site must not involve any activities that
        are dangerous, harmful, fraudulent, deceptive, threatening, harassing,
        defamatory, or obscene. You are prohibited from attempting to use what I
        wrote to conduct unethical and illegal work deemed by the Laws. Although
        the Site is open source and free to use, I bear no responsibility for
        any litigations, criminal charges, damages or losses that may result
        from your use, modification, or trade of the Site.
      </p>

      <h3>ii. CONTENT</h3>

      <p>
        &ldquo;Content&rdquo; refers to all software, images, content,
        communications, and any related material perceived or made available
        from my Service platform. Content delivered through my Site platform may
        be owned by me (&ldquo;My Content&rdquo;), contributed by My wider
        community of volunteers, or contributed by users like you (&ldquo;User
        Submitted Content&rdquo;). You agree to abide by all copyright notices
        and restrictions in the Content you access. Unless otherwise specified
        in writing, all my Content is owned, controlled, or licensed by me. You
        agree that all Content is my sole and exclusive property, which includes
        all software, images, content communications, or any material associated
        with the Service platform.
      </p>

      <h3>iii. CONTRIBUTION & SUBMISSION</h3>

      <p>
        You agree that by submitting any User Submitted Content to my Site
        platform, either via email or via GitHub pull request, you grant me a
        worldwide, non-exclusive, royalty-free, perpetual, and irrevocable
        license to use, reproduce, modify, distribute, display, and perform it
        in connection with the Services platform, to commercially exploit all
        such User Submitted Content, and to use it for any other purposes,
        without restriction or compensation to you. You also understand and
        agree that this right will persist even if your User Submitted Content
        is subsequently removed by you or if you subsequently delete your
        account with my Service.
      </p>

      <h3>iv. ACCESS TO 3RD-PARTY PLUGINS</h3>

      <p>
        You may be able to access or use third-party services, products,
        resources, content, or information, including, without limitation,
        products and services (&ldquo;Third Party Materials&rdquo;) via the
        Services. You acknowledge sole responsibility for and assume all risk
        arising from your access to or use of any such Third Party Materials,
        and I disclaim any liability that you may incur arising from your access
        to or use of such Third Party Materials. You acknowledge and agree that
        I am not responsible for the availability or accuracy of such Third
        Party Materials or the products or services on or available from such
        Third Party Materials; have no liability to you or any third party for
        any harm, injuries, or losses suffered as a result of your access to or
        use of such Third Party Materials; and do not make any promises to
        remove Third Party Materials from being accessed through the Services.
        Your ability to access or link to Third Party Materials or third-party
        services (including any SNS) does not imply any endorsement by me of
        Third Party Materials or any such third-party services. Any information
        collected by such third-party advertising providers is subject to the
        policies of such providers.
      </p>

      <h2>II. DISCLAIMER OF WARRANTIES</h2>

      <p>
        USE OF THE SERVICES IS AT YOUR OWN RISK. THE SERVICES ARE PROVIDED ON AN
        &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. I EXPRESSLY
        DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
        INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE,
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
      </p>

      <p>
        TO THE FULLEST EXTENT PERMITTED UNDER LAW, I HAVE NO OBLIGATION OR
        LIABILITY (WHETHER ARISING IN CONTRACT, WARRANTY, TORT (INCLUDING
        NEGLIGENCE), PRODUCT LIABILITY OR OTHERWISE) FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES OR LIABILITIES
        (INCLUDING, BUT NOT LIMITED TO, ANY LOSS OF DATA, REVENUE OR PROFIT)
        ARISING FROM OR RELATED TO YOUR USE OF THE SERVICES OR ANY CONTENT
        PROVIDED BY OR THROUGH THE SERVICES, EVEN IF I HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES IN ADVANCE. THE FOREGOING LIMITATION APPLIES
        TO DAMAGES ARISING FROM (i) YOUR USE OR INABILITY TO USE MY SERVICES;
        (ii) COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM
        ANY GOODS OR SERVICES PURCHASED THROUGH OR FROM OUR SERVICES; (iii)
        THIRD PARTY CONTENT MADE AVAILABLE TO YOU THROUGH THE SERVICES; OR (iv)
        ANY OTHER MATTER RELATING TO THE SERVICES. SOME STATES DO NOT ALLOW THE
        LIMITATION OR EXCLUSION OF INCIDENTAL, CONSEQUENTIAL OR OTHER TYPES OF
        DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
      </p>

      <p className="text-right italic">Written by Richard H. Nguyen</p>
    </div>
  );
}
