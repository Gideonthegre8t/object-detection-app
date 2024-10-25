"use client";

function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto p-4 flex gap-2 items-center text-center">
      <p className="text-[14px] font-normal leading-[18.23px] text-[#8C8CA1]">
        POWERED BY
      </p>

      <p className="text-[18px] font-medium leading-[23.44px] mt-1">
        Getlink.AI
      </p>
      <p className="text-[14px] font-normal leading-[18.23px] mt-1">
        © {currentYear}.
      </p>
    </div>
  );
}

export default Copyright;
