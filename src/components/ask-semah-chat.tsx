"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "ما هي سِمَة؟",
  "كيف أختار ألوان علامتي التجارية؟",
  "ما الفرق بين الباقات؟",
  "كيف أشارك المشروع مع عميلي؟",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "أهلًا بك! 👋 أنا **سِمَة**، مساعدك الذكي لبناء الهوية المؤسسية.\n\nاسألني عن المنصة، أو عن اختيار الألوان والخطوط، أو عن طريقة العمل. كيف أقدر أساعدك؟",
};

export function AskSemahChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, open, scrollToBottom]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const nextMessages: Msg[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "فشل الطلب");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "عذرًا، لم أفهم. حاول مرة أخرى." },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "خطأ غير معروف";
        toast.error("تعذّر الاتصال بالمساعد", { description: msg });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚠️ تعذّر الاتصال بالخادم حاليًا. تأكد من الاتصال بالإنترنت ثم حاول مجددًا.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const reset = () => {
    setMessages([GREETING]);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="اسأل سِمَة"
        className="fixed bottom-5 end-5 z-50 flex size-14 items-center justify-center rounded-full brand-gradient text-primary-foreground shadow-2xl shadow-primary/40 animate-pulse-ring"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="c"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 end-5 z-50 flex h-[560px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-border/70 bg-gradient-to-l from-primary/15 to-transparent px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground font-display text-base font-extrabold">
                  س
                  <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full bg-green-400 ring-2 ring-card" />
                </span>
                <div className="leading-tight">
                  <div className="font-display text-sm font-bold">اسأل سِمَة</div>
                  <div className="text-[11px] text-muted-foreground">
                    مساعد الهوية الذكي · متصل
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={reset}
                  aria-label="محادثة جديدة"
                  title="محادثة جديدة"
                >
                  <RotateCcw className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setOpen(false)}
                  aria-label="إغلاق"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg brand-gradient text-primary-foreground text-xs font-bold">
                    س
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-ss-sm bg-muted px-3 py-2.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length <= 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="px-1 text-[11px] font-medium text-muted-foreground">
                    جرّب أحد هذه الأسئلة:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border/80 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:border-primary/50 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border/70 bg-card/80 p-3">
              <div className="flex items-end gap-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="اكتب سؤالك هنا…"
                  rows={1}
                  disabled={loading}
                  className="scrollbar-thin max-h-28 min-h-[44px] resize-none bg-background/60 text-sm"
                />
                <Button
                  size="icon"
                  className="size-11 shrink-0 rounded-xl"
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="إرسال"
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4 -rotate-180" />
                  )}
                </Button>
              </div>
              <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <Sparkles className="size-3" />
                مدعوم بالذكاء الاصطناعي · قد يحتوي على معلومات غير دقيقة
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg brand-gradient text-primary-foreground text-xs font-bold">
          س
        </span>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-se-sm brand-gradient text-primary-foreground"
            : "rounded-ss-sm bg-muted text-foreground"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{msg.content}</span>
        ) : (
          <div className="space-y-2 [&_p]:m-0 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:ps-5 [&_li]:my-0.5 [&_strong]:font-bold [&_a]:text-primary [&_a]:underline [&_h1]:font-bold [&_h1]:text-base [&_h1]:mt-2 [&_h2]:font-bold [&_h2]:text-sm [&_h2]:mt-2 [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[12px] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-background/60 [&_pre]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
