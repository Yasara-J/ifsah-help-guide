/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents isn't react hooks */

import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[];
    lang: string;
  }>;
}>;

export const metadata: Metadata = {};

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath, params.lang);

  return metadata ?? {};
}

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath, params.lang);
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
