// app/[...mdxPath]/generate-metadata.ts
import type { Metadata } from "next";
import { importPage } from "nextra/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mdxPath: string[]; lang: string }>;
}): Promise<Metadata> {
  const { mdxPath, lang } = await params;

  const { metadata } = await importPage(mdxPath, lang);

  return (
    metadata ?? {
      title: "Default Title",
      description: "Default description",
    }
  );
}
