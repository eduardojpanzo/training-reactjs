import { apiServices } from "@/lib/axios";
import { toast } from "sonner";

export async function handleSendPrompt(value: string) {
  try {
    const response = await apiServices.post<{ output: string }>("/chat", {
      question: value,
    });
    return response.data.output;
  } catch {
    toast.error("Erro ao enviar a mensagem.");
  }
}

export async function handleUploadPDF(file: File) {
  if (!file) {
    toast("Por favor, selecione um arquivo PDF.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiServices.post("/upload-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Arquivo enviado com sucesso!", {
      description: response.data.message,
    });
    return true;
  } catch {
    toast.error("Falha no upload do arquivo.");
    return false;
  }
}
