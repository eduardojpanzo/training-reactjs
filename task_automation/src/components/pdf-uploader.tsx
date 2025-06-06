"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  FilePlus,
  MenuIcon,
  X,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "@/lib/utils";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configura o worker do react-pdf para renderizar PDFs

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfUploaderProps {
  className?: string;
}

export default function PdfUploader({ className }: PdfUploaderProps) {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [currentPdf, setCurrentPdf] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showMenu, setShowMenu] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const pdfs = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      setPdfFiles((prev) => [...prev, ...pdfs]);
      if (pdfs.length > 0 && !currentPdf) {
        setCurrentPdf(pdfs[0]);
        setPageNumber(1);
      }
    },
    [currentPdf]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handlePageChange = (offset: number) => {
    setPageNumber((prev) =>
      Math.min(Math.max(prev + offset, 1), numPages || 1)
    );
  };

  const selectPdf = (file: File) => {
    setCurrentPdf(file);
    setPageNumber(1);
  };

  return (
    <motion.div
      className={cn(`flex flex-col gap-4 max-w-full mx-auto`, className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Área de Drag and Drop */}
      <div
        {...getRootProps()}
        className={clsx(
          `border-2 border-dashed py-1 px-6 rounded-lg text-center cursor-pointer transition-colors`,
          {
            "bg-blue-50 border-blue-500": isDragActive,
            "border-gray-400 bg-violet-500/10": !isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />
        <p className="flex flex-col items-center justify-center text-sm">
          {isDragActive ? (
            <>
              <FilePlus />
              Solte os arquivos PDF aqui...
            </>
          ) : (
            <>
              <CloudUpload />
              Arraste e solte arquivos PDF aqui ou clique para selecionar
            </>
          )}
        </p>
      </div>

      {/* Lista de PDFs carregados */}
      {pdfFiles.length > 0 && (
        <div className="flex flex-col gap-2 relative">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X /> : <MenuIcon />}
          </div>
          <ul
            className={clsx(
              "gap-4 absolute top-8 p-1 rounded-b-lg bg-black/90 flex-col z-20",
              {
                ["hidden"]: !showMenu,
                ["flex flex-col gap-1"]: showMenu,
              }
            )}
          >
            {pdfFiles?.map((file, index) => (
              <li
                key={index}
                onClick={() => selectPdf(file)}
                className={clsx(`p-2 rounded-md cursor-pointer text-xs`, {
                  ["bg-blue-100 text-blue-700"]: currentPdf === file,
                  ["bg-gray-100 text-gray-700"]: currentPdf !== file,
                })}
              >
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Visualização do PDF */}
      {currentPdf && (
        <div className="flex flex-col items-center gap-4">
          <div className="border rounded-lg overflow-auto max-h-96 w-full">
            <Document
              file={currentPdf}
              onLoadSuccess={onDocumentLoadSuccess}
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
                className="bg-transparent bg-white text-black/80 p-1 rounded-md border-none disabled:bg-gray-800 disabled:text-gray-300"
              >
                <ChevronLeft />
              </button>
              <span>
                {pageNumber} / {numPages}
              </span>
              <button
                onClick={() => handlePageChange(1)}
                disabled={pageNumber >= (numPages || 1)}
                className="bg-transparent bg-white text-black/80 p-1 rounded-md border-none disabled:bg-gray-800 disabled:text-gray-300"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
