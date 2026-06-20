interface FounderCTAProps {
  onClick: () => void;
}

export function FounderCTA({ onClick }: FounderCTAProps) {
  return (
    <div className="my-6">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/70 bg-primary/8 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/15 hover:border-primary transition-colors duration-200"
      >
        Are you a founder in SF? &rarr;
      </button>
    </div>
  );
}
