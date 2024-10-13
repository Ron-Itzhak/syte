"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Catalog, Locale } from "@/app/catalogs/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "../../components/multi-select";
import { useCatalogs } from "../contexts/catalogs-context";
export const localesArray = Object.values(Locale);
interface formProps {
  createMode: boolean;
  catalog?: Catalog;
}

export function CatalogForm({ createMode, catalog }: formProps) {
  const [isCreate] = useState(createMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCatalog, upadateCatalog } = useCatalogs();

  const FormSchema = z.object({
    name: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "Catalog name must not be empty" })),
    isPrimary: z.boolean().default(false),

    vertical: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "Must select one Vertical" })),

    locales: z
      .array(z.string())
      .min(1, { message: "You must select at least one locale" }),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      if (isCreate) {
        const status = await createCatalog(data as Catalog);

        const toastMessage =
          status === 201
            ? `Catalog added successfully`
            : `Failed to add Catalog`;
        toast({
          title: toastMessage,
          description: `Catalog : ${data.name} `,
        });
      } else {
        if (catalog) {
          const status = await upadateCatalog({
            ...data,
            _id: catalog._id,
          } as Catalog);
          const toastMessage =
            status === 200
              ? `Updated Catalog successfully`
              : `Failed to update Catalog`;
          toast({
            title: toastMessage,
            description: `Catalog : ${data.name} `,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      form.reset(defaultValues);

      setIsSubmitting(false);
    }
  }
  const defaultValues = catalog
    ? catalog
    : { name: "", vertical: "", locales: [], isPrimary: false };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{createMode ? "Create " : "Edit"} Catalog</CardTitle>
        <CardDescription>Customize details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catalog name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter Catalog name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vertical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vertical</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vertical" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem title="single_select" value="general">
                        General{" "}
                      </SelectItem>
                      <SelectItem title="single_select" value="home">
                        Home
                      </SelectItem>
                      <SelectItem title="single_select" value="fashion">
                        Fashion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locales"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Locales</FormLabel>
                  </div>

                  <MultiSelect field={field} options={localesArray} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Primary</FormLabel>
                  <FormDescription>Select if primary</FormDescription>
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>IsPrimary</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
