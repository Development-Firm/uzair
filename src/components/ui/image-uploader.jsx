"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function ImageUpload({ files, setFiles, selectedFile, setSelectedFile }) {
  // Remove a file by ID
  const removeFile = (fileId) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    if (selectedFile?.id === fileId) {
      setSelectedFile(updatedFiles[0] || null);
    }
  };

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      if (!selectedFile && updatedFiles.length > 0) {
        setSelectedFile(updatedFiles[0]);
      }
    },
    [files, selectedFile, setFiles, setSelectedFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-1 border-border border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted-foreground"
        >
          <div className="text-center">
            <p className="mt-2 text-sm text-foreground">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Click to upload files (files should be under 10 MB)
            </p>
          </div>
        </label>
        <Input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
      </div>

      {files.length > 0 && (
        <div>
          <ScrollArea className="h-90">
            <p className="font-medium my-2 mt-2 text-muted-foreground text-sm">
              Uploaded Files
            </p>
            <div className="grid grid-cols-2 gap-2 pr-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`relative flex flex-col gap-2 rounded-lg overflow-hidden border border-muted group hover:border-border transition-all ${
                    selectedFile?.url === file.url ? "border border-white" : ""
                  }`}
                >
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-32 h-32 object-contain rounded-md"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="absolute rounded-full top-0 right-0 bg-destructive text-destructive-foreground transition-all flex items-center justify-center px-2 group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
