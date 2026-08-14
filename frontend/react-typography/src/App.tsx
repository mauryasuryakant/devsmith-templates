import React, { useState } from "react";
import {
  Type,
  Copy,
  Check,
  Code2,
  BookOpen,
  Layers,
  ArrowUpRight,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TypographySpec {
  name: string;
  tag: string;
  classes: string;
  fontSize: string;
  lineHeight: string;
  weight: string;
  preview: React.ReactNode;
  codeSnippet: string;
}

export default function App() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const typographyScale: TypographySpec[] = [
    {
      name: "Display / Hero",
      tag: "<h1>",
      classes: "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
      fontSize: "4.5rem (72px)",
      lineHeight: "1",
      weight: "800 (Extrabold)",
      preview: (
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Build modern interfaces.
        </h1>
      ),
      codeSnippet: `<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">\n  Build modern interfaces.\n</h1>`,
    },
    {
      name: "Heading 1",
      tag: "<h1>",
      classes: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      fontSize: "3rem (48px)",
      lineHeight: "1",
      weight: "800 (Extrabold)",
      preview: (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Taxing Dilemma of Modern Architecture
        </h1>
      ),
      codeSnippet: `<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">\n  The Taxing Dilemma of Modern Architecture\n</h1>`,
    },
    {
      name: "Heading 2",
      tag: "<h2>",
      classes: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      fontSize: "1.875rem (30px)",
      lineHeight: "2.25rem (36px)",
      weight: "600 (Semibold)",
      preview: (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          The People of the Kingdom
        </h2>
      ),
      codeSnippet: `<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">\n  The People of the Kingdom\n</h2>`,
    },
    {
      name: "Heading 3",
      tag: "<h3>",
      classes: "scroll-m-20 text-2xl font-semibold tracking-tight",
      fontSize: "1.5rem (24px)",
      lineHeight: "2rem (32px)",
      weight: "600 (Semibold)",
      preview: (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The Joke Tax Chronicles
        </h3>
      ),
      codeSnippet: `<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">\n  The Joke Tax Chronicles\n</h3>`,
    },
    {
      name: "Heading 4",
      tag: "<h4>",
      classes: "scroll-m-20 text-xl font-semibold tracking-tight",
      fontSize: "1.25rem (20px)",
      lineHeight: "1.75rem (28px)",
      weight: "600 (Semibold)",
      preview: (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          People stopped laughing
        </h4>
      ),
      codeSnippet: `<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">\n  People stopped laughing\n</h4>`,
    },
    {
      name: "Lead Paragraph",
      tag: "<p>",
      classes: "text-xl text-muted-foreground leading-relaxed",
      fontSize: "1.25rem (20px)",
      lineHeight: "1.625",
      weight: "400 (Regular)",
      preview: (
        <p className="text-xl text-muted-foreground leading-relaxed">
          A modal dialog that interrupts the user with important content and expects an immediate response.
        </p>
      ),
      codeSnippet: `<p className="text-xl text-muted-foreground leading-relaxed">\n  A modal dialog that interrupts the user with important content and expects an immediate response.\n</p>`,
    },
    {
      name: "Paragraph / Body",
      tag: "<p>",
      classes: "leading-7 [&:not(:first-child)]:mt-6",
      fontSize: "1rem (16px)",
      lineHeight: "1.75rem (28px)",
      weight: "400 (Regular)",
      preview: (
        <p className="leading-7">
          The King, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Laughter resonated across the stone ramparts once more.
        </p>
      ),
      codeSnippet: `<p className="leading-7 [&:not(:first-child)]:mt-6">\n  The King, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.\n</p>`,
    },
    {
      name: "Blockquote",
      tag: "<blockquote>",
      classes: "mt-6 border-l-2 border-primary/40 pl-6 italic text-muted-foreground",
      fontSize: "1rem (16px)",
      lineHeight: "1.75rem (28px)",
      weight: "400 (Italic)",
      preview: (
        <blockquote className="border-l-2 border-primary/40 pl-6 italic text-muted-foreground">
          "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege of laughing."
        </blockquote>
      ),
      codeSnippet: `<blockquote className="mt-6 border-l-2 pl-6 italic">\n  "After all," he said, "everyone enjoys a good joke..."\n</blockquote>`,
    },
    {
      name: "Inline Code",
      tag: "<code>",
      classes: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      fontSize: "0.875rem (14px)",
      lineHeight: "1.25rem (20px)",
      weight: "600 (Semibold)",
      preview: (
        <p className="leading-7">
          Install the package via{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            @radix-ui/react-typography
          </code>{" "}
          into your workspace.
        </p>
      ),
      codeSnippet: `<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">\n  @radix-ui/react-typography\n</code>`,
    },
    {
      name: "Small Text",
      tag: "<small>",
      classes: "text-sm font-medium leading-none",
      fontSize: "0.875rem (14px)",
      lineHeight: "1",
      weight: "500 (Medium)",
      preview: <small className="text-sm font-medium leading-none">Email address is required for validation.</small>,
      codeSnippet: `<small className="text-sm font-medium leading-none">\n  Email address is required for validation.\n</small>`,
    },
    {
      name: "Muted Text",
      tag: "<span> / <p>",
      classes: "text-sm text-muted-foreground",
      fontSize: "0.875rem (14px)",
      lineHeight: "1.25rem (20px)",
      weight: "400 (Regular)",
      preview: <span className="text-sm text-muted-foreground">Enter your email address to receive product notifications.</span>,
      codeSnippet: `<p className="text-sm text-muted-foreground">\n  Enter your email address to receive product notifications.\n</p>`,
    },
    {
      name: "Label / Caption",
      tag: "<label>",
      classes: "text-xs font-semibold tracking-wider uppercase text-muted-foreground",
      fontSize: "0.75rem (12px)",
      lineHeight: "1rem (16px)",
      weight: "600 (Semibold)",
      preview: <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">System Metadata Metric</label>,
      codeSnippet: `<label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">\n  System Metadata Metric\n</label>`,
    },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground antialiased">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Type className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-sm tracking-tight">Design System</span>
                <span className="text-muted-foreground text-xs ml-2 font-mono">/ typography</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs font-normal">
                v2.1.0
              </Badge>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://ui.shadcn.com/docs/components/typography"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs"
                >
                  shadcn Docs
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1 px-2.5 py-0.5 text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                Foundations
              </Badge>
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                Tailwind CSS v3.4+
              </Badge>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Typography
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
              A comprehensive typographic hierarchy modeled on shadcn/ui design standards. Engineered for maximum legibility, balanced editorial contrast, and clean code predictability.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Quick Token Reference Table */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Type Scale Matrix</h2>
                <p className="text-sm text-muted-foreground">
                  Overview of core semantic tokens, computed values, and CSS classes.
                </p>
              </div>
              <Badge variant="outline" className="hidden sm:flex items-center gap-1 font-mono text-xs">
                <Layers className="h-3 w-3" /> 12 Tokens
              </Badge>
            </div>

            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[180px]">Role / Token</TableHead>
                    <TableHead className="w-[100px]">HTML Tag</TableHead>
                    <TableHead>Tailwind Classes</TableHead>
                    <TableHead className="w-[120px]">Computed Size</TableHead>
                    <TableHead className="w-[140px]">Font Weight</TableHead>
                    <TableHead className="text-right w-[80px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typographyScale.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-sm">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {item.tag}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground truncate max-w-xs">
                        {item.classes}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{item.fontSize}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.weight}</TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(item.classes, `table-${idx}`)}
                            >
                              {copiedKey === `table-${idx}` ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Copy classes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <Separator className="my-12" />

          {/* Interactive Component Demos */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Interactive Style Inspector</h2>
              <p className="text-sm text-muted-foreground">
                Inspect preview renderings and grab production-ready JSX code snippets.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-1">
              {typographyScale.map((item, idx) => (
                <Card key={idx} className="overflow-hidden border shadow-sm">
                  <CardHeader className="bg-muted/30 border-b py-3 px-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs font-semibold">
                          {item.tag}
                        </Badge>
                        <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block font-mono text-xs text-muted-foreground">
                          {item.fontSize} &middot; {item.weight}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1 text-xs"
                          onClick={() => copyToClipboard(item.classes, `card-cls-${idx}`)}
                        >
                          {copiedKey === `card-cls-${idx}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy Classes
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="preview" className="w-full">
                      <div className="flex items-center justify-between border-b px-6 py-2 bg-background">
                        <TabsList className="h-8">
                          <TabsTrigger value="preview" className="text-xs">
                            Visual Preview
                          </TabsTrigger>
                          <TabsTrigger value="code" className="text-xs">
                            JSX Code
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="preview" className="m-0 p-6 sm:p-8 bg-card">
                        <div className="min-h-[60px] flex items-center">{item.preview}</div>
                      </TabsContent>
                      <TabsContent value="code" className="m-0 p-0 bg-muted/40">
                        <div className="relative">
                          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                            <code>{item.codeSnippet}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-3 top-3 h-7 w-7 bg-background/60 backdrop-blur-sm"
                            onClick={() => copyToClipboard(item.codeSnippet, `card-snip-${idx}`)}
                          >
                            {copiedKey === `card-snip-${idx}` ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* Special Elements Showcase: Lists, Code Blocks, Links */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Structured Content Elements</h2>
              <p className="text-sm text-muted-foreground">
                Lists, code syntax containers, hyperlinks, and assistive typography.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Unordered & Ordered Lists */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Lists (Ordered & Unordered)</CardTitle>
                  <CardDescription className="text-xs">
                    Structured itemization with standardized spacing and bullet markers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Unordered (Bulleted)
                    </span>
                    <ul className="my-3 ml-6 list-disc [&>li]:mt-1.5 text-sm leading-relaxed">
                      <li>1st level of technical requirement prioritization</li>
                      <li>
                        Nested items support clear visual hierarchy:
                        <ul className="ml-6 list-circle mt-1.5 space-y-1">
                          <li>Sub-point with customized nested markers</li>
                          <li>Automatic margin inheritance</li>
                        </ul>
                      </li>
                      <li>Consistent typographic tracking across list items</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ordered (Numbered)
                    </span>
                    <ol className="my-3 ml-6 list-decimal [&>li]:mt-1.5 text-sm leading-relaxed">
                      <li>Initialize the repository with strict TypeScript configuration</li>
                      <li>Install Tailwind CSS and shadcn/ui components</li>
                      <li>Verify accessibility landmarks and keyboard navigation</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Code Block & Technical Notation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Code Blocks & Command Syntax</CardTitle>
                  <CardDescription className="text-xs">
                    Preformatted monospace containers for terminal commands and code blocks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative rounded-lg border bg-zinc-950 p-4 text-zinc-50 dark:bg-zinc-900">
                    <div className="flex items-center justify-between pb-3 text-xs text-zinc-400 border-b border-zinc-800">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Terminal className="h-3.5 w-3.5" />
                        <span>bash</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                        onClick={() =>
                          copyToClipboard(
                            "npx shadcn@latest add card badge separator tabs button table tooltip",
                            "term-copy"
                          )
                        }
                      >
                        {copiedKey === "term-copy" ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="pt-3 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-200">
                      <code>npx shadcn@latest add card badge separator tabs button table tooltip</code>
                    </pre>
                  </div>

                  <div className="rounded-md border p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Use{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground">
                        font-mono
                      </code>{" "}
                      paired with{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground">
                        text-sm
                      </code>{" "}
                      for inline tokens and parameter values.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Links & Interactive Text States */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Links & Interactive States</CardTitle>
                  <CardDescription className="text-xs">
                    Accessible, high-contrast anchor treatments with hover and focus rings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    Default inline hyperlink style:{" "}
                    <a
                      href="#links"
                      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      Read our design specification guidelines
                    </a>
                    .
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Muted contextual link:{" "}
                    <a
                      href="#docs"
                      className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                      View changelog documentation
                    </a>
                    .
                  </p>
                  <p className="text-sm leading-relaxed">
                    External link with indicator:{" "}
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4"
                    >
                      Tailwind CSS Reference
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* Font Weights & Letter Spacing Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Weight & Tracking Spectrum</CardTitle>
                  <CardDescription className="text-xs">
                    Visual comparison across standard font weights and letter spacings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b pb-2 text-xs">
                    <span className="text-muted-foreground font-mono">font-light (300)</span>
                    <span className="font-light text-sm">Lightweight editorial voice</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 text-xs">
                    <span className="text-muted-foreground font-mono">font-normal (400)</span>
                    <span className="font-normal text-sm">Default body paragraph tone</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 text-xs">
                    <span className="text-muted-foreground font-mono">font-medium (500)</span>
                    <span className="font-medium text-sm">Interactive buttons & tabs</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 text-xs">
                    <span className="text-muted-foreground font-mono">font-semibold (600)</span>
                    <span className="font-semibold text-sm">Section titles & subheadings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-mono">font-bold (700)</span>
                    <span className="font-bold text-sm">Prominent hero declarations</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-12" />

          {/* Real-World Editorial Article Composition */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Editorial Composition Showcase</h2>
                <p className="text-sm text-muted-foreground">
                  A realistic article layout demonstrating how all typographic tokens interact organically.
                </p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">
                <BookOpen className="mr-1 h-3 w-3" /> Live Prose Preview
              </Badge>
            </div>

            <Card className="p-6 sm:p-10 shadow-sm border bg-card">
              <article className="mx-auto max-w-3xl space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Case Study &middot; User Experience
                  </label>
                  <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    The Taxonomy of Modern User Interfaces
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
                    How intentional typographic hierarchy reduces cognitive overhead and guides user focus in data-intensive web applications.
                  </p>
                </div>

                <div className="flex items-center gap-3 border-y py-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Sophia Vance</span>
                  <span>&bull;</span>
                  <span>Published on August 14, 2026</span>
                  <span>&bull;</span>
                  <span>5 min read</span>
                </div>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Great typography is invisible. When text hierarchy is configured properly, readers digest complex technical data effortlessly. In modern applications, typography is not merely styling; it serves as the foundational skeleton of your design language.
                </p>

                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                  1. Establishing the Base Frequency
                </h2>

                <p className="leading-7">
                  Every solid design starts with an unambiguous base size. In Tailwind CSS, the baseline default is{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    1rem (16px)
                  </code>{" "}
                  paired with a generous line height like{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    leading-7 (1.75rem)
                  </code>
                  . This proportions adequate breathing room between body sentences.
                </p>

                <blockquote className="border-l-2 border-primary/60 pl-6 italic text-muted-foreground">
                  "Typography is the craft of endowing human language with a durable visual form, and in turn, with an independent philosophical existence."
                </blockquote>

                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Key Principles of Typographic Balance
                </h3>

                <ul className="my-4 ml-6 list-disc [&>li]:mt-2 text-sm sm:text-base leading-relaxed">
                  <li>
                    <strong className="font-semibold text-foreground">Strict Scaling:</strong> Constrain font size choices to a deliberate harmonic scale rather than arbitrary values.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Intentional Weight Distribution:</strong> Pair heavy headings (Extrabold/Semibold) with regular body text for immediate contrast.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Subtle Muting:</strong> Utilize semantic secondary tokens such as{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
                      text-muted-foreground
                    </code>{" "}
                    to distinguish metadata and timestamps from core text.
                  </li>
                </ul>

                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span>Implementation Note</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Always apply the <code className="font-mono font-semibold">scroll-m-20</code> utility class to all headings (H1–H4) to preserve sticky header clearance when deep-linking anchor fragments.
                  </p>
                </div>
              </article>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t bg-muted/20 py-8">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
            <p>Designed and built following the official shadcn/ui typography specification.</p>
            <p className="font-mono">React 18 &middot; Tailwind CSS &middot; Radix UI</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}