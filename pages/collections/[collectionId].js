import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import { client } from "../../lib/sanityClient";
import NFTCard from "../../components/NFTCard";
import Header from "../../components/Header";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineDown, AiOutlineInstagram, AiOutlineTwitter, AiOutlineUp } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { useNFTs,useNFTCollection,useActiveListings,useMarketplace,useMintNFT, useAddress,useContract } from '@thirdweb-dev/react'
import { FiFilter } from "react-icons/fi";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  midRowFilter: `w-full flex justify-around text-white items-center`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  dividerVer: `border-b-2 border-black`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
  titleFilter: `bg-[#262b2f] px-6 py-3 flex items-center justify-between space-x-4 rounded-xl`,
  titleLeft: `flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-1`,
  titleRight: `text-xl hover:text-2xl`,
  filters: `bg-[#262b2f] px-6 py-2 hover:bg-white hover:text-[#262b2f]`,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  form:`w-[50%] flex flex-col items-center justify-center bg-[#8a939b] py-2 px-4 rounded-lg`,
  input: `bg-[#262b2f] text-white px-4 py-2 w-[100%]`,
  textarea: `bg-[#262b2f] text-white px-4 py-2 w-[100%]`,
  file:`text-white px-6 py-2 flex justify-center`,
  buttonContainer:`flex text-white px-4 py-2 w-[100%] items-center justify-around`,
};

const Collection = () => {
  const [toggle,setToggle] = useState(false);
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const nftCollection = useNFTCollection(collectionId);
  const { data: nfts, isLoading:nftsLoading } = useNFTs(nftCollection);
  const marketplace = useMarketplace("0xC8D6CFb44C6DB81cc4dcd558F8c08297E7717466");
  const { data: listings, isLoading:listingLoading, error } = useActiveListings(marketplace, { start: 0, count: 100 });
  const [mintToggle,setMintToggle] = useState(false);
  const [nftName,setNftName] = useState('');
  const [description,setDescription] = useState('');
  const [file,setFile] = useState('');
  const address = useAddress();
  const {contract:nftContract} = useContract(collectionId)

  const {
    mutate: mintNft,
    isLoading:mintingLoad,
    error:errorMinting,
  } = useMintNFT(nftContract);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}"] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl":bannerImage.asset->url,
      volumeTraded, createdBy, contractAddress,
      "creator":createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;
    const collectionData = await sanityClient.fetch(query);
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  const mintNewNft = () => {
    if(!address){
      console.log("not connect");
      return;
    }
    console.log(nftName, description);
    mintNft({name:nftName, to:address})
    if(errorMinting){
      console.log(errorMinting);
    }
  }

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{" "}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRowFilter}>
          <div>
            <div className={style.titleFilter} onClick={() => setToggle(!toggle)}>
              <div className={style.titleLeft}>
                <span className={style.titleIcon}>
                  <FiFilter />
                </span>
                Filter
              </div>
              <div className={style.titleRight}>
                {toggle ? <AiOutlineUp /> : <AiOutlineDown />}
              </div>
            </div>
            {toggle && <div>
              <div className={style.dividerVer} />
              <div className={style.filters} >Mine</div>
              <div className={style.dividerVer} />
              <div className={style.filters} >All</div>
            </div>}
          </div>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts?.length ? nfts.length : 0}</div>
              <div className={style.statName}>items</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ""}
              </div>
              <div className={style.statName}>owners</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
          <button
            className={style.button}
            onClick={()=>setMintToggle(true)}
          >
            + Mint NFT
          </button>
        </div>
        {mintToggle && 
        <div className={`flex justify-center`}>
          <div className={style.form}>
            <input className={style.input} type="text" placeholder="NFT name" onChange={(e)=>setNftName(e.target.value)} />
            <div className={style.dividerVer} />
            <textarea className={style.textarea} name="description" id="" rows="3" placeholder="description" onChange={(e)=>setDescription(e.target.value)}/>
            <div className={style.dividerVer} />
            <input type="file" className={style.file} onChange={(e)=>setFile(e.target.files[0])} />
            <div className={style.buttonContainer}>
              <button className={`${style.button} bg-[red] py-1`} onClick={()=>setMintToggle(false)}>Close</button>
              <button className={`${style.button} py-1`} onClick={mintNewNft}>Mint</button>
            </div>
          </div>
        </div>
        }
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {!nftsLoading && !listingLoading && nfts && nfts.length>0 && nfts?.map((nftItem, id) => {
          return <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
            collectionId = {collectionId}
          />;
        })}
      </div>
    </div>
  );
};

export default Collection;