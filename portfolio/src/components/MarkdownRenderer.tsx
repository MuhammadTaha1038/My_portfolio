"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-[68ch] w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-[var(--color-text-primary)]" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-10 mb-5 text-[var(--color-text-primary)]" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-8 mb-4 text-[var(--color-text-primary)]" {...props} />,
          p: ({ node, ...props }) => <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)] mb-6" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 text-[17px] leading-[1.7] text-[var(--color-text-secondary)]" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 text-[17px] leading-[1.7] text-[var(--color-text-secondary)]" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          a: ({ node, ...props }) => <a className="text-[var(--color-text-primary)] underline decoration-[var(--color-text-muted)] hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-2 border-[var(--color-accent)] pl-6 italic text-[var(--color-text-secondary)] my-8" {...props} />
          ),
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return <code className="font-mono text-[14px] bg-[var(--color-surface-2)] text-[var(--color-text-primary)] px-1.5 py-0.5 rounded-md border border-[var(--color-border)]" {...props} />;
            }
            return (
              <div className="relative my-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
                <div className="overflow-x-auto p-4">
                  <code className="font-mono text-[14px] text-[var(--color-text-primary)] block min-w-full" {...props} />
                </div>
              </div>
            );
          },
          pre: ({ node, ...props }) => <pre className="m-0 p-0 bg-transparent" {...props} />,
          img: ({ node, ...props }) => (
            <span className="block my-10 border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-surface)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto object-cover m-0" {...props} alt={props.alt || ""} />
            </span>
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8 border border-[var(--color-border)] rounded-xl">
              <table className="w-full text-left text-sm text-[var(--color-text-secondary)]" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className="bg-[var(--color-surface-2)] px-4 py-3 font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)]" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-3 border-b border-[var(--color-border)] last:border-0 bg-[var(--color-surface)]" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
