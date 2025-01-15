import axios from "axios";

export async function getCodeContent(code: string) {
  try {
    const response = await axios.get(`/api/read-file`, {
      params: { filePath: code },
    });

    return response.data.content;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
}
