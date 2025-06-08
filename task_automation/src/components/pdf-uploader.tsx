"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { CloudUpload, FilePlus, Loader } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { handleUploadPDF } from "@/service/ai.service";

// Configura o worker do react-pdf para renderizar PDFs

interface PdfUploaderProps {
  className?: string;
  currentPdf: File | null;
  setCurrentPdf: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function PdfUploader({
  className,
  currentPdf,
  setCurrentPdf,
}: PdfUploaderProps) {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isloading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const pdfs = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfs.length > 0 && !currentPdf) {
        setIsLoading(true);
        if (await handleUploadPDF(pdfs[0])) {
          setPdfFiles((prev) => [...prev, ...pdfs]);
          setCurrentPdf(pdfs[0]);
        }
        setIsLoading(false);
      }
    },
    [currentPdf, setCurrentPdf]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const selectPdf = async (file: File) => {
    setIsLoading(true);
    if (await handleUploadPDF(file)) {
      setCurrentPdf(file);
    }
    setIsLoading(false);
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
            ["hidden"]: currentPdf !== null,
          }
        )}
      >
        <input {...getInputProps()} />
        <p className="flex flex-col items-center justify-center text-sm">
          {isloading ? (
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          ) : isDragActive ? (
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
        <ul
          className={"flex flex-col gap-1 top-8 p-1 rounded-b-lg bg-black/90 "}
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
      )}
    </motion.div>
  );
}
