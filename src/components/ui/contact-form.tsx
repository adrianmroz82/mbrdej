"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { Textarea } from "@/components/shadcn-ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  email: z.string().email("Niepoprawny adres email"),
  message: z.string().min(1, "Wiadomość jest wymagana"),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
    form.reset();
  };

  return (
    <div className="mx-auto pb-6 pt-2 w-full">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Formularz kontaktowy</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Twoje imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Twój Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wiadomość</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Twoja wiadomość" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Twoja wiadomość
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
