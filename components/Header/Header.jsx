import Link from "next/link";

export default function Header() {
  return (
    <header className='w-full text-[15px] uppercase'>
      <div className='grid grid-cols-12'>
        <div className='col-span-2'>
          <Link href='/'>
            <div>A Unified Whole</div>
          </Link>
        </div>
        <div className='col-span-2 col-start-11 flex justify-end gap-4'>
          <Link href='/about'>
            <div>About</div>
          </Link>
          <Link href='/work'>
            <div>Work</div>
          </Link>
          <Link href='/listening-experience'>
            <div>Sound</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
