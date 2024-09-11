import Button from "./Button";

interface DescriptionProps {
    setDiscription: (description: string) => void;
}
export function Description({ setDiscription }: DescriptionProps) {
    return (
        <div className="flex flex-col">
            <div className="my-10 mx-auto sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 ">
                <textarea
                    id="message"
                    rows={4}
                    onChange={(e) => setDiscription(e.target.value)}
                    className="block p-5 h-[240px] w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none"
                    placeholder="Add the text which you want to ask a question about here..."
                    defaultValue={""}
                />
            </div>
            <div className="w-52 mx-auto mt-4">
                <Button handleChange={(e: any) => setDiscription}>
                    Ask Question
                </Button>
            </div>
        </div>

    );
}