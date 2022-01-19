import React from 'react'
import {Link} from 'react-router-dom'
import images from '../assets/images'

const Landing=()=> {
    return (
        <div>
            <Link to='/home'>
                <img src={images.img1} />
            </Link>
        </div>
    )
}
export default Landing;