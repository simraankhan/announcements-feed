import { ComponentProps, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { toast } from "sonner";

interface FileUploadProps<
  T extends FieldValues,
> extends ComponentProps<"input"> {
  hookForm: ReturnType<typeof useForm<T>>;
  image?: string;
}

const FileUpload = <T extends FieldValues>({
  hookForm: form,
  id,
  image,
  ...rest
}: FileUploadProps<T>) => {
  // Hooks
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(() => {
    if (!image) return;
    setImageUrl(image);
  }, [image]);

  const abortController = new AbortController();

  // Functions
  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.warning("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];
    setLoading(true);
    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      toast.error("Failed to authenticate for upload");
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        abortSignal: abortController.signal,
      });
      toast.success("Upload successful");
      if (id) {
        form.reset({
          ...form.getValues(),
          [id]: uploadResponse.url,
        });
      }
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
        toast.error("Upload aborted");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
        toast.error("Invalid request");
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
        toast.error("Network error");
      } else if (error instanceof ImageKitServerError) {
        toast.error("Server error");
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
        toast.error("Upload error");
      }
    }
    setLoading(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Input
        className="hidden"
        ref={fileInputRef}
        type="file"
        onChange={handleImageSelect}
        {...rest}
      />
      <Button
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
      >
        Select an image
      </Button>
      {imageUrl && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={imageUrl}
            alt="Selected image"
            className="mt-2 w-50 h-50 object-cover"
          />
          <div className="flex gap-2 items-center">
            <Button variant={"link"} onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              className={"text-secondary-foreground"}
              variant={"link"}
              onClick={() => {
                setImageUrl(undefined);
                if (id) {
                  form.reset({
                    ...form.getValues(),
                    [id]: "",
                  });
                }
              }}
              disabled={loading}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
