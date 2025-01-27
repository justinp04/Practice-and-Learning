import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export const people = [
    {key:"Ashley", label:"Ashley"},
    {key:"Dave", label:"Dave"},
    {key:"Justin", label:"Justin"}
];

export default function DocsPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>About</h1>
                    <Select className="max-w-xs" label="Test select">
                        {people.map((person) => (
                            <SelectItem key={person.key}>{person.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </section>
        </DefaultLayout>
    );
}
