'use client';

import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";

interface UploadFileProps {
    setSelectedFile: Dispatch<SetStateAction<File | null>>
}

const UploadFile: React.FC<UploadFileProps> = ({
    setSelectedFile,
}) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [borderColor, setBorderColor] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const allowedFileTypes = ["application/pdf", "application/msword"];

    // Get file extension from the file name
    const getFileExtension = (file: File) => {
        return file.name.split('.').pop()?.toLowerCase();
    };

    // Function to get icon based on file type
    const getFileIcon = (file: File | null) => {
        const extension = getFileExtension(file as File);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            if (allowedFileTypes.includes(file.type)) {
                setPdfFile(file);
                setErrorMessage(null);
                setBorderColor("border-dashed");
            } else {
                setPdfFile(null);
                setErrorMessage("Invalid file type! Only PDF or DOC files are allowed.");
                setBorderColor("border-red-500");
            }
        }
    };

    // Handle file upload
    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pdfFile) {
            setErrorMessage("Please select a valid file before uploading.");
            setBorderColor("border-red-500");
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

    // Handle question submission
    const handleQuestionSubmit = async () => {
        if (!pdfText) return;

        const res = await fetch("/api/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();
        setAnswer(data.answer);
    };

    return (
        <div className="relative min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white bg-no-repeat bg-cover items-center" >
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 border-2">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">Upload PDF!</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Upload a PDF file and ask a question!
                    </p>
                </div>
                <form className="mt-8 space-y-3" onSubmit={handleFileUpload}>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">
                            Attach Document
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                className={`flex flex-col rounded-lg border-4 ${borderColor} border-dashed w-full h-60 p-10 group text-center`}
                            >
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
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
                                                <span className="text-sm">Drag and drop</span> files here <br />
                                                or{" "}
                                                <a href="" id="" className="text-blue-600 hover:underline">
                                                    select a file
                                                </a>{" "}
                                                from your computer
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                    {
                        errorMessage && (
                            <div className="text-red-500 text-sm">{errorMessage}</div>
                        )
                    }
                    <div>
                        <button
                            type="submit"
                            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default UploadFile