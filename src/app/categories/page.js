"use client"
import {useEffect, useState} from "react";
import UserTabs from "../../components/layout/UserTabs";
import toast from "react-hot-toast";
import {useProfile} from "../../components/UserProfile";

export default function CategoriesPage() {
    const {loading: profileLoading, data: profileData} = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);


    useEffect(() => {
        fetchCategories()

    }, []);

    function fetchCategories() {
        fetch('/api/categories').then((response) => {
            response.json().then(data => {
                setCategories(data)
            })
        })
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name: categoryName};
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data),
            });
            console.log(data);


            setCategoryName(null);
            if (response.ok) {
                resolve()
                fetchCategories()

            } else {
                reject();
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Update category ' : 'Uploading...',
            success: editedCategory ? "Category updated" : 'Upload successful!',
            error: 'Upload failed...',
        })


    }

   async function handleDeleteCategory(_id) {
        const promise = new Promise(async (resolve, reject) => {
         const response = await fetch('/api/categories?_id=' + _id,{
                method: 'DELETE',

            })
            if(response.ok){
                resolve();
                fetchCategories();
            }
            else {
                reject();
            }

        });


        await toast.promise(promise,{
            loading:'Delete category...',
            success:'Delete successful!',
            error:'Delete failed...',
        })



    }

    if (profileLoading) {
        return 'Loading ...';
    }
    if (!profileData) {
        return 'Not a admin';
    }


    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={profileData.admin}/>
            <form className={"mt-8"} onSubmit={handleCategorySubmit}>
                <div className={"flex gap-2 items-end"}>
                    <div className={"grow"}>
                        <label>{editedCategory ? "Update category" : "New category"}
                            {editedCategory && (
                                <>:<b>{editedCategory.name}</b></>
                            )}</label>
                        <input type={'text'} value={categoryName}
                               onChange={ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className={"pb-2"}>
                        <button type={"submit"}>{editedCategory ? "Update" : "Create"}</button>
                    </div>
                </div>


            </form>
            <div>
                <h2 className={"mt-8 text-sm text-gray-500 "}>Edit categories</h2>
                {categories.length > 0 && (
                    categories.map((category, index) => (
                        <div  className={"bg-gray-200 rounded-lg p-2 px-4 flex gap-1 mb-2"}
                              key={category._id}
                        >
                        <div
                            className={"grow"}

                        >
                       {category.name}
                        </div>
                            <div className={"flex gap-1"}>
                                <button type={"button"}
                                     onClick={()=>{
                                         setEditedCategory(category);
                                         setCategoryName(category.name);
                                     }}

                                >Edit</button>
                                <button type={"button"}
                                        onClick={()=>handleDeleteCategory(category._id)}
                                >Delete</button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
