"use client";

import { useEffect, useTransition } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SendIcon, LoaderIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { handleSendPrompt } from "@/service/ai.service";
import { useAutoResizeTextarea } from "@/hooks/use_auto_resize_textarea";
import { Textarea } from "./ui/text-area-ia";
import { TypingDots } from "./typing-dots";

import dynamic from "next/dynamic";

const PDFUploader = dynamic(() => import("./pdf-uploader"), {
  ssr: false,
});

interface ConversationData {
  ask: string;
  response: string;
}

export function AnimatedAIChat() {
  const [value, setValue] = useState("");
  const [conversation, setConversation] = useState<ConversationData[]>();
  const [isTyping, setIsTyping] = useState(false);
  const [, startTransition] = useTransition();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        await handleSendMessage();
      }
    }
  };

  const handleSendMessage = async () => {
    if (value.trim()) {
      const response = await handleSendPrompt(value);

      startTransition(() => {
        setIsTyping(true);
        setConversation((old) =>
          old
            ? [
                ...old,
                {
                  ask: value,
                  response,
                },
              ]
            : [
                {
                  ask: value,
                  response,
                },
              ]
        );
        setTimeout(() => {
          setIsTyping(false);
          setValue("");
          adjustHeight(true);
        }, 3000);
      });
    }
  };

  return (
    <div className="min-h-screen  bg-transparent text-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>
      <section className="min-h-screen grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.5fr)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.25fr)] md:items-center">
        <div className="w-full max-w-2xl mx-auto relative">
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Seção Wellcome */}
            {conversation && conversation.length > 0 ? (
              <div>Aqui</div>
            ) : (
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block"
                >
                  <h1 className="text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                    TechGroup
                  </h1>
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.div>
                <motion.p
                  className="text-xl text-white/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Como posso te ajudar ?
                </motion.p>
              </div>
            )}

            <motion.div
              className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4">
                <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="faça uma pergunta sobre a techgroup..."
                  containerClassName="w-full"
                  className={cn(
                    "w-full px-4 py-3",
                    "resize-none",
                    "bg-transparent",
                    "border-none",
                    "text-white/90 text-sm",
                    "focus:outline-none",
                    "placeholder:text-white/20",
                    "min-h-[60px]"
                  )}
                  style={{
                    overflow: "hidden",
                  }}
                  showRing={false}
                />
              </div>

              {/* Botão Por baixo do text area */}
              <div className="p-4 border-t border-white/[0.05] flex items-center justify-end gap-4">
                <motion.button
                  type="button"
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isTyping || !value.trim()}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    "flex items-center gap-2",
                    value.trim()
                      ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                      : "bg-white/[0.05] text-white/40"
                  )}
                >
                  {isTyping ? (
                    <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                  ) : (
                    <SendIcon className="w-4 h-4" />
                  )}
                  <span>Enviar</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full min-w-80 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] max-w-sm relative overflow-y-auto">
          <PDFUploader />
        </div>
      </section>

      {/* Botão flutuante que pensa */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            className="fixed bottom-8 left-1/2 mx-auto transform -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-4 py-2 shadow-lg border border-white/[0.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-center">
                <span className="text-xs font-medium text-white/90 mb-0.5">
                  T
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Pensando</span>
                <TypingDots />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {inputFocused && (
        <motion.div
          className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[96px]"
          animate={{
            x: mousePosition.x - 400,
            y: mousePosition.y - 400,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.5,
          }}
        />
      )}
    </div>
  );
}

const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = rippleKeyframes;
  document.head.appendChild(style);
}
