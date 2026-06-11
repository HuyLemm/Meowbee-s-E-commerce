export const BeeLogo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f5a623] to-[#f7c948]">
      🐝
    </div>

    <span className={`text-xl font-extrabold ${dark ? "text-[#1a1a1a]" : "text-black"}`}>
      Meow<span className="text-[#f5a623]">Bee</span>
    </span>
  </div>
);

export const Avatar = ({ name }: { name: string }) => (
  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#f5a623] to-[#f7c948]">
    <span className="text-xs font-bold text-[#1a1a1a]">
      {name[0].toUpperCase()}
    </span>
  </div>
);

export const MemberBadge = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff8e6] border border-yellow-200">
    <Avatar name={name} />
    <span className="text-sm font-medium text-yellow-800">{name}</span>
  </div>
);

export const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
);

export const CheckIcon = () => (
  <span className="text-[#1a1a1a] text-xs font-bold">✓</span>
);