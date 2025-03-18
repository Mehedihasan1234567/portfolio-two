"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormState = z.infer<typeof contactSchema>;

export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof ContactFormState, value: string) => {
    try {
      contactSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isValid = Object.entries(formState).every(([key, value]) =>
      validateField(key as keyof ContactFormState, value)
    );

    if (!isValid) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to send message");
      }

      const data = await response.json();
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormState, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormState, value);
  };

  return (
    <section id="contact" className="py-20 bg-muted/40">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free
            to reach out!
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Here's how you can reach me</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="mailto:mehedihasan66t@gmail.com"
                  className="flex items-center space-x-4 hover:text-primary transition-colors"
                >
                  <Mail className="text-primary" />
                  <span>mehedihasan66t@gmail.com</span>
                </a>
                <a
                  href="tel:+8801596475866"
                  className="flex items-center space-x-4 hover:text-primary transition-colors"
                >
                  <Phone className="text-primary" />
                  <span>+880 1596475866</span>
                </a>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-primary" />
                  <span>Faridpur, Bangladesh</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={errors.name ? "border-destructive" : ""}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p
                        className="text-sm text-destructive mt-1"
                        id="name-error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={errors.email ? "border-destructive" : ""}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        className="text-sm text-destructive mt-1"
                        id="email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={errors.message ? "border-destructive" : ""}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        className="text-sm text-destructive mt-1"
                        id="message-error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
