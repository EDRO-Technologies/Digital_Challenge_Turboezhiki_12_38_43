import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// Функция для загрузки файла
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: ProgressEvent) => {
      if (progressEvent.total) {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
      }
    },
  };

  const response = await axios.post("/api/upload", formData, config);
  return response.data; // Возвращаем ответ сервера
};

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // Используем useMutation для обработки загрузки файла
  const mutation = useMutation(uploadFile, {
    onSuccess: (data) => {
      alert("Файл загружен успешно!");
    },
    onError: (error: any) => {
      alert("Ошибка при загрузке файла");
      console.error(error);
    },
    onSettled: () => {
      // Можно сбросить прогресс по завершении загрузки
      setProgress(0);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className="file-uploader">
      <Input
        type="file"
        onChange={handleFileChange}
        style={{ "::placeholder": { display: "none" } }}
      />
      <Button onClick={handleUpload} disabled={!file || mutation.isLoading}>
        Загрузить файл
      </Button>

      {mutation.isLoading && (
        <div>
          <Progress value={progress} max={100} />
          <p>Загрузка: {Math.round(progress)}%</p>
        </div>
      )}

      {mutation.isError && (
        <div>
          <p>Ошибка при загрузке файла</p>
        </div>
      )}

      {mutation.isSuccess && (
        <div>
          <p>Файл успешно загружен</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
