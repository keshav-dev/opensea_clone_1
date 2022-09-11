import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import {IoMdSnow} from 'react-icons/io'

const style = {
    topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
    topBarContent: `flex items-center`,
    likesCounter: `flex-1 flex items-center justify-end`
}

const NFTImage = ({selectedNft}) => {
  return (
    <div>
        <div className={style.topBar}>
            <div className={style.topBarContent}>
                <IoMdSnow />
                <div className={style.likesCounter}>
                    <AiOutlineHeart />2.3K
                </div>
            </div>
        </div>
        <div>
            <img src={selectedNft?.metadata.image} alt="" />
        </div>
    </div>
  )
}

export default NFTImage