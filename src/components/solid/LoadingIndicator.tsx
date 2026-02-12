export function LoadingIndicator() {
  return (
    <figure>
      <div class="w-12 h-12 rounded-full bg-primary animate-ping"></div>
      <figcaption class="sr-only">Loading...</figcaption>
    </figure>
  );
}
