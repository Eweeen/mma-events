import { UfcFightCard } from "@/types/event";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { X } from "lucide-react";
import FightItem from "./FightItem";

interface FightCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  fightCardData: UfcFightCard | null;
}

export default function FightCardModal({
  isOpen,
  onClose,
  fightCardData,
}: FightCardModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Date not available";
    return format(date, "EEEE dd MMM yyyy, HH:mm", { locale: fr });
  };

  return (
    <div className="fixed inset-0 bg-background/70 flex items-end justify-center">
      <div className="w-full h-full max-h-[95dvh] bg-background p-4 rounded-t-lg overflow-y-auto overflow-x-hidden">
        <header className="flex justify-between items-start">
          <h2 className="text-xl font-bold mb-2">Fight Card</h2>
          <button onClick={onClose}>
            <X className="inline-block size-6" />
          </button>
        </header>

        {/* Main Card */}
        <div>
          <h3 className="text-lg text-center font-semibold">
            Carte Principale
          </h3>
          <h4 className="text-sm text-center mb-2">
            {formatDate(fightCardData?.mainCard.date)}
          </h4>

          {fightCardData?.mainCard.fights.map((fight) => (
            <FightItem key={fight.order} fight={fight} />
          ))}
        </div>

        {/* Preliminary Card */}
        <div className="mt-4">
          <h3 className="text-lg text-center font-semibold">
            Carte Préliminaire
          </h3>
          <h4 className="text-sm text-center mb-2">
            {formatDate(fightCardData?.prelims.date)}
          </h4>

          {fightCardData?.prelims.fights.map((fight) => (
            <FightItem key={fight.order} fight={fight} />
          ))}
        </div>

        {/* Early Preliminary Card */}
        {fightCardData?.earlyPrelims &&
          fightCardData.earlyPrelims.fights.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg text-center font-semibold">
                Carte Pre-Préliminaire
              </h3>
              <h4 className="text-sm text-center mb-2">
                {formatDate(fightCardData.earlyPrelims.date)}
              </h4>

              {fightCardData.earlyPrelims.fights.map((fight) => (
                <FightItem key={fight.order} fight={fight} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
