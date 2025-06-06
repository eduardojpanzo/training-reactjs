import { apiServices } from "@/lib/axios";

export async function handleSendPrompt(value: string) {
  try {
    const response = await apiServices.post("", {
      message: value,
    });

    console.log(response.data);

    return value + "1";
  } catch {
    return value + "2";
  }
}
