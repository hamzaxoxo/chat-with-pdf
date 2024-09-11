'use client';

import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import CheckboxToggle from "./ToggleCheckbox";
import UploadPDF from "./UploadPDF";
import { Description } from "./Description";

interface UploadFileProps {
    setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const UploadFile: React.FC<UploadFileProps> = ({ setSelectedFile }) => {
    const [showDescription, setShowDescription] = useState(false);


    const handleToggle = () => {
        setShowDescription((prev) => !prev);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-center mx-auto max-w-xl mt-5 text-3xl font-bold text-gray-900">
                    Upload Document or write Description to ask Question
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                    Upload a PDF or DOC file and ask your question!
                </p>
                <CheckboxToggle
                    disabled={setSelectedFile == null}
                    isChecked={showDescription}
                    handleToggle={handleToggle}
                />
            </div>

            {showDescription ? (
                <Description setDiscription={
                    (e: string) => {
                        console.log(e);
                    }
                } />
            ) : (
                <UploadPDF setSelectedFile={setSelectedFile} />
            )}
        </>
    );
};

export default UploadFile;
