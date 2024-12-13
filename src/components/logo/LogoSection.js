"use client"; 
import Image from "next/image";

function LogoSection() {
  return (
    <div className="detection-top-left p-3 pt-4 flex gap-3">
      <Image
        src="/svg/logo.svg"
        alt="Logo"
        width={63}
        height={62}
        className="h-auto"
      />
      <div className="mt-2">
        <h1 className="text-[18px] text-[#000000] md:text-[20px] font-[500] leading-[26.04px] tracking-[-0.24px]">
          The Invigilator
        </h1>
        <p className="text-[12px] md:text-[14px] font-[400] leading-[18.23px] tracking-[-0.24px] text-[#8C8CA1]">
          Skill Assessment Test
        </p>
      </div>
    </div>
  );
}

export default LogoSection;
