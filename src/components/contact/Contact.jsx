import MailIcon from "@/Icons/MailIcon";
import WebIcon from "@/Icons/WebIcon";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <div className="py-[4rem] rounded-3xl z-20 relative">
      <h1 className="text-3xl font-bold text-center text-gradient-2 ">
        Reach out to us!
      </h1> 
      <div className="flex flex-col items-center text-center md:flex-row md:justify-around md:text-left text-primary-foreground mt-[4rem] gap-8">
        <div className="flex items-center gap-4 card-gradient-transparent p-4 px-6 rounded-3xl overflow-hidden">
          <Image src="/assets/images/icons/phone.png" alt="phone icon" width={22} height={22} />
          <span>+92-304-593-7445</span>
        </div>
        <div className="flex items-center gap-4 card-gradient-transparent p-4 px-6 rounded-3xl overflow-hidden">
          <MailIcon />
          <span>contact@devfum.com</span>
        </div>
        <div className="flex items-center gap-4 card-gradient-transparent p-4 px-6 rounded-3xl overflow-hidden">
          <WebIcon />
          <span>www.devfum.com</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
