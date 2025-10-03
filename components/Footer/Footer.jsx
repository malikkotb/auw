export default function Footer() {
  return (
    <footer className='w-full bg-pink-100 text-black text-sm'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center'>
        {/* Left section */}
        <div className='flex flex-col'>
          <span className='font-bold uppercase'>A Unified Whole</span>
          <span className='text-xs'>
            A Multipurpose Design Studio
          </span>
        </div>

        {/* Social links */}
        <div className='flex gap-4'>
          <span className='uppercase text-xs font-semibold'>
            Follow us
          </span>
          <a href='#' className='hover:underline'>
            LinkedIn
          </a>
          <a href='#' className='hover:underline'>
            Instagram
          </a>
        </div>

        {/* Navigation */}
        <div className='flex gap-4'>
          <span className='uppercase text-xs font-semibold'>
            Navigation
          </span>
          <a href='#' className='hover:underline'>
            Work
          </a>
          <a href='#' className='hover:underline'>
            About
          </a>
          <a href='#' className='hover:underline'>
            Sound
          </a>
          <a href='#' className='hover:underline'>
            Contact
          </a>
        </div>

        {/* Privacy */}
        <div>
          <a
            href='#'
            className='uppercase text-xs font-semibold hover:underline'
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
