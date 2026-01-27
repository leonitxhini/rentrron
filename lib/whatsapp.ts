import { Language } from './i18n';

interface BookingParams {
  car: string;
  fromDate: string;
  toDate: string;
  location: string;
  lang?: Language;
}

const WHATSAPP_NUMBER = '+38349123456'; // Replace with actual number

export function generateWhatsAppMessage({
  car,
  fromDate,
  toDate,
  location,
  lang = 'en',
}: BookingParams): string {
  const messages = {
    en: `Hello RRON Rent A Car, I want to book: ${car} from ${fromDate} to ${toDate}, pickup: ${location}.`,
    sq: `Përshëndetje RRON, dua me rezervu: ${car} prej ${fromDate} deri ${toDate}, marrja: ${location}.`,
  };

  const message = encodeURIComponent(messages[lang]);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${message}`;
}

export function generateContactMessage(name: string, message: string, lang: Language = 'en'): string {
  const prefix = lang === 'en' 
    ? `Hello RRON, my name is ${name}. `
    : `Përshëndetje RRON, emri im është ${name}. `;
  const fullMessage = encodeURIComponent(prefix + message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${fullMessage}`;
}

