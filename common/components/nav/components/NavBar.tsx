import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineMenu
} from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';

import { defaultEase } from '@/common/animations/easings';
import filterAtom, { defaultFilter } from '@/common/recoil/filter';

import { navBarAnimation } from '../animations/NavBar.animations';
import NavItem from './NavItem';
import NavMenu from './NavMenu';
import logo from '@/public/img/logo.png';
import Image from 'next/image';

const NavBar = ({ onHomePage = false }: { onHomePage?: boolean }) => {

  const [animate, setAnimate] = useState<'from' | 'to'>('from');
  const [opened, setOpened] = useState(false);

  const { pathname } = useRouter();

  const setFilter = useSetRecoilState(filterAtom);

  useEffect(() => {
    if (onHomePage) {
      setAnimate('from');
      setTimeout(() => {
        setAnimate('to');
      }, 1600);
    } else setAnimate('to');
  }, [onHomePage]);

  return (
    <>
      <NavMenu opened={opened} setOpened={setOpened} />
      <motion.div
        variants={navBarAnimation}
        animate={animate}
        className="-mb-10"
        transition={{
          duration: animate === 'from' ? 0 : 0.4,
          ease: defaultEase,
        }}
      >
        <nav
          className={`z-50 flex items-center justify-between px-10 transition-colors xl:px-24 2xl:px-48 ${
            pathname === '/register' && 'text-white'
          }`}
        >
          <h2>
            <Link href="/">
              <Image
                layout="raw"
                height={105}
                width={105}
                src={logo}
                alt=""
                className="h-full w-full cursor-pointer object-cover object-center"
                priority
                placeholder="blur"
              />
            </Link>
          </h2>
          <div className="hidden gap-6 px-24 md:flex">
            <NavItem
              title="Explore All"
              linkTo="/products"
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                })
              }
            />
            <NavItem
              title="Men"
              linkTo="/products"
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, men: true },
                })
              }
            />
            <NavItem
              title="Women"
              linkTo="/products"
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, women: true },
                })
              }
            />
            <NavItem
              title="Kids"
              linkTo="/products"
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  kids: { boys: true, girls: true },
                })
              }
            />
            <NavItem
              title="Unisex"
              linkTo="/products"
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, unisex: true },
                })
              }
            />
          </div>
          <div>

            <button
              className="btn-icon ml-3 inline md:hidden"
              onClick={() => setOpened(true)}
              aria-label="Menu"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default NavBar;
