import React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
const ModalNoReesponsive: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6  w-96">
                <h1>In this first version Entity Generator does not support responsiveness.</h1>
                <button
                    className="text-red-500 font-bold mb-4"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ModalNoReesponsive;
