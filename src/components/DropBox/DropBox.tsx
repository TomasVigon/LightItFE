import React, { useState, DragEvent, forwardRef } from "react";
import "./DropBox.css";

interface DropBoxProps {
  handleDrop: (droppedFiles: FileList) => void;
  selectedFile: File | null;
}

export interface DropBoxRef {
  getFileInput: () => HTMLInputElement | null;
}

const DropBox = forwardRef<DropBoxRef, DropBoxProps>((props, ref) => {
  const { handleDrop, selectedFile } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const preventDefaults = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragging(true);
  };

  const handleDropEvent = (e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    handleDrop(droppedFiles);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const droppedFiles = e.target.files;
    if (droppedFiles) {
      handleDrop(droppedFiles);
    }
  };

  const fileInputRef = React.createRef<HTMLInputElement>();

  React.useImperativeHandle(ref, () => ({
    getFileInput: () => fileInputRef.current,
  }));

  return (
    <div
      className={`drop-box ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDropEvent}
      onClick={handleClick}
      onMouseDown={preventDefaults}
    >
      {!!selectedFile ? (
        <p>{selectedFile.name}</p>
      ) : isDragging ? (
        <p>Drop your files here</p>
      ) : (
        <p>Drag and drop your files here, or click to select files</p>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept=".jpg"
      />
    </div>
  );
});

export default DropBox;
