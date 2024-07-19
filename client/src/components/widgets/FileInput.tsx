import React, { ReactElement, useState, Ref, useEffect, useRef } from "react";
import styled from "styled-components";
import { FormWidgetChangeNotificationContext } from "@django-bridge/react";
import Button from "@mui/joy/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

// @see https://github.com/facebook/react/issues/24722
function useForwardRef<T>(forwardedRef: Ref<T>) {
  // final ref that will share value with forward ref. this is the one we will attach to components
  const innerRef = useRef<T>(null);

  useEffect(() => {
    // try to share current ref value with forwarded ref
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      // by default forwardedRef.current is readonly
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      forwardedRef.current = innerRef.current;
    }
  }, [forwardedRef]);

  return innerRef;
}

const StyledFileInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  &:disabled {
    background-color: hsl(0, 0%, 95%);
  }

  &:focus {
    border: 1px solid var(--joy-palette-primary-solidBg);
    outline: 1px solid var(--joy-palette-primary-solidBg);
  }
`;

const FileUploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px dashed #e0e0e0;
  padding: 2rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  &.active {
    background: #f3f6fa;
    border: 2px dashed var(--joy-palette-primary-solidBg);
  }
  .field-has-error & {
    border: 1px solid #d9303e;
  }
`;

const UploadedFiles = styled.ul`
  width: 100%;
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
`;

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxFileSizeDisplay?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      onChange: originalOnChange,
      maxFileSizeDisplay,
      ...props
    }: FileInputProps,
    ref
  ): ReactElement => {
    // Format allowed extensions (eg, ".pdf, .docx or .txt")
    let allowedExtensionsDisplay = "";
    if (props.accept) {
      const allowedExtensions = props.accept?.split(",") || [];
      allowedExtensionsDisplay = `${allowedExtensions
        .slice(undefined, -1)
        .join(", ")} or ${allowedExtensions.slice(-1).join("")}`;
    }

    const [files, setFiles] = useState<FileList | File[] | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const forwardedRef = useForwardRef(ref);
    const changeNotification = React.useContext(
      FormWidgetChangeNotificationContext
    );

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const uploadedFiles = e.dataTransfer.files;
      setFiles(uploadedFiles);

      // update file input
      const fileInput = forwardedRef.current;
      if (fileInput) {
        fileInput.files = uploadedFiles;
      }
    };

    return (
      <StyledFileInput
        onDragLeave={handleDrag}
        onDragEnter={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {files && files.length > 0 ? (
          <UploadedFiles>
            {Array.from(files).map((file, idx) => (
              <li key={file.name}>
                {/* <Icon name="fa/check-solid" colour="success" /> */}
                <div>
                  <div>{file.name}</div>
                  <small>{file.size}</small>
                </div>
                <Button
                  type="button"
                  aria-label="Delete"
                  variant="plain"
                  size="sm"
                  onClick={() => {
                    const newFiles = Array.from(files);
                    if (newFiles.length === 1) {
                      setFiles(null);
                    } else {
                      newFiles.splice(idx, 1);
                      setFiles(newFiles);
                    }
                  }}
                >
                  <DeleteIcon />
                </Button>
              </li>
            ))}
          </UploadedFiles>
        ) : (
          <FileUploadPlaceholder className={dragActive ? "active" : ""}>
            <UploadFileRoundedIcon />
            <p>
              Drag and drop your file or{" "}
              <Button
                type="button"
                variant="soft"
                size="sm"
                onClick={() => {
                  if (forwardedRef.current) {
                    return forwardedRef.current.click();
                  }
                  return null;
                }}
              >
                browse
              </Button>
            </p>
            <small>
              {allowedExtensionsDisplay && (
                <>File must be in {allowedExtensionsDisplay} format.</>
              )}
              {maxFileSizeDisplay && <> Max file size {maxFileSizeDisplay}.</>}
            </small>
          </FileUploadPlaceholder>
        )}
        <input
          hidden
          type="file"
          ref={forwardedRef}
          accept=".pdf,.docx,.txt"
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
          onChange={(e) => {
            setFiles(e.target.files);
            if (originalOnChange) {
              originalOnChange(e);
            }
            changeNotification();
          }}
          {...props}
        />
      </StyledFileInput>
    );
  }
);

export default FileInput;
