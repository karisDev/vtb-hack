// interface Services {
//   supportsPayment: ServiceStatus;
//   supportsChargeRub: ServiceStatus;
//   blind: ServiceStatus;
//   visuallyImpaired: ServiceStatus;
//   nfcForBankCards: ServiceStatus;
//   nfcMetro: ServiceStatus;
//   qrCash: ServiceStatus;
//   qrRead: ServiceStatus;
//   wheelchair: ServiceStatus;
// }

// supportsPayment
// supportsChargeRub
// blind
// visuallyImpaired
// nfcForBankCards
// nfcMetro
// qrCash
// qrRead
// wheelchair
interface useLocaleResult {
  atm: {};
  department: {
    vip_zone: string; // — Зона премиального обслуживания
    vip_office: string; // — Офис Прайм
    ramp: string; // — Оборудован пандусом
    person: string; // — Обслуживает физ. лица
    juridical: string; // — Обслуживает юр. лица
  };
  load: {
    low: string;
    medium: string;
    high: string;
  };
}

export const useLocale = (): useLocaleResult => ({
  atm: {},
  department: {
    vip_zone: "Премиальное обслуживание",
    vip_office: "Офис Прайм",
    person: "Физические лица",
    juridical: "Юридические лица",
    ramp: "Доступно для инвалидов",
  },
  load: {
    low: "Свободно",
    medium: "Средняя загруженность",
    high: "Высокая загруженность",
  },
});
