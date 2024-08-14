import Image from "next/image";
import Link from "next/link";

export default function HomeStore() {
  return (
    <div className="grid max-h-[868px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={"/"}
        className="relative group flex justify-center items-center col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={"/products/moletom-ia-p-devs.png"}
          width={920}
          height={920}
          quality={100}
          alt="productcs"
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[288px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">Moleton AI</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            Kz 15 000
          </span>
        </div>
      </Link>

      <Link
        href={"/"}
        className="relative group flex justify-center items-center col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={"/products/camiseta-dowhile-2022.png"}
          width={920}
          height={920}
          quality={100}
          alt="productcs"
        />
        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[288px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">Camiseta Do while</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            Kz 20 000
          </span>
        </div>
      </Link>

      <Link
        href={"/"}
        className="relative group flex justify-center items-center col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={"/products/moletom-ai-side.png"}
          width={920}
          height={920}
          quality={100}
          alt="productcs"
        />
        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[288px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">Moleton AI</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            Kz 10 000
          </span>
        </div>
      </Link>
    </div>
  );
}
