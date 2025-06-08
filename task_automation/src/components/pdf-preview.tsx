import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfPreviewProps {
  currentPdf: File | null;
}

export default function PdfPreview({ currentPdf }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handlePageChange = (offset: number) => {
    setPageNumber((prev) =>
      Math.min(Math.max(prev + offset, 1), numPages || 1)
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 mt-4"
    >
      <div className="border rounded-lg overflow-auto max-h-96 w-full">
        <Document
          file={currentPdf}
          onLoadSuccess={onDocumentLoadSuccess}
          noData={
            <div className="min-h-56 flex items-center justify-center">
              Nenhum Arquivo selecionado
            </div>
          }
          loading={
            <div className="min-h-56 flex items-center justify-center">
              Carregando...
            </div>
          }
          error={
            <div className="min-h-56 flex items-center justify-center">
              Erro ao carregar o PDF
            </div>
          }
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={320}
          />
          {/* {Array.from(new Array(numPages), (_el, index) => (
          <Page
            key={`page_${_el}`}
            pageNumber={index + 1}
            width={320}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        ))} */}
        </Document>
      </div>

      {/* Controles de Navegação */}
      {numPages && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={pageNumber <= 1}
            className="bg-transparent bg-white text-[#0A0A0B] p-1 rounded-md border-none disabled:bg-white/[0.05] disabled:text-white/40"
          >
            <ChevronLeft />
          </button>
          <span>
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={pageNumber >= (numPages || 1)}
            className="bg-transparent bg-white text-[#0A0A0B] p-1 rounded-md border-none disabled:bg-white/[0.05] disabled:text-white/40"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </motion.div>
  );
}
