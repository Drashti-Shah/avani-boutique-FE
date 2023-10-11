import { motion } from 'framer-motion';
import { textAnimation } from '../animations/contactUs.animations';
import ContactUsForm from './ContactUsForm';

const headerStyle =
  'text-5xl sm:text-1x1 md:text-2xl font-bold xl:-mt-12 -mt-5 md:-mt-8';

const ContactUs = () => {
  return (
    <div className="flex h-full min-h-screen  w-full items-center justify-center sm:mt-0 sm:p-7">
      <motion.div
        className="-mt-24 w-full p-4 sm:mt-0 sm:p-7 2xl:-mt-36"
        variants={textAnimation}
        initial="from"
        animate="to"
      >
        <h1 className={headerStyle}>Contact us</h1>
        <div className="mt-10">
          <ContactUsForm />
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
