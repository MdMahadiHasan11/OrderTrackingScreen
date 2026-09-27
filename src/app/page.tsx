"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Box,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Clock3,
  Copy,
  Headphones,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

const states = {
  delayed: {
    eyebrow: "Delivery update",
    title: "Your order is delayed",
    detail:
      "We’re sorry — your package is taking a little longer than expected.",
    date: "Friday, October 18",
    time: "by 9:00 PM",
    tone: "warning",
    current: "Delayed in transit",
    action: "Get help with my order",
  },
  missing: {
    eyebrow: "Delivered today",
    title: "We couldn’t find your package?",
    detail:
      "Your order was marked delivered at 2:14 PM. Check nearby safe places first.",
    date: "Delivered today",
    time: "at 2:14 PM",
    tone: "purple",
    current: "Delivered",
    action: "Report a delivery issue",
  },
  unavailable: {
    eyebrow: "Order confirmed",
    title: "Tracking isn’t available yet",
    detail: "We’ll add updates here as soon as the carrier scans your package.",
    date: "Estimated delivery",
    time: "October 22–24",
    tone: "blue",
    current: "Preparing your order",
    action: "Contact support",
  },
} as const;

type StateKey = keyof typeof states;

const steps = [
  { label: "Order placed", caption: "Oct 14, 9:32 AM", icon: Check },
  { label: "Preparing order", caption: "Oct 14, 11:08 AM", icon: Box },
  { label: "Shipped", caption: "Oct 15, 6:41 PM", icon: Truck },
  { label: "Out for delivery", caption: "Coming soon", icon: MapPin },
];

export default function Page() {
  const [state, setState] = useState<StateKey>("delayed");
  const [showDetails, setShowDetails] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const current = states[state];
  const progress =
    state === "unavailable" ? 38 : state === "missing" ? 100 : 72;

  return (
    <main className="min-h-screen bg-[#f6f8f9] bg-[radial-gradient(circle_at_50%_-10%,#dceeed_0,transparent_36%)] px-4 pb-13 pt-6 font-sans text-[#17212b] min-[700px]:pt-12">
      <div className="relative mx-auto max-w-107.5">
        <header className="mb-4.5 flex items-center justify-between">
          <button
            className="grid size-10 cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent p-2 text-[#17212b] hover:bg-[#eaf0f1] [&_svg]:size-5"
            aria-label="Go back"
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col gap-0.75 text-center text-[15px] font-bold [&_small]:text-[11px] [&_small]:font-medium [&_small]:text-[#6d7b88]">
            <span>Order tracking</span>
            <small>Order #18492</small>
          </div>
          <button
            className="grid size-10 cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent p-2 text-[#17212b] hover:bg-[#eaf0f1] [&_svg]:size-5"
            aria-label="Get help"
            onClick={() => setShowSupport(true)}
          >
            <CircleHelp />
          </button>
        </header>

        <div
          className="mb-3.5 grid grid-cols-3 gap-0.5 rounded-sm bg-[#e9eff0] p-0.75"
          role="tablist"
          aria-label="Preview order states"
        >
          {(Object.keys(states) as StateKey[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={state === key}
              className={
                state === key
                  ? "cursor-pointer rounded-[9px] border-0 bg-white px-1.25 py-2.25 text-[11px] font-bold text-[#17212b] shadow-[0_2px_7px_#1b323312]"
                  : "cursor-pointer rounded-[9px] border-0 bg-transparent px-1.25 py-2.25 text-[11px] font-bold text-[#6d7b88]"
              }
              onClick={() => setState(key)}
            >
              {key === "delayed"
                ? "Delayed"
                : key === "missing"
                  ? "Not received"
                  : "No tracking"}
            </button>
          ))}
        </div>

        <section
          className={`mb-3 flex gap-3.5 rounded-2xl border p-[19px_17px] ${current.tone === "warning" ? "border-[#f4dfaa] bg-[#fff3d8]" : current.tone === "purple" ? "border-[#ddd4ff] bg-[#f0ebff]" : "border-[#cce9e6] bg-[#e4f3f2]"}`}
          aria-live="polite"
        >
          <div className="grid size-10.5 min-w-10.5 place-items-center rounded-[13px] bg-white/60 [&_svg]:size-5.5">
            {state === "delayed" ? (
              <Clock3 />
            ) : state === "missing" ? (
              <AlertCircle />
            ) : (
              <PackageCheck />
            )}
          </div>
          <div>
            <p className="mb-1.25 text-[10px] font-extrabold uppercase tracking-widest text-[#6d7b88]">
              {current.eyebrow}
            </p>
            <h1>{current.title}</h1>
            <p className="mt-1.5 text-[13px] leading-[1.45] text-[#536370]">
              {current.detail}
            </p>
          </div>
        </section>

        <section className="mb-3 flex items-center justify-between rounded-[15px] border border-[#e8edf0] bg-white p-[16px_17px]">
          <div>
            <p className="mb-1.25 text-[10px] font-extrabold uppercase tracking-widest text-[#6d7b88]">
              {current.date}
            </p>
            <strong>{current.time}</strong>
          </div>
          <span className="rounded-full bg-[#e4f3f2] px-2.5 py-1 text-[10px] font-extrabold text-[#246b7b]">
            {state === "delayed"
              ? "Updated"
              : state === "missing"
                ? "Delivered"
                : "On schedule"}
          </span>
        </section>

        <section
          className="mb-3 rounded-[15px] border border-[#e8edf0] bg-white p-[18px_17px_17px]"
          aria-label="Delivery progress"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1.25 text-[10px] font-extrabold uppercase tracking-widest text-[#6d7b88]">
                Current status
              </p>
              <h2>{current.current}</h2>
            </div>
            <span className="text-[12px] font-extrabold text-[#246b7b]">
              {progress}%
            </span>
          </div>
          <div className="my-[14px_0_17px] h-1.5 overflow-hidden rounded-[10px] bg-[#edf1f2] [&>span]:block [&>span]:h-full [&>span]:rounded-[10px] [&>span]:bg-[#246b7b] [&>span]:transition-[width]">
            <span style={{ width: `${progress}%` }} />
          </div>
          <ol className="m-0 flex list-none flex-col gap-3.25 p-0">
            {steps.map((step, index) => {
              const completed =
                index < 2 || (state === "missing" && index === 3);
              const active =
                state === "delayed"
                  ? index === 2
                  : state === "unavailable"
                    ? index === 1
                    : index === 3;
              const Icon = step.icon;
              return (
                <li key={step.label} className="flex items-center gap-3">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full border text-[#6d7b88] [&_svg]:size-3.5 ${completed ? "border-[#246b7b] bg-[#246b7b] text-white" : active ? "border-[#246b7b] bg-[#e4f3f2] text-[#246b7b]" : "border-[#dce5e7] bg-[#f8fafb]"}`}
                  >
                    {completed ? <Check /> : <Icon />}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <strong
                      className={
                        active || completed
                          ? "text-[13px] font-bold text-[#17212b]"
                          : "text-[13px] font-semibold text-[#6d7b88]"
                      }
                    >
                      {step.label}
                    </strong>
                    <small className="text-[11px] text-[#6d7b88]">
                      {active && state === "delayed"
                        ? "Carrier delay reported"
                        : active && state === "missing"
                          ? "Marked delivered"
                          : step.caption}
                    </small>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="flex items-center gap-3 rounded-[15px] border border-[#e8edf0] bg-white p-2.75">
          <div className="grid size-13 place-items-center rounded-[11px] bg-[#e8efef] text-[#246b7b] [&_svg]:w-6">
            <Box />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1.25 text-[10px] font-extrabold uppercase tracking-widest text-[#6d7b88]">
              1 item
            </p>
            <h2 className="truncate text-[14px] font-extrabold">
              Everyday Carry Backpack
            </h2>
            <p className="mt-1 text-[12px] text-[#6d7b88]">Black · 20L</p>
          </div>
          <button
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-[9px] border-0 bg-[#f1f5f6] text-[#6d7b88] hover:bg-[#e6edef] [&_svg]:size-4"
            aria-label="Copy order number"
            onClick={() => navigator.clipboard?.writeText("18492")}
          >
            <Copy />
          </button>
        </section>

        <button
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent py-[15px_0_12px] text-[12px] font-extrabold text-[#246b7b] [&_svg]:w-3.75"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? "Hide order details" : "View order details"}{" "}
          {showDetails ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showDetails && (
          <div className="mb-3 grid grid-cols-[1fr_1.5fr] gap-2.25 rounded-sm border border-[#e8edf0] bg-white p-3.25 text-[11px]">
            <span>Shipping to</span>
            <strong>Jordan Lee · 124 Market Street</strong>
            <span>Carrier</span>
            <strong>SwiftShip · SS-4920184</strong>
          </div>
        )}

        <button
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] border-0 bg-[#17212b] p-3 text-[13px] font-extrabold text-white [&_svg]:size-4"
          onClick={() => setShowSupport(true)}
        >
          <Headphones />
          {current.action}
        </button>
        <button
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] border border-[#dce5e7] bg-white p-3 text-[13px] font-extrabold text-[#17212b] [&_svg]:size-4"
          onClick={() => setShowSupport(true)}
        >
          <MessageCircle />
          Chat with support
        </button>

        {showSupport && (
          <div
            className="fixed bottom-0 left-1/2 z-10 w-[min(430px,calc(100%-24px))] -translate-x-1/2 rounded-t-[20px] border border-[#e8edf0] bg-white p-[19px_17px_24px] shadow-[0_-12px_40px_#20333c22]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-title"
          >
            <div className="mb-4.25 flex items-center justify-between">
              <div className="grid size-9.5 place-items-center rounded-full bg-[#e4f3f2] text-[#246b7b] [&_svg]:w-4.75">
                <Headphones />
              </div>
              <button
                className="grid cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent p-2 text-[25px] text-[#6d7b88]"
                onClick={() => setShowSupport(false)}
                aria-label="Close support"
              >
                ×
              </button>
            </div>
            <p className="mb-1.25 text-[10px] font-extrabold uppercase tracking-widest text-[#6d7b88]">
              We&apos;re here to help
            </p>
            <h2 id="support-title">What can we help with?</h2>
            <p className="mt-1.5 text-[13px] leading-[1.45] text-[#536370]">
              Our support team is ready to look into order #18492.
            </p>
            <button
              className="mt-2.5 flex w-full cursor-pointer items-center gap-2.75 rounded-sm border border-[#e8edf0] bg-white p-3.25 text-left"
              onClick={() => setShowSupport(false)}
            >
              <MessageCircle />
              <span>
                <strong>Start a chat</strong>
                <small>Usually replies in under 2 min</small>
              </span>
              <ChevronDown />
            </button>
            <button
              className="mt-2.5 flex w-full cursor-pointer items-center gap-2.75 rounded-sm border border-[#e8edf0] bg-white p-3.25 text-left"
              onClick={() => setShowSupport(false)}
            >
              <AlertCircle />
              <span>
                <strong>Report an issue</strong>
                <small>Tell us what happened</small>
              </span>
              <ChevronDown />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
