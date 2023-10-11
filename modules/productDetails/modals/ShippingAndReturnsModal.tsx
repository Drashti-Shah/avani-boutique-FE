import { AiOutlineClose } from 'react-icons/ai';
import { useModal } from '@/common/recoil/modal';

const ShippingAndReturnsModal = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative max-w-[35rem] rounded-md bg-white p-10 pb-14">
      <button
        className="btn-icon absolute right-3 top-3"
        onClick={() => closeModal()}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-3xl font-bold leading-10">
        Shipping And Returns
      </h1>
      <h4 className="mt-2 mb-5 text-center font-medium	 text-zinc-700">
        We offer hassle-free shopping for our valued customers in Ahmedabad,
        Gujarat, and across India. Your order will be processed within 2-3
        business days, and we provide a flat-rate shipping fee of ₹100. We aim
        to deliver your stylish selections within 5-7 business days. If you're
        not entirely satisfied with your purchase, returns are accepted within
        15 days of receiving your order.
      </h4>
    </div>
  );
};

export default ShippingAndReturnsModal;
