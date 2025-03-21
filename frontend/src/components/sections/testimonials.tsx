import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "UptimeGuard has been a game changer for our business. The real-time alerts and detailed monitoring reports have saved us countless headaches. Highly recommended!",
    name: "James Carter",
    designation: "Owner at CarterTech Solutions",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export function Testimonials() {
  return (
      <section className="container pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our satisfied customers have to say about our product and the impact it's had on their business
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
      </section>
  );
}
