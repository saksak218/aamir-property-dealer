import { X } from "lucide-react";
import ContactForm from "../ContactForm";

const ContactModal = ({
  modalRef,
  onClick,
}: {
  modalRef: React.RefObject<HTMLDivElement | null>;
  onClick: () => void;
}) => {
  return (
    <div className="z-50 fixed inset-0 min-h-screen">
      <div className="flex justify-center items-center bg-gray-900/40 backdrop-blur-xs min-h-screen">
        <div
          ref={modalRef}
          className="relative bg-white dark:bg-slate-800 px-12 py-4 rounded-md w-full max-sm:max-w-[290px] max-md:max-w-sm md:max-w-2xl max-md:h-[calc(100vh-1rem)] overflow-y-auto"
        >
          <h2 className="mt-6 font-semibold text-2xl">Get In Touch</h2>
          <div className="mt-2 pb-8">
            <ContactForm />
          </div>
          <button onClick={onClick} className="cursor-pointer">
            <X className="top-4 right-4 absolute" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
