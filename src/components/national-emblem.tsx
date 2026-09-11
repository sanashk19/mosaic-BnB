import Image from "next/image";

type NationalEmblemProps = {
  className?: string;
};

export function NationalEmblem({ className = "" }: NationalEmblemProps) {
  return (
    <div className={`national-emblem ${className}`.trim()} aria-hidden="true">
      <Image
        src="/uzbekistan-emblem.svg"
        alt=""
        width={256}
        height={256}
        className="national-emblem-image"
      />
    </div>
  );
}
