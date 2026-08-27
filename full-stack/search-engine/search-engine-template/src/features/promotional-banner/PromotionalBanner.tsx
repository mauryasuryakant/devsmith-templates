import { storeConfig } from "../../../devsmith.config";

export default function PromotionalBanner() {
  if (!storeConfig.promotions.isActive) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium tracking-wide">
      {storeConfig.promotions.bannerText}
    </div>
  );
}
