import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Barber, Service } from "@/types/booking";

type Props = {
  barber: Barber;
  service: Service;
  date: Date;
  time: string;
  customer: { firstName: string; lastName: string; phone: string; email: string };
  onReset: () => void;
};

export const Confirmation = ({ barber, service, date, time, customer, onReset }: Props) => (
  <section className="container flex min-h-[80vh] items-center py-12 sm:py-16">
    <div className="mx-auto max-w-2xl text-center animate-fade-up">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow sm:h-20 sm:w-20">
        <CheckCircle2 className="h-8 w-8 text-primary-foreground sm:h-10 sm:w-10" />
      </div>
      <p className="mt-6 font-display text-xs tracking-[0.4em] text-primary sm:mt-8 sm:text-sm sm:tracking-[0.5em]">
        YOU'RE BOOKED
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
        See You <span className="text-gradient">Soon</span>, {customer.firstName}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
        A confirmation has been sent to <span className="break-all text-foreground">{customer.email}</span>.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border text-left sm:mt-10">
        <Cell label="Barber" value={barber.name} />
        <Cell label="Service" value={service.name} />
        <Cell label="Date" value={format(date, "EEE, MMM d")} />
        <Cell label="Time" value={time} />
        <Cell label="Phone" value={customer.phone} />
        <Cell label="Total" value={service.price} highlight />
      </div>

      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="mt-8 h-14 w-full rounded-sm border-border bg-transparent px-10 font-display tracking-[0.3em] hover:bg-secondary sm:mt-10 sm:w-auto"
      >
        BOOK ANOTHER VISIT
      </Button>
    </div>
  </section>
);

const Cell = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="bg-card p-4 sm:p-6">
    <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground sm:text-xs sm:tracking-[0.4em]">
      {label.toUpperCase()}
    </p>
    <p className={`mt-1.5 break-words font-display text-lg sm:mt-2 sm:text-2xl ${highlight ? "text-gradient" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);
