export const BeeLogo = () => (
  <div className="flex items-center gap-3">
    <div
      className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
      style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {/* body */}
        <ellipse cx="14" cy="16" rx="7" ry="9" fill="#1a1a1a" />

        {/* stripes */}
        <ellipse cx="14" cy="14" rx="7" ry="2.5" fill="#f5a623" />
        <ellipse cx="14" cy="19" rx="7" ry="2.5" fill="#f5a623" />

        {/* head */}
        <circle cx="14" cy="7" r="4" fill="#1a1a1a" />

        {/* antennae */}
        <line
          x1="11"
          y1="4"
          x2="7"
          y2="1"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="7" cy="1" r="1" fill="#1a1a1a" />

        <line
          x1="17"
          y1="4"
          x2="21"
          y2="1"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="21" cy="1" r="1" fill="#1a1a1a" />

        {/* wings */}
        <ellipse
          cx="7"
          cy="12"
          rx="4.5"
          ry="2.5"
          fill="white"
          fillOpacity="0.85"
          transform="rotate(-20 7 12)"
        />
        <ellipse
          cx="21"
          cy="12"
          rx="4.5"
          ry="2.5"
          fill="white"
          fillOpacity="0.85"
          transform="rotate(20 21 12)"
        />
      </svg>
    </div>

    <div>
      <span
        className="text-2xl tracking-tight"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          color: "#1a1a1a",
        }}
      >
        Meow<span style={{ color: "#f5a623" }}>Bee</span>
      </span>
    </div>
  </div>
);

export const BackgroundDecor = () => (
  <>
    <div
      className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
      style={{
        background: "radial-gradient(circle, #f5a623 0%, transparent 70%)",
        top: "-100px",
        right: "-60px",
      }}
    />

    <div
      className="absolute w-72 h-72 rounded-full blur-3xl opacity-15"
      style={{
        background: "radial-gradient(circle, #fb923c 0%, transparent 70%)",
        bottom: "-60px",
        left: "-40px",
      }}
    />
  </>
);

export const LoadingSpinner = () => (
  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />

    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
    <path
      d="M1 4.5L4 7.5L10 1.5"
      stroke="#1a1a1a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);