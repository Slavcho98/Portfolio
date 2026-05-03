import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Barber, Service } from "@/types/booking";

type Props = {
  barber: Barber;
  service: Service;
  onComplete: (data: {
    customer: { firstName: string; lastName: string; phone: string; email: string };
    date: Date;
    time: string;
  }) => void;
};

const TIME_SLOTS = [
  "09:00", "09:45", "10:30", "11:15",
  "13:00", "13:45", "14:30", "15:15",
  "16:00", "16:45", "17:30", "18:15",
];

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  email: z.string().trim().email("Enter a valid email").max(255),
});

export const BookingForm = ({ barber, service, onComplete }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, lastName, phone, email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (!date) return toast.error("Please select a date");
    if (!time) return toast.error("Please select a time slot");

    onComplete({ customer: { firstName, lastName, phone, email }, date, time });
  };

  return (
    <section className="container pb-28 pt-6 sm:pb-16 sm:pt-12 md:py-16">
      {/* Mobile booking summary bar */}
      <div className="mb-6 flex items-center justify-between gap-3 rounded-sm border border-border bg-card p-4 shadow-card lg:hidden animate-fade-up">
        <div className="min-w-0">
          <p className="font-display text-[10px] tracking-[0.3em] text-primary">YOUR APPOINTMENT</p>
          <p className="mt-1 truncate font-display text-base text-foreground">
            {service.name} <span className="text-muted-foreground">·</span> {barber.name.split(" ")[0]}
          </p>
        </div>
        <span className="font-display text-2xl text-gradient">{service.price}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr,360px]">
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 animate-fade-up">
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-primary sm:text-sm sm:tracking-[0.5em]">
              CHAPTER THREE
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-6xl">Your Details</h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
              Tell us who's sitting in the chair and when you want to drop in.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Field id="firstName" label="First Name" value={firstName} onChange={setFirstName} placeholder="John" />
            <Field id="lastName" label="Last Name" value={lastName} onChange={setLastName} placeholder="Doe" />
            <Field id="phone" label="Phone Number" value={phone} onChange={setPhone} placeholder="+1 555 000 1234" type="tel" />
            <Field id="email" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-xl tracking-wider sm:text-2xl">Pick a Date</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-14 w-full justify-start gap-3 rounded-sm border-border bg-input text-left text-sm font-normal hover:bg-secondary sm:text-base",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {date ? format(date, "EEE, MMM do, yyyy") : "Choose a day"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-[60] w-[calc(100vw-2rem)] max-w-sm p-0 bg-popover sm:w-auto" align="start" side="top" sideOffset={8} collisionPadding={16}>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setTime(undefined); }}
                  disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {date && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-display text-xl tracking-wider sm:text-2xl">Available Times</h2>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-4">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={cn(
                      "h-12 rounded-sm border font-display text-base tracking-widest transition-smooth sm:text-lg",
                      time === t
                        ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
                        : "border-border bg-input text-foreground hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop submit button */}
          <Button
            type="submit"
            size="lg"
            className="hidden h-14 w-full rounded-sm bg-gradient-primary font-display text-lg tracking-[0.3em] text-primary-foreground shadow-elegant transition-smooth hover:shadow-glow lg:inline-flex lg:w-auto lg:px-12"
          >
            CONFIRM BOOKING
          </Button>

          {/* Mobile sticky submit */}
          <div
            className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-xl lg:hidden"
            style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
          >
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-sm bg-gradient-primary font-display text-base tracking-[0.3em] text-primary-foreground shadow-elegant transition-smooth hover:shadow-glow"
            >
              CONFIRM · {service.price}
            </Button>
          </div>
        </form>

        {/* Desktop sidebar summary */}
        <aside className="hidden h-fit rounded-sm border border-border bg-card p-6 shadow-card lg:sticky lg:top-24 lg:block animate-fade-up">
          <p className="font-display text-xs tracking-[0.4em] text-primary">YOUR APPOINTMENT</p>
          <Summary label="Barber" value={barber.name} />
          <Summary label="Service" value={service.name} />
          <Summary label="Duration" value={service.duration} />
          {date && <Summary label="Date" value={format(date, "MMM d, yyyy")} />}
          {time && <Summary label="Time" value={time} />}
          <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
            <span className="font-display tracking-widest text-muted-foreground">TOTAL</span>
            <span className="font-display text-3xl text-gradient">{service.price}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

const Field = ({ id, label, value, onChange, placeholder, type = "text" }: {
  id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="font-display text-[10px] tracking-[0.3em] text-muted-foreground sm:text-xs">
      {label.toUpperCase()}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-12 rounded-sm border-border bg-input text-base sm:h-14"
    />
  </div>
);

const Summary = ({ label, value }: { label: string; value: string }) => (
  <div className="mt-4 flex items-center justify-between gap-4">
    <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className="font-display text-lg text-foreground">{value}</span>
  </div>
);
