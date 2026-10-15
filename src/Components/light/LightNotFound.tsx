import { ButtonLink, Container, Eyebrow } from './ui';

export default function LightNotFound() {
  return (
    <Container className="flex min-h-[80vh] items-center justify-center pt-24">
      <div className="w-full max-w-xl rounded-3xl border border-(--lt-border) bg-(--lt-surface) p-8 text-center sm:p-12">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-(--lt-text) sm:text-5xl">Page not found</h1>
        <p className="mt-3 text-(--lt-muted)">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/blogs" variant="secondary">
            Read the blog
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
