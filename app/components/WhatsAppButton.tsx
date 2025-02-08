import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/your_whatsapp_number"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
    >
      <MessageCircle size={24} className="mr-2" />
      <span className="font-medium">Hubungi Kami</span>
    </a>
  )
}

