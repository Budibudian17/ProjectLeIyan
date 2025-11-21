import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import ProductsSection from '@/components/products/Products';
import AboutSection from '@/components/about/AboutSection';
import ProductOverview from '@/components/overview/ProductOverview';
import OurVision from '@/components/vision/OurVision';
import OurGallery from '@/components/gallery/OurGallery';
import CustomerTestimonials from '@/components/testimonials/CustomerTestimonials';
import OurClients from '@/components/clients/OurClients';
import FaqSection from '@/components/faq/FaqSection';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <Hero />
      <ProductsSection />
      <AboutSection />
      <ProductOverview />
      <OurVision />
      <OurGallery />
      <CustomerTestimonials />
      <FaqSection />
      <OurClients />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10"></main>
      <Footer />
    </div>
  );
}
