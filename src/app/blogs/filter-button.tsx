"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  filterTags: {
    tags: string[];
    indices: number[];
  };
  filterCategories?: string[];
}

const FormSchema = z.object({
  items: z.array(z.string()),
});

const FilterButton: React.FC<FilterButtonProps> = ({ filterTags, ...rest }) => {
  const items = filterTags.tags.map((tag) => ({
    id: tag,
    label: tag
      .split("-")
      .map((word) => {
        if (word.toLowerCase() === "grpc") return "gRPC";
        if (word.toLowerCase() === "api") return "API";
        if (word.toLowerCase() === "cpp") return "C++ (Programming Language)";
        if (word.toLowerCase() === "c") return "C (Programming Language)";

        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" "),
  })) as { id: string; label: string }[];

  const selectedItems = filterTags.indices.map(
    (index) => filterTags.tags[index],
  );

  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: selectedItems,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createPageURL(data.items);

    toast({
      className: "bg-[#e0fdd4] border-lime-500 text-lime-600",
      title: "Filter Applied",
      description: (
        <code className="line-clamp-1 max-w-[250px] text-green-950">
          {data.items.length} tag{data.items.length > 1 ? "s" : ""} selected
        </code>
      ),
    });

    handleClose();
  }

  function handleClose() {
    setOpen(false);
  }

  function createPageURL(data: string[]) {
    const params = new URLSearchParams(searchParams);

    if (data.length) {
      params.set("tags", data.join(","));
    } else {
      params.delete("tags");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function filtersDisplay() {
    if (selectedItems.length === 0) return "Filter";

    if (selectedItems.length === 1) return `${selectedItems[0]}`;

    return `${selectedItems[0]} + ${selectedItems.length - 1} more`;
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (open) {
          form.reset({
            items: selectedItems,
          });
        }
      }}
    >
      <PopoverTrigger onClick={() => setOpen((prev) => !prev)} asChild>
        <Button
          {...rest}
          className="ease-curve-d group flex w-1/2 transform-gpu items-center gap-3 rounded-full border border-gray-200 bg-gray-100/0 text-gray-950 shadow-none duration-200 hover:bg-gray-100 md:w-[unset]"
        >
          <span>{filtersDisplay()}</span>
          <MixerHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="ml-[var(--gutter-size)] rounded-md p-0 shadow-xl shadow-gray-800/20 md:ml-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="m-4">
                    <FormLabel className="text-base">Tags</FormLabel>
                    <FormDescription>Filter articles by tags</FormDescription>
                  </div>
                  <ScrollArea className="h-48">
                    <div className="px-4 pb-8">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="before:content relative from-white/0 to-white/100 to-40% before:absolute before:-top-8 before:block before:h-8 before:w-full before:bg-gradient-to-b">
              <div className="flex items-center">
                <Button
                  type="submit"
                  className="ease-curve-d inset-0 m-0 flex-1 transform-gpu rounded-none rounded-bl-sm border-0 bg-white text-gray-900 shadow-none transition-colors duration-200 hover:bg-gray-200"
                  disabled={(() => {
                    if (selectedItems.length !== form.watch("items").length) {
                      return false;
                    }

                    if (
                      selectedItems.every((item) =>
                        form.watch("items").includes(item),
                      )
                    ) {
                      return true;
                    }

                    return false;
                  })()}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    form.reset({
                      items: [],
                    })
                  }
                  className="inset-0 m-0 flex-1 rounded-none rounded-br-sm border-0 bg-white text-gray-900 shadow-none hover:bg-gray-200"
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

export default FilterButton;
