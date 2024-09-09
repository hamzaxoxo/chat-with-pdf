import React from 'react'
import { CircleX, LoaderCircle, Minus, Trash } from 'lucide-react'

export default function ChatMenu({ message }: { message: string }) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadingMessage, setLoadingMessage] = React.useState<string>(message);

    const resetChat = () => {
        setIsLoading(true);
        setLoadingMessage("Getting the Context....");
        setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage("Loaded");
        }, 3000);
    }

    const closePDF = () => {
        setIsLoading(true);
        setLoadingMessage("Closing PDF....");
        setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage("PDF Closed");
        }, 3000);
    }
    return (
        <div className="relative flex gap-2 items-center justify-between bg-gray-300 px-4 py-3 rounded-t-xl">
            <span className="flex gap-2 text-gray-500">
                {isLoading && (
                    <LoaderCircle className="animate-spin" />
                )}
                {loadingMessage}
            </span>
            <div className="flex items-center">
                <button type='button' onClick={resetChat} className="absolute bottom-1 right-12 px-2 py-0" title="Refresh Chat">
                    <Minus size={20} className="text-gray-400" />
                </button>
                <button type='button' onClick={closePDF} className="px-2 py-0" title="Close PDF">
                    <Trash size={20} className="text-red-500" />
                </button>
            </div>
        </div>
    )
}
