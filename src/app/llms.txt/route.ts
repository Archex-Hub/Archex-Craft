import { llmsText } from "@/lib/agentic/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  });
}
