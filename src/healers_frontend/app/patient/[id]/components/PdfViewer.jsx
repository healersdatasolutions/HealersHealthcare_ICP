// components/PdfViewer.js
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { version as pdfjsVersion } from "pdfjs-dist";

const PdfViewer = ({ fileUrl }) => {
  return (
    <div className="pdf-viewer">
      <Worker
        workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}
      >
        <div style={{ height: "750px" }}>
          <Viewer fileUrl={fileUrl} />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;
