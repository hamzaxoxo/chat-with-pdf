'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { X } from "lucide-react";
import Button from './Button';

const UploadPDF = ({ setSelectedFile }:
    { setSelectedFile: React.Dispatch<React.SetStateAction<File | null>> }
) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const allowedFileTypes = ["application/pdf", "application/msword"];

    const handleFileChange = (file: File) => {
        setFileName(file.name);
        if (allowedFileTypes.includes(file.type)) {
            setPdfFile(file);
            setErrorMessage(null);
        } else {
            setPdfFile(null);
            setErrorMessage("Invalid file type! Only PDF or DOC files are allowed.");
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pdfFile) {
            setErrorMessage("Please select a valid file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", pdfFile);

        setSelectedFile(pdfFile);
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setPdfText(data.text);
    };

    const removeFile = () => {
        setPdfFile(null);
        setFileName("");
    };

    const getFileIcon = (file: File | null) => {
        if (!file) return "https://cdn-icons-png.flaticon.com/512/2716/2716054.png";
        const extension = file.name.split('.').pop()?.toLowerCase();
        switch (extension) {
            case "pdf":
                return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
            case "doc":
            case "docx":
                return "https://cdn-icons-png.flaticon.com/512/337/337932.png";
            default:
                return "https://cdn-icons-png.flaticon.com/512/338/338063.png";
        }
    };

    return (
        <div className="my-10 flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white bg-no-repeat bg-cover items-center gap-6">
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 border-2">
                <form className="space-y-3">
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label
                                className={`flex flex-col items-center rounded-lg border-4 border-gray-200 border-dashed w-full h-60 p-10 group text-center`}
                            >
                                <div className="relative h-full w-fit text-center flex flex-col items-center justify-center">
                                    {pdfFile ? (
                                        <>
                                            <Image
                                                className="object-center"
                                                src={getFileIcon(pdfFile)}
                                                alt="file icon"
                                                width={100}
                                                height={100}
                                            />
                                            <p className="pointer-none text-gray-500 mt-3">
                                                <span className="text-sm">{fileName}</span>
                                            </p>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="absolute -top-2 -right-2 bg-red-200 p-1 rounded-full"
                                                title="Remove File"
                                            >
                                                <X size={16} className="text-red-500" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-auto max-h-48 mx-auto -mt-10">
                                                <Image
                                                    className="object-contain"
                                                    src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
                                                    alt="file icon"
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                            <p className="pointer-none text-gray-500">
                                                <span className="text-sm">Drag and drop</span> files
                                                here <br />
                                                or{" "}
                                                <label className="text-blue-600 hover:underline cursor-pointer">
                                                    select a file
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            if (e.target.files?.[0]) {
                                                                handleFileChange(e.target.files[0]);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm">{errorMessage}</div>
                    )}
                </form>
            </div>
                <div className="w-52 mx-auto mt-4">
                    <Button handleChange={(e: any) => handleFileUpload(e)}>
                        Ask Question
                    </Button>
                </div>
        </div>
    );
};

export default UploadPDF;
