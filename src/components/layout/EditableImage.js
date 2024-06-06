import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({link, setLink}) {


    async function handleFileChange(ev) {
        const file = ev.target.files[0];
        if (file.size > 0) {


            const data = new FormData();
            data.set('file', file);

            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                })
                if (response.ok) {
                    const result = await response.json();
                    const link = result.link;
                    setLink(link);
                    resolve();
                } else {
                    reject();
                }

            });
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload successful!',
                error: 'Upload failed...',
            });

        }

    }

    return (
        <>

            {link && (
                <Image className={"rounded-lg mb-1"} src={link} width={250} height={64}
                       alt={'avatar'}></Image>
            )}
            {!link && (
                <div className={"bg-gray-200 p-4 text-gray-500 rounded-lg mb-1"}>
                    No image available.

                </div>
            )}

            <label>
                <input type={"file"} className={"hidden"} onChange={handleFileChange}/>
                <span className={"block border rounded-lg text-center cursor-pointer"}>Edit</span>
            </label>

        </>
    )

}
