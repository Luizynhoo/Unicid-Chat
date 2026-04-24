import { api } from "./api";

export const listarPdf = async (file, tipo) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tipo", tipo);

  const response = await api.post("/pdf/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPdfs = async () => {
  const response = await api.get("/pdf/");
  return response.data;
};

export const getPdfCount = async () => {
  const response = await api.get("/pdf/quantidade");
  return response.data.count;
};

export const deletarPdf = async (id) => {
  const response = await api.delete(`/pdf/${id}`);
  return response.data;
};
