"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";

import { capitalizeKeywords, formatTag } from "@/lib/utils";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  opening: boolean;
  onOpenChange?: (_open: boolean) => void;
  filterTags: {
    tags: string[];
    indices: number[];
  };
  filterCategories: {
    categories: string[];
    indices: number[];
  };
}

const FormSchema = z.object({
  tags: z.array(z.string()),
  categories: z.array(z.string()),
});

const FilterButton: React.FC<FilterButtonProps> = ({
  opening,
  onOpenChange,
  filterTags,
  filterCategories,
  ...rest
}) => {
  const tags = React.useMemo(
    () =>
      filterTags.tags.map((tag) => ({
        id: tag,
        label: formatTag(tag, {
          separator: "-",
          transform: capitalizeKeywords,
        }),
      })) as { id: string; label: string }[],
    [filterTags.tags],
  );

  const categories = React.useMemo(
    () =>
      filterCategories.categories.map((category) => ({
        id: category,
        label: formatTag(category, {
          separator: "-",
          transform: capitalizeKeywords,
        }),
      })) as { id: string; label: string }[],
    [filterCategories.categories],
  );

  const selectedTags = filterTags.indices.map(
    (index) => filterTags.tags[index],
  );

  const selectedCategories = filterCategories.indices.map(
    (index) => filterCategories.categories[index],
  );

  const smallDevice = useMediaQuery("(max-width: 640px)");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: selectedTags,
      categories: selectedCategories,
    },
  });

  const createPageURL = React.useCallback(
    (data: z.infer<typeof FormSchema>) => {
      const params = new URLSearchParams(searchParams);

      if (data.tags.length > 0) {
        params.set("tags", data.tags.join(","));
      } else {
        params.delete("tags");
      }

      if (data.categories.length > 0) {
        params.set("categories", data.categories.join(","));
      } else {
        params.delete("categories");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const handleOpenChange = React.useCallback(
    (state: boolean) => {
      if (onOpenChange) onOpenChange(state);
    },
    [onOpenChange],
  );

  const onSubmit = React.useCallback(
    (data: z.infer<typeof FormSchema>) => {
      createPageURL(data);

      toast({
        className: "bg-[#e0fdd4] border-lime-500 text-lime-600",
        title: "Filter Applied",
      });

      handleOpenChange(false);
    },
    [createPageURL, handleOpenChange],
  );

  const handlePopoverOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        form.reset({
          tags: selectedTags,
          categories: selectedCategories,
        });
      }

      handleOpenChange(open);
    },
    [form, handleOpenChange, selectedCategories, selectedTags],
  );

  const handleDisabledButton = React.useCallback(() => {
    if (
      selectedTags.length !== form.watch("tags").length ||
      selectedCategories.length !== form.watch("categories").length
    ) {
      return false;
    }

    if (!selectedTags.every((item) => form.watch("tags").includes(item))) {
      return false;
    }

    if (
      !selectedCategories.every((item) =>
        form.watch("categories").includes(item),
      )
    ) {
      return false;
    }

    return true;
  }, [form, selectedCategories, selectedTags]);

  const filtersDisplay = React.useCallback(() => {
    if (
      smallDevice ||
      (selectedCategories.length === 0 && selectedTags.length === 0)
    )
      return "Filter";

    let tagsDisplay = "";
    let categoriesDisplay = "";

    if (selectedCategories.length > 0) {
      categoriesDisplay = `CATG: ${selectedCategories[0]}`;

      if (selectedCategories.length > 1)
        categoriesDisplay += ` (${selectedCategories.length - 1} more)`;

      if (selectedTags.length > 0) categoriesDisplay += ", ";
    }

    if (selectedTags.length > 0) {
      tagsDisplay = `TAG: ${selectedTags[0]}`;

      if (selectedTags.length > 1)
        tagsDisplay += ` (${selectedTags.length - 1} more)`;
    }

    return `${categoriesDisplay}${tagsDisplay}`;
  }, [selectedCategories, selectedTags, smallDevice]);

  return (
    <Popover open={opening} onOpenChange={handlePopoverOpenChange}>
      {/* Button trigger  */}
      <PopoverTrigger onClick={() => onOpenChange?.(!opening)} asChild>
        <Button
          {...rest}
          className="ease-curve-d group flex w-1/2 transform-gpu items-center gap-3 rounded-full border border-neutral-200 bg-neutral-100/0 text-neutral-950 shadow-none duration-200 hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800 md:w-[unset]"
        >
          <span className="line-clamp-1 max-w-full">{filtersDisplay()}</span>
          <div className="relative inline-flex h-5 w-5 items-center justify-center">
            <MixerHorizontalIcon className="h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>

      {/* Popover content */}
      <PopoverContent className="ml-[var(--gutter-size)] rounded-md p-0 shadow-xl shadow-neutral-800/20 md:ml-0">
        {/* UI Form */}
        <Form {...form}>
          {/* Form tag */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <Tabs defaultValue="tags" className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-2">
                <TabsTrigger value="tags" className="col-span-1 col-start-1">
                  Tags
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="col-span-1 col-start-2"
                >
                  Categories
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tags" className="col-span-2">
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    /* Form layout */
                    <FormItem>
                      <div className="m-4">
                        <FormLabel className="text-base">Tags</FormLabel>
                        <FormDescription>
                          Filter articles by tags
                        </FormDescription>
                      </div>

                      {/* Scroll area */}
                      <ScrollArea className="h-48">
                        <div className="px-4 pb-8">
                          {tags.map((tag) => (
                            // Form items
                            <FormField
                              key={tag.id}
                              control={form.control}
                              name="tags"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={tag.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(tag.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                tag.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== tag.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {tag.label}
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
              </TabsContent>
              <TabsContent value="categories" className="col-span-2">
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    /* Form layout */
                    <FormItem>
                      <div className="m-4">
                        <FormLabel className="text-base">Categories</FormLabel>
                        <FormDescription>
                          Filter articles by categories
                        </FormDescription>
                      </div>

                      {/* Scroll area */}
                      <ScrollArea className="h-48">
                        <div className="px-4 pb-8">
                          {categories.map((category) => (
                            // Form items
                            <FormField
                              key={category.id}
                              control={form.control}
                              name="categories"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={category.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          category.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                category.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== category.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {category.label}
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
              </TabsContent>
            </Tabs>
            <div className="before:content relative from-white/0 to-white/100 to-40% before:absolute before:-top-8 before:block before:h-8 before:w-full before:bg-gradient-to-b dark:from-black/0 dark:to-black/100">
              <div className="flex items-center">
                <Button
                  type="submit"
                  className="ease-curve-d inset-0 m-0 flex-1 transform-gpu rounded-none rounded-bl-sm border-0 bg-white text-neutral-900 shadow-none transition-colors duration-200 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-black dark:text-neutral-100"
                  disabled={handleDisabledButton()}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    form.reset({
                      tags: [],
                      categories: [],
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

export default FilterButton;
