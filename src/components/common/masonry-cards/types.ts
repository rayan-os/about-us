export interface MasonryCardProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  height?: "small" | "medium" | "large";
  type?: "text" | "image" | "quote" | "feature";
}
