"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [status, setStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setIsSending(true);
    setStatus(null);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        message: values.message,
        subject: `Wiadomość od ${values.name}`,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // TODO: move to translations/page config

      if (result.success) {
        setStatus("Wiadomość została wysłana pomyślnie!");
        form.reset();
      } else {
        console.error(result.error);
        setStatus("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Nie udało się nawiązać połączenia z serwerem.");
    } finally {
      setIsSending(false);
    }
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
              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? "Wysyłanie..." : "Wyślij wiadomość"}
              </Button>
              {status && <p className="text-center mt-2">{status}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
