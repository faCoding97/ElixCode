import Head from "next/head";

export default function JsonLd({ data }: { data: any }) {
  return (
    <Head>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}
