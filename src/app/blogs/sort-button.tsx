"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DownloadIcon,
  LetterCaseCapitalizeIcon,
  LineHeightIcon,
  TextAlignBottomIcon,
  TextAlignTopIcon,
} from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SortButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  initialSortType?: "alphabet" | "latest" | "";
  initialSortOrder?: "asc" | "desc" | "";
  open: boolean;
  onOpenChange?: (_open: boolean) => void;
}

const FormSchema = z.object({
  type: z.enum(["latest", "alphabet", ""]).optional(),
  order: z.enum(["asc", "desc", ""]).optional(),
});

const radioClassNames = cn(
  "data-[state=checked]:bg-black data-[state=checked]:text-white [&_svg]:data-[state=checked]:fill-white",
);

const SortButton: React.FC<SortButtonProps> = ({
  open,
  onOpenChange,
  initialSortOrder,
  initialSortType,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: initialSortType,
      order: initialSortOrder,
    },
  });

  const handleOpenChange = React.useCallback(
    (state: boolean) => {
      if (onOpenChange) onOpenChange(state);
    },
    [onOpenChange],
  );

  const createPageURL = React.useCallback(
    (data: z.infer<typeof FormSchema>) => {
      const params = new URLSearchParams(searchParams);

      if (typeof data.type === "undefined" || data.type === "") {
        params.delete("sortType");
      } else {
        params.set("sortType", data.type);
      }

      if (typeof data.order === "undefined" || data.order === "") {
        params.delete("sortOrder");
      } else {
        params.set("sortOrder", data.order);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const onSubmit = React.useCallback(
    (data: z.infer<typeof FormSchema>) => {
      createPageURL(data);
      toast("Sort options updated");
      handleOpenChange(false);
    },
    [createPageURL, handleOpenChange],
  );

  const handlePopoverOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        form.reset({
          type: initialSortType,
          order: initialSortOrder,
        });
      }

      handleOpenChange(open);
    },
    [form, handleOpenChange, initialSortOrder, initialSortType],
  );

  const handleDisabled = React.useCallback(() => {
    if (form.getValues().type !== initialSortType) return false;
    if (form.getValues().order !== initialSortOrder) return false;

    return true;
  }, [form, initialSortOrder, initialSortType]);

  return (
    <Popover open={open} onOpenChange={handlePopoverOpenChange}>
      <PopoverTrigger onClick={() => onOpenChange?.(!open)} asChild>
        <Button
          {...rest}
          className="ease-curve-d group flex w-1/2 transform-gpu items-center gap-3 rounded-full border border-neutral-200 bg-neutral-100/0 text-neutral-950 shadow-none duration-200 hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800 md:w-[unset]"
        >
          <span className="line-clamp-1 max-w-full">Sort</span>
          <div className="relative inline-flex h-5 w-5 items-center justify-center">
            <LineHeightIcon className="h-5 w-5" />
          </div>
        </Button>
      </PopoverTrigger>

      {/* Popover content */}
      <PopoverContent
        side="bottom"
        align="end"
        className="rounded-md p-0 shadow-xl shadow-neutral-800/20 md:ml-0"
      >
        {/* UI Form */}
        <Form {...form}>
          {/* Form tag */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="m-4">
              <FormLabel className="text-base">Sort options</FormLabel>
              <FormDescription>
                Sort articles by alphabetical or releasing orders
              </FormDescription>
            </div>
            <ScrollArea className="h-48 px-4">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <div className="">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="asc"
                                className={radioClassNames}
                                checked={field.value === "asc"}
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-2">
                              <TextAlignTopIcon className="h-5 w-5" />
                              <span>Ascending</span>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="desc"
                                className={radioClassNames}
                                checked={field.value === "desc"}
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-2">
                              <TextAlignBottomIcon className="h-5 w-5" />
                              <span>Descending</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <Separator orientation="horizontal" className="my-4" />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <div className="">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="alphabet"
                                className={radioClassNames}
                                checked={field.value === "alphabet"}
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-2">
                              <LetterCaseCapitalizeIcon className="h-5 w-5" />
                              <span>By alphabetical</span>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="latest"
                                className={radioClassNames}
                                checked={field.value === "latest"}
                              />
                            </FormControl>
                            <FormLabel className="flex items-center gap-2">
                              <DownloadIcon className="h-5 w-5" />
                              <span>By latest release</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </ScrollArea>
            <div className="before:content relative from-white/0 to-white/100 to-40% before:absolute before:-top-8 before:block before:h-8 before:w-full before:bg-gradient-to-b dark:from-black/0 dark:to-black/100">
              <div className="flex items-center">
                <Button
                  type="submit"
                  disabled={handleDisabled()}
                  className="ease-curve-d inset-0 m-0 flex-1 transform-gpu rounded-none rounded-bl-sm border-0 bg-white text-neutral-900 shadow-none transition-colors duration-200 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-black dark:text-neutral-100"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    form.reset({
                      type: "",
                      order: "",
                    })
                  }
                  className="ease-curve-d inset-0 m-0 flex-1 transform-gpu rounded-none rounded-bl-sm border-0 bg-white text-neutral-900 shadow-none transition-colors duration-200 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-black dark:text-neutral-100"
                >
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default SortButton;
