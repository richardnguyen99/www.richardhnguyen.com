import { toast as shadToast } from "@/hooks/use-toast";

export const toast = (message: string) => {
  shadToast({
    className:
      "bg-neutral-100 dark:bg-neutral-950 border-lime-500 text-lime-600",
    title: message,
  });
};
