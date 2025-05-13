"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MdContentProps {
  markdown: string;
  className?: string;
}

const CodeBlock: React.FC<{ language: string; value: string }> = ({
  language,
  value,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-block">
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copiado" : "Copiar código"}
        title={copied ? "Copiado" : "Copiar código"}
      >
        {copied ? "Copiado!" : "Copiar"}
      </button>
      <SyntaxHighlighter
        style={a11yDark as unknown as { [key: string]: React.CSSProperties }}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          backgroundColor: "transparent",
          padding: "1.25rem",
          fontSize: "0.9rem",
          borderRadius: "0.5rem",
        }}
        showLineNumbers
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default function MdContent({
  markdown,
  className = "",
}: MdContentProps): React.ReactElement {
  const P: React.FC<
    React.HTMLAttributes<HTMLParagraphElement> & { node?: any }
  > = ({ children, ...props }) => (
    <p className="mb-6 leading-relaxed" {...props}>
      {children}
    </p>
  );

  const Ul: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
    children,
    ...props
  }) => (
    <ul className="list-disc list-inside mb-6 pl-4 space-y-2" {...props}>
      {children}
    </ul>
  );

  const Ol: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({
    children,
    ...props
  }) => (
    <ol className="list-decimal list-inside mb-6 pl-4 space-y-2" {...props}>
      {children}
    </ol>
  );

  const Li: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
    children,
    ...props
  }) => (
    <li className="leading-relaxed mb-1" {...props}>
      {children}
    </li>
  );

  const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    ...props
  }) => <h1 {...props}>{children}</h1>;

  const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    ...props
  }) => <h2 {...props}>{children}</h2>;

  const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    ...props
  }) => <h3 {...props}>{children}</h3>;

  const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    ...props
  }) => (
    <h4 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...props}>
      {children}
    </h4>
  );

  const Hr: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => (
    <hr className="border-t border-gray-300 my-8" {...props} />
  );

  const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
    children,
    ...props
  }) => (
    <a
      className="text-blue-600 hover:underline font-medium"
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

  const Blockquote: React.FC<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>
  > = ({ children, ...props }) => (
    <blockquote {...props}>{children}</blockquote>
  );

  const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
    children,
    ...props
  }) => (
    <div className="overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  );

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: P,
          ul: Ul,
          ol: Ol,
          li: Li,
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          hr: Hr,
          a: A,
          blockquote: Blockquote,
          table: Table,
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return <CodeBlock language={match[1]} value={codeString} />;
            }

            return (
              <code
                className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
