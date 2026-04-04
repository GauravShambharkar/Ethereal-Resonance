
import { useKeySound } from "../hooks/keySound.hook";

export const PianoKeys = ({
    note,
    blackKeyNote,
    isActive = false,
}: {
    note: string;
    blackKeyNote?: string;
    isActive?: boolean;
}) => {
    const { playNote } = useKeySound();

    return (
        <div className="relative group">
            <div
                onClick={() => playNote(note)}
                className={`piano-key-white w-16 h-80 rounded-b-lg cursor-pointer transition-all ease-in-out duration-500 hover:brightness-110 active:brightness-90 active:scale-[0.98] relative flex flex-col justify-end items-center pb-6 border-t border-white/10 ${isActive ? "shadow-[0_0_40px_rgba(170,202,234,0.15)]" : ""
                    }`}
            >
                <div
                    className={`font-label text-[11px] tracking-widest uppercase font-bold z-10 flex items-baseline gap-0.5 pointer-events-none select-none ${isActive ? "text-on-secondary" : "text-on-secondary/50"
                        }`}
                >
                    <span>{note.replace(/[0-9]/g, "")}</span>
                    <span className="text-[8px] opacity-70 font-medium">{note.replace(/[^0-9]/g, "")}</span>
                </div>
            </div>
            {blackKeyNote && (
                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        playNote(blackKeyNote);
                    }}
                    className={`absolute top-0 right-0 translate-x-1/2  transition-all ease-in-out duration-300 active:scale-[0.98] piano-key-black w-8 h-48 rounded-b-lg z-10 cursor-pointer border-t border-white/5 active:brightness-125 flex flex-col justify-end items-center pb-4 ${isActive ? "" : "" /* In a real app we'd have a separate black key active state */}`}>
                    <div className="font-label text-[8px] tracking-tighter uppercase font-bold text-white/40 flex items-baseline gap-px scale-75 pointer-events-none select-none">
                        <span>{blackKeyNote.replace(/[0-9]/g, "")}</span>
                        <span className="text-[6px] opacity-60">{blackKeyNote.replace(/[^0-9]/g, "")}</span>
                    </div>
                </div>
            )}
        </div>
    );
};