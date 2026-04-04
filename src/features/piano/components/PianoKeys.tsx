

export const PianoKeys = ({
    note,
    hasBlackKey = false,
    isActive = false,
}: {
    note: string;
    hasBlackKey?: boolean;
    isActive?: boolean;
}) => {
    return (
        <div className="relative group">
            <div
                className={`piano-key-white w-16 h-80 rounded-b-lg cursor-pointer transition-all ease-in-out duration-500 hover:brightness-110 active:brightness-90 active:scale-[0.98] relative flex flex-col justify-end items-center pb-6 border-t border-white/10 ${isActive ? "shadow-[0_0_40px_rgba(170,202,234,0.15)]" : ""
                    }`}
            >
                <span
                    className={`font-label text-[10px] tracking-widest uppercase font-bold z-10 ${isActive ? "text-on-secondary" : "text-on-secondary/50"
                        }`}
                >
                    {note}
                </span>
            </div>
            {hasBlackKey && (
                <div className="absolute top-0 right-0 translate-x-1/2  transition-all ease-in-out duration-300 active:scale-[0.98] piano-key-black w-8 h-48 rounded-b-lg z-10 cursor-pointer border-t border-white/5 active:brightness-125"></div>
            )}
        </div>
    );
};