import EditableImage from "../layout/EditableImage";
import {useProfile} from "../UserProfile";
import {useState} from "react";
import AddressInputs from "../layout/AddressInputs";

export default function UserForm({user,onSave}){
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();
    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }


    return (
        <div className={"flex gap-10"}>
            <div className="flex justify-center">
                <div className={"bg-gray-300 p-4 rounded-lg w-50 "}>
                    <EditableImage link={image} setLink={setImage}/>

                </div>
            </div>
            <form className={"grow"} onSubmit={(ev)=>onSave(ev,{userName,phone,streetAddress,postalCode,city,country})}>

                <input type={"text"} placeholder={"First Name"} value={userName}
                       onChange={ev => setUserName(ev.target.value)}/>
                <input type={"email"} disabled={true} placeholder={user?.email}/>
               <AddressInputs addressProps={{phone, streetAddress, postalCode, city, country}} setAddressProp={handleAddressChange} />
                      {loggedInUserData.admin  && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 " htmlFor={"adminCb"}>
                            Admin
                            <input id="adminCb" type="checkbox" value={"1"} checked={admin}
                                   onClick={ev => setAdmin(ev.target.checked)}/>

                        </label>
                    </div>
                )}

                <button type={"submit"}>Save</button>
            </form>
        </div>
    )
}
