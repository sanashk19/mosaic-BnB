import Image from "next/image";

type NationalSkylineProps = {
  className?: string;
};

export function NationalSkyline({ className = "" }: NationalSkylineProps) {
  return (
    <div className={`national-skyline ${className}`.trim()} aria-hidden="true">
      <Image
        src="/soliq-building.png"
        alt=""
        width={506}
        height={99}
        className="national-skyline-image"
      />
    </div>
  );
}
