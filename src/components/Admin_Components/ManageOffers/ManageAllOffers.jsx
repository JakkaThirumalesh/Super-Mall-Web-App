import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../config/firebase"
import { useEffect, useState } from "react"
import leftArrow from "../../../assets/icons/left_arrow.svg"
import { useNavigate } from "react-router-dom"

export const ManageAllOffers = () => {
    const [allOffers, setAllOffers] = useState([])
    const navigate = useNavigate()
    const getOffersData = async () => {
        const colRef = collection(db, 'offers')
        const snapShots = await getDocs(colRef)
        const docs = snapShots.docs.map((doc) => doc.data())
        setAllOffers(docs)
    }
    useEffect(() => {
        getOffersData()
    }, [])

    return (
        <>
            <div className="container mx-auto px-4 py-4">
                <div className="buttons flex items-center justify-between z-20 sticky top-5 mb-3">
                    <button
                        className="flex items-center gap-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
                        onClick={() => navigate(-1)}
                    >
                        <img className="-ml-2 w-5" src={leftArrow} alt="left-arrow" />
                        View Shops
                    </button>
                    <button
                        className="bg-green-500 text-white text-sm font-medium px-3 py-2 rounded hover:bg-green-600"
                    >
                        Add Product
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-6">Manage Offers</h1>
                {allOffers.length === 0 ? (
                    <p>No offers available for this shop.</p>
                ) : (
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
                        {allOffers.map((offer, index) => (
                            <div
                                key={index + 1}
                                className="bg-zinc-800 border-1 capitalize border-zinc-600 shadow-md rounded px-4 pt-6 pb-8 mb-4"
                            >
                                <h2 className="text-2xl text-blue-200 font-bold mb-2">{offer.title}</h2>
                                <p className="capitalize">
                                    <strong>Discount:</strong> {offer.discount}%
                                </p>
                                <p className="capitalize">
                                    <strong>Valid from:</strong> {offer.start_date} to{" "}
                                    {offer.end_date}
                                </p>
                                <div className="mt-4 flex justify-center sm:justify-normal flex-wrap gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded">
                                        View
                                    </button>
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded">
                                        Update
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}