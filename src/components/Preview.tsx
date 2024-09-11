'use client'

import { useState, useEffect } from "react"
import * as pdfobject from "pdfobject"

interface PreviewProps {
  fileToPreview: File
  page?: number
}

const Preview: React.FC<PreviewProps> = ({
  fileToPreview,
  page
}) => {

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    const url = URL.createObjectURL(fileToPreview);
    setPdfUrl(url);
    const options = {
      title: fileToPreview.name,
      pdfOpenParams: {
        view: "fitH",
        page: page || 1,
        zoom: "scale,left,top",
        pageMode: 'none'
      }
    }
    pdfobject.embed(url, "#pdfobject", options);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fileToPreview, page]);

  return (
    <div className="lg:w-1/2 w-full lg:h-full h-[50rem] rounded-xl" id="pdfobject">
    </div>
  )
}

export default Preview
