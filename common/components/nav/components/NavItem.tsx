import { useRef, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';


interface Props {
  title: string;
  linkTo: string;
  handleClick: () => void;
}

const NavItem = ({ title, linkTo, handleClick }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isHover, setIsHover] = useState(false);

  return (
    <div>
      <Link href={linkTo} passHref>
        <motion.a
          className="transition-all hover:underline"
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          ref={linkRef}
          onClick={handleClick}
        >
          {title}
        </motion.a>
      </Link>
    </div>
  );
};

export default NavItem;
