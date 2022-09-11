import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import React, { useMemo,useState,useEffect } from "react";
import Header from "../../components/Header";
import { ThirdwebSDK } from "@3rdweb/sdk";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import Purchase from "../../components/nft/Purchase";
import { useNFT,useNFTCollection,useActiveListings,useMarketplace } from '@thirdweb-dev/react'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImageContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const nft = () => {
  const router = useRouter();
  const { isListed,collectionId,nftId } = router.query;

  const nftCollection = useNFTCollection(collectionId);
  const { data: selectedNft, isLoading:nftsLoading } = useNFT(nftCollection,nftId);
  const marketplace = useMarketplace("0xC8D6CFb44C6DB81cc4dcd558F8c08297E7717466");
  const { data: listings, isLoading:listingLoading, error } = useActiveListings(marketplace, { start: 0, count: 100 });
  

  return <div className={style.wrapper}>
    <Header />
    <div className={style.container}>
        <div className={style.topContent}>
            <div className={style.nftImageContainer}>
                <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
                <GeneralDetails selectedNft={selectedNft} collectionId={collectionId} />
                <Purchase isListed={isListed} selectedNft={selectedNft} listings={listings} marketplace={marketplace}  />
            </div>
        </div>
        <ItemActivity />
    </div>
  </div>
};

export default nft;
