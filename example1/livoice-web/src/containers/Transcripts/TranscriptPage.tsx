import { ArrowLeft, MessageCircle, Upload as UploadIcon } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import {
  useChatTranscriptMutation,
  useGetTranscriptQuery,
  useListTranscriptChunksQuery,
  useUploadTranscriptTextMutation,
} from "@/api/api";
import { cn } from "@/lib/cn";
import { toTranscripts } from "@/services/linker";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { TranscriptTimeline } from "./components/TranscriptTimeline";

const TranscriptPage = () => {
  const { t } = useTranslation("common");
  const { transcriptId = "" } = useParams<{ transcriptId: string }>();
  const transcriptQuery = useGetTranscriptQuery(transcriptId, {
    enabled: !!transcriptId,
  });
  const chunkQuery = useListTranscriptChunksQuery(transcriptId, {
    enabled: !!transcriptId,
  });
  const uploadMutation = useUploadTranscriptTextMutation();
  const chatMutation = useChatTranscriptMutation();

  const [transcriptText, setTranscriptText] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: "user" | "assistant"; text: string }>
  >([]);

  const timelineChunks = chunkQuery.data ?? [];
  const isLoading = transcriptQuery.isLoading || chunkQuery.isLoading;

  const formattedDate = useMemo(() => {
    if (!transcriptQuery.data) return "";
    return new Date(transcriptQuery.data.transcriptDate).toLocaleDateString();
  }, [transcriptQuery.data]);

  const normalizedTranscript = transcriptQuery.data;

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!transcriptId || !transcriptText.trim()) return;
    await uploadMutation.mutateAsync({
      id: transcriptId,
      body: { text: transcriptText },
    });
    setTranscriptText("");
  };

  const handleChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!transcriptId || !event.currentTarget.elements.namedItem("chatMessage"))
      return;
    const formData = new FormData(event.currentTarget);
    const message = (formData.get("chatMessage") as string | null) ?? "";
    if (!message.trim()) return;

    const response = await chatMutation.mutateAsync({
      id: transcriptId,
      body: { userMessage: message },
    });
    setChatHistory((current) => [
      ...current,
      { role: "user", text: message },
      { role: "assistant", text: response.answer },
    ]);
    event.currentTarget.reset();
  };

  if (isLoading) return <Card>{t("status.loading")}</Card>;
  if (transcriptQuery.isError || !normalizedTranscript)
    return <Card>{t("status.error")}</Card>;

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-700 text-white shadow-[0_40px_90px_rgba(15,23,42,0.45)]">
        <div className="space-y-6 px-8 py-8">
          <Link
            to={toTranscripts()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("buttons.back")}
          </Link>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                {t("pageTitles.transcriptDetail")}
              </p>
              <h1 className="text-3xl font-semibold">
                {normalizedTranscript.title}
              </h1>
              <p className="max-w-3xl text-white/80">
                {normalizedTranscript.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: t("fields.date"), value: formattedDate || "—" },
                {
                  label: t("fields.interviewee"),
                  value: normalizedTranscript.intervieweeName ?? "—",
                },
                {
                  label: t("fields.chunks"),
                  value: normalizedTranscript.chunkCount ?? 0,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 px-4 py-3 text-sm shadow-inner"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="space-y-6">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                  Upload transcript
                </p>
                <p className="text-sm text-slate-500">
                  Paste the interview text to keep the knowledge base fresh.
                </p>
              </div>
              <UploadIcon className="h-5 w-5 text-violet-500" />
            </div>
            <textarea
              name="transcriptText"
              className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              rows={5}
              placeholder="Paste transcript text here"
              value={transcriptText}
              onChange={(event) => setTranscriptText(event.target.value)}
            />
            <Button type="submit" className="w-full">
              <UploadIcon className="h-4 w-4" />
              {t("buttons.uploadText")}
            </Button>
          </form>
          <TranscriptTimeline chunks={timelineChunks} />
        </Card>

        <div className="space-y-6">
          <Card>
            <form onSubmit={handleChat} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                    {t("buttons.sendQuestion")}
                  </p>
                  <p className="text-sm text-slate-500">
                    Ask any follow-up question about this transcript.
                  </p>
                </div>
                <MessageCircle className="h-5 w-5 text-violet-500" />
              </div>
              <textarea
                name="chatMessage"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                rows={4}
                placeholder="Ask about this interview"
              />
              <Button type="submit" className="w-full">
                <MessageCircle className="h-4 w-4" />
                {t("buttons.sendQuestion")}
              </Button>
            </form>
          </Card>

          <Card className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                Chat history
              </p>
              <p className="text-sm text-slate-500">
                Review the ongoing conversation with this transcript.
              </p>
            </div>
            {chatHistory.length ? (
              <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
                {chatHistory.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm",
                      message.role === "user"
                        ? "border-violet-200 bg-violet-50 text-violet-900"
                        : "border-slate-200 bg-white/80 text-slate-700"
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {message.role === "user" ? "You" : "Assistant"}
                    </p>
                    <p className="mt-1">{message.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No chat yet.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPage;
