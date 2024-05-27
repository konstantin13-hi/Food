

export default function SectionHeaders({subHeader,mainHeader}) {
    return (
        <>
            <h3 className={"uppercase font-semibold text-gray-500"}>
                {subHeader}
            </h3>
            <h2 className={"text-primary font-bold text-4xl"}>
                {mainHeader}
            </h2>


        </>
    )
}
