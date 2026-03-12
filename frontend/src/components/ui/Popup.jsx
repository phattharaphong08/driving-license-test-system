import Modal from 'react-modal';
import { Button } from './Button';


export const Popup = ({ header, isOpen, onClose, height, width, disabled, submitText, onSubmit, children }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
            className="bg-white rounded-xl shadow-lg w-full max-w-3xxl h-[80vh] flex flex-col p-6"
            style={{
                content: {
                    width: width || "auto",
                    height: height || "auto",
                },
            }}
        >
            <div className="flex items-center justify-between border-b pb-2">
                <h1 className="flex items-center text-[20px] font-semibold">
                    {header}
                </h1>
                <div className="w-[36px] h-[44px] items-center">
                    <Button onClick={onClose} variant={"end"}>
                        X
                    </Button>
                </div>
            </div>

            <div className='flex-1 overflow-y-auto no-scrollbar'>
                {children}
            </div>

            <div className="flex justify-end bg-white">
                <div className="w-[160px]">
                    <Button
                        onClick={onSubmit}
                        disabled={disabled}
                        className="w-full"
                    >
                        {submitText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};