import { useQueryStates, parseAsString } from "nuqs"

export const usePianoKeys = () => {
    const [keyCount, setKeyCount] = useQueryStates(
        {
            totalKeys: parseAsString.withDefault("12")
        },
        {
            history: "push",
        });

    return { keyCount, setKeyCount };
}