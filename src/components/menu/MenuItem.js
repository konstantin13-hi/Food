
export default function MenuItem() {
return (
    <div className={"bg-gray-300 px-4 rounded-lg text-center hover:bg-amber-50 hover:shadow-2xl hover:shadow-black/50"}>
        <img src={""} alt={"pizza-logo"}/>
        <h4>Peperoni Pizza</h4>
        <p className={"text-gray-500 text-sm"}>lorem ipsum </p>
        <button className={"mt-4 bg-primary text-white rounded-full px-6 py-2"}>add to cart</button>


    </div>
)

}
