
export default function InfoBox({children}){
    return (
        <div className={"text-center bg-blue-100 p-4 rounded-lg border-4 text-4xl" +
            "border-blue-300"}>
            {children}
        </div>
    )
}
