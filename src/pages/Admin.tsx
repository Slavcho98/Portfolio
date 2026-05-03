import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format, isSameDay, parseISO } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { barbers } from "@/data/barbers";
import {
  ADMIN_PASSCODE,
  StoredAppointment,
  deleteAppointment,
  isAdminAuthed,
  loadAppointments,
  setAdminAuthed,
} from "@/lib/appointments";
import { cn } from "@/lib/utils";

const Admin = () => {
  const [authed, setAuthed] = useState<boolean>(() => isAdminAuthed());
  const [code, setCode] = useState("");
  const [barberId, setBarberId] = useState<string>(barbers[0]?.id ?? "");
  const [filter, setFilter] = useState<"upcoming" | "today" | "all">("upcoming");
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);

  useEffect(() => {
    if (authed) setAppointments(loadAppointments());
  }, [authed]);

  useEffect(() => {
    document.title = "Admin · North & Blade";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === ADMIN_PASSCODE) {
      setAdminAuthed(true);
      setAuthed(true);
      toast.success("Welcome back");
    } else {
      toast.error("Wrong passcode");
    }
  };

  const handleLogout = () => {
    setAdminAuthed(false);
    setAuthed(false);
    setCode("");
  };

  const handleDelete = (id: string) => {
    deleteAppointment(id);
    setAppointments(loadAppointments());
    toast.success("Appointment removed");
  };

  const visible = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return appointments
      .filter((a) => a.barberId === barberId)
      .filter((a) => {
        const d = parseISO(a.date);
        if (filter === "today") return isSameDay(d, now);
        if (filter === "upcoming") return d >= today;
        return true;
      })
      .sort((a, b) => {
        const da = parseISO(a.date).getTime();
        const db = parseISO(b.date).getTime();
        if (da !== db) return da - db;
        return a.time.localeCompare(b.time);
      });
  }, [appointments, barberId, filter]);

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-sm border border-border bg-card p-6 shadow-card animate-fade-up"
        >
          <p className="font-display text-xs tracking-[0.4em] text-primary">STAFF ACCESS</p>
          <h1 className="mt-2 font-display text-3xl">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the shared passcode to view the schedule.
          </p>
          <div className="mt-6 space-y-2">
            <Label htmlFor="code" className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              PASSCODE
            </Label>
            <Input
              id="code"
              type="password"
              inputMode="numeric"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••"
              className="h-12 rounded-sm border-border bg-input text-base tracking-[0.5em]"
            />
          </div>
          <Button
            type="submit"
            className="mt-6 h-12 w-full rounded-sm bg-gradient-primary font-display tracking-[0.3em] text-primary-foreground shadow-elegant"
          >
            ENTER
          </Button>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> BACK TO BOOKING
          </Link>
        </form>
      </main>
    );
  }

  const selected = barbers.find((b) => b.id === barberId);

  return (
    <main className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="font-display text-[10px] tracking-[0.4em] text-primary">ADMIN</p>
            <h1 className="font-display text-xl">Schedule</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="rounded-sm border-border bg-transparent font-display text-xs tracking-[0.3em] hover:bg-secondary"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" /> EXIT
          </Button>
        </div>
      </header>

      <section className="container pt-6">
        <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">SELECT BARBER</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {barbers.map((b) => (
            <button
              key={b.id}
              onClick={() => setBarberId(b.id)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-sm border px-3 py-2 transition-smooth",
                barberId === b.id
                  ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              <img src={b.image} alt={b.name} className="h-9 w-9 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-display text-sm leading-tight">{b.name.split(" ")[0]}</p>
                <p className="text-[10px] tracking-widest opacity-80">{b.title.toUpperCase()}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {(["upcoming", "today", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "h-9 flex-1 rounded-sm border font-display text-xs tracking-[0.3em] transition-smooth",
                filter === f
                  ? "border-primary bg-secondary text-foreground"
                  : "border-border bg-input text-muted-foreground hover:text-foreground"
              )}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {visible.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border bg-card p-10 text-center">
              <CalendarIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-display text-lg">No appointments</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected?.name.split(" ")[0]} has nothing on the books for this view.
              </p>
            </div>
          ) : (
            visible.map((a) => {
              const d = parseISO(a.date);
              return (
                <article
                  key={a.id}
                  className="rounded-sm border border-border bg-card p-4 shadow-card animate-fade-up"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-[10px] tracking-[0.3em] text-primary">
                        {format(d, "EEE, MMM d").toUpperCase()} · {a.time}
                      </p>
                      <h2 className="mt-1 truncate font-display text-lg">
                        {a.customer.firstName} {a.customer.lastName}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {a.serviceName} · {a.serviceDuration}
                      </p>
                    </div>
                    <span className="font-display text-xl text-gradient">{a.servicePrice}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
                    <a
                      href={`tel:${a.customer.phone}`}
                      className="truncate text-foreground hover:text-primary"
                    >
                      {a.customer.phone}
                    </a>
                    <a
                      href={`mailto:${a.customer.email}`}
                      className="truncate text-right text-muted-foreground hover:text-primary"
                    >
                      {a.customer.email}
                    </a>
                  </div>
                  <Button
                    onClick={() => handleDelete(a.id)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-8 w-full rounded-sm text-xs tracking-[0.2em] text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-1.5 h-3 w-3" /> CANCEL
                  </Button>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default Admin;
