import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-10 w-full px-3 py-4 sm:px-10 xl:px-24 2xl:px-48">
      <div className="mb-2 h-px w-full bg-gray-200" />
      <div className="flex w-full justify-between">
        <div>
          <h3 className="-mb-2 text-xl font-bold">Avani boutique,</h3>
          <h3 className="text-xl font-bold">the smart choice.</h3>
        </div>
        <div className="flex">
          <Link href="/about-us" passHref>
            <h3 className="mx-3 md:mb-0 -mb-2 flex-1 cursor-pointer font-bold hover:underline">
              About us
            </h3>
          </Link>
          <Link href="/contact-us" passHref>
            <h3 className="flex-2 mx-3 -mb-2 cursor-pointer font-bold hover:underline">
              Contact us
            </h3>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
