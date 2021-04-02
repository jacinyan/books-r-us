import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import {
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
} from '../redux/constants/itemConstants'

const ItemPage = ({ match }) => {
    const dispatch = useDispatch()
    const listItemDetails = useSelector(state => state.listItemDetails)
    const { loading, item } = listItemDetails

    useEffect(() => {
        dispatch({
            type: ITEM_DETAILS_REQUEST
        })

        dispatch({
            type: ITEM_DETAILS_SUCCESS
        })

    }, [dispatch])
    
    return (
        <section className="py-6">
            <div className="container">
                <Link className="button is-light my-3 " to="/">Go Back</Link>

                {loading ? <Loader />
                    :
                    <div className="columns is-multiline">
                        <div className="column has-text-centered is-6-tablet is-5-desktop ">
                            <img src={item.image} alt={item.name} style={{ maxHeight: "75vh" }} />
                        </div>
                        <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-4-desktop">
                            <ul className="content">
                                <li>
                                    <h3>{item.name}</h3>
                                </li>
                                <li>
                                    <Rating value={item.rating} text={`${item.numReviews} reviews`} color='#f8d125' />
                                </li>
                                <li>
                                    Price: ${item.price}
                                </li>
                                <li>
                                    Description: {item.description}
                                </li>
                            </ul>
                        </div>
                        <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-3-desktop">
                            <div className="card">
                                <div className="card-content">
                                    <p className="title is-6">
                                        Status
                                    </p>
                                    <p className="subtitle is-6">
                                        {item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                                <footer className="card-footer pb-0 ">
                                    <button
                                        className="card-footer-item button py-3 has-background-primary has-text-white"
                                        disabled={item.countInStock === 0}
                                    >
                                        <strong>Add to Cart</strong>
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default ItemPage
