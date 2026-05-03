import { useState } from "react";
import { Link } from "react-router-dom";
import { saveAppointment } from "@/lib/appointments";
import { SplashScreen } from "@/components/SplashScreen";
import { StepHeader } from "@/components/StepHeader";
import { BarberSelect } from "@/components/booking/BarberSelect";
import { ServiceSelect } from "@/components/booking/ServiceSelect";
import { BookingForm } from "@/components/booking/BookingForm";
import { Confirmation } from "@/components/booking/Confirmation";
import { Barber, BookingState, Service } from "@/types/booking";

type Step = "splash" | "barber" | "service" | "form" | "done";

const Index = () => {
  const [step, setStep] = useState<Step>("splash");
  const [booking, setBooking] = useState<BookingState>({});

  const stepNumber = { splash: 0, barber: 1, service: 2, form: 3, done: 4 }[step];

  const reset = () => {
    setBooking({});
    setStep("barber");
  };

  if (step === "splash") {
    return <SplashScreen onDone={() => setStep("barber")} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <StepHeader
        step={stepNumber}
        total={3}
        onBack={
          step === "service" ? () => setStep("barber")
          : step === "form" ? () => setStep("service")
          : step === "done" ? reset
          : undefined
        }
      />

      {step === "barber" && (
        <BarberSelect
          onSelect={(b: Barber) => {
            setBooking({ barber: b });
            setStep("service");
          }}
        />
      )}

      {step === "service" && booking.barber && (
        <ServiceSelect
          barber={booking.barber}
          onSelect={(s: Service) => {
            setBooking((prev) => ({ ...prev, service: s }));
            setStep("form");
          }}
        />
      )}

      {step === "form" && booking.barber && booking.service && (
        <BookingForm
          barber={booking.barber}
          service={booking.service}
          onComplete={({ customer, date, time }) => {
            setBooking((prev) => ({ ...prev, customer, date, time }));
            saveAppointment({ barber: booking.barber!, service: booking.service!, customer, date, time });
            setStep("done");
          }}
        />
      )}

      {step === "done" && booking.barber && booking.service && booking.date && booking.time && booking.customer && (
        <Confirmation
          barber={booking.barber}
          service={booking.service}
          date={booking.date}
          time={booking.time}
          customer={booking.customer}
          onReset={reset}
        />
      )}

      <footer className="border-t border-border/60 py-8 text-center text-xs tracking-[0.3em] text-muted-foreground">
        <p>NORTH & BLADE · CRAFTED CUTS SINCE 2014</p>
        <Link to="/admin" className="mt-3 inline-block text-[10px] tracking-[0.4em] text-muted-foreground/70 hover:text-primary">
          STAFF LOGIN
        </Link>
      </footer>
    </main>
  );
};

export default Index;
