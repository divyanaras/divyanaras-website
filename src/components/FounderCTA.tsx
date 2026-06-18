interface FounderCTAProps {
  onClick: () => void;
}

export function FounderCTA({ onClick }: FounderCTAProps) {
  return (
    <div className="my-6">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary hover:bg-primary/5 hover:border-primary/70 transition-colors duration-200"
      >
        Are you a founder in SF? &rarr;
      </button>
    </div>
  );
}
