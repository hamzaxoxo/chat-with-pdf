'use client'

import React from 'react'
import ChatScreen from './ChatScreen';
import Preview from './Preview';
import UploadFile from './Reader';

export default function HomePage() {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    return (
        <div>
            {selectedFile ? (
                <div className='w-full p-10 flex lg:flex-row flex-col-reverse  justify-evenly gap-6 h-[99vh]'>
                    <ChatScreen />
                    <Preview fileToPreview={selectedFile} />
                </div>
            ) : (
                <UploadFile setSelectedFile={setSelectedFile} />
            )}
        </div>
    )
}
