import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/62819647333"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 hover:opacity-80 transition-opacity duration-300"
    >
      <Image
        src="/images/whatsapp.svg"
        alt="WhatsApp"
        width={64} 
        height={64}
        priority
        className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
      />
    </a>
  );
}
