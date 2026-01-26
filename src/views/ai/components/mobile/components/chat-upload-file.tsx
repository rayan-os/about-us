import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

export interface UploadedFileProps {
  fileName: string;
  fileSize: number; // in bytes
  fileType:
    | "pdf"
    | "doc"
    | "docx"
    | "xls"
    | "xlsx"
    | "ppt"
    | "pptx"
    | "jpg"
    | "jpeg"
    | "png"
    | "gif";
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const getFileIcon = (fileType: string) => {
  const iconProps = { size: 20, className: "shrink-0" };

  if (fileType.toLowerCase().includes("pdf")) {
    return <FileText {...iconProps} className="text-gray-400" />;
  }

  return <FileText {...iconProps} className="text-gray-400" />;
};

const getFileTypeColor = (fileType: string): string => {
  const type = fileType.toLowerCase();

  if (type.includes("pdf")) return "bg-red-100 text-red-700 border-red-200";
  if (type.includes("doc") || type.includes("docx"))
    return "bg-blue-100 text-blue-700 border-blue-200";
  if (type.includes("xls") || type.includes("xlsx"))
    return "bg-green-100 text-green-700 border-green-200";
  if (type.includes("ppt") || type.includes("pptx"))
    return "bg-orange-100 text-orange-700 border-orange-200";
  if (
    type.includes("jpg") ||
    type.includes("jpeg") ||
    type.includes("png") ||
    type.includes("gif")
  ) {
    return "bg-purple-100 text-purple-700 border-purple-200";
  }

  return "bg-gray-100 text-gray-700 border-gray-200";
};

export const ChatUploadFile = ({
  fileName,
  fileSize,
  fileType,
}: UploadedFileProps) => {
  return (
    <div className="flex items-start gap-3 text-white w-full min-w-55 border border-dashed border-white/20 rounded-xl p-4 bg-gray-800">
      <div className="flex-shrink-0 mt-0.5">{getFileIcon(fileType)}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 justify-between">
          <h4 className="font-medium text-sm truncate">
            {fileName}.{fileType}
          </h4>

          <span
            className={cn(
              "text-xs px-1 py-0.5 rounded-full border font-medium",
              getFileTypeColor(fileType)
            )}
          >
            {fileType.toUpperCase()}
          </span>
        </div>

        <span className="text-xs text-gray-400">
          {formatFileSize(fileSize)}
        </span>
      </div>
    </div>
  );
};
