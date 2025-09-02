import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PriceList from "../components/price-list";
import WhatsAppButton from "../components/WhatsAppButton";

export default function PriceListPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/*
          The previous large header section has been removed.
          The page now starts directly with the PriceList component,
          making the price grid the first thing the user sees.
        */}
        <PriceList />

        {/* Why Choose Us Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mengapa Pilih Bengkel Cirebon?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tinggi
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background rounded-lg border border-border shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Teknisi Berpengalaman</h3>
                <p className="text-muted-foreground">
                  Tim teknisi profesional dengan pengalaman 10+ tahun di bidang otomotif
                </p>
              </div>

              <div className="text-center p-6 bg-background rounded-lg border border-border shadow-sm">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Peralatan Modern</h3>
                <p className="text-muted-foreground">
                  Menggunakan peralatan dan teknologi terkini untuk hasil maksimal
                </p>
              </div>

              <div className="text-center p-6 bg-background rounded-lg border border-border shadow-sm">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-secondary">💎</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Kualitas Premium</h3>
                <p className="text-muted-foreground">
                  Garansi kualitas dan kepuasan pelanggan adalah prioritas utama kami
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
