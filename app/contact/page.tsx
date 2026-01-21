import ContactForm from "@/components/ContactForm";
import Navigation from "@/components/Navigation";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </section>
    </main>
  );
}
