import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const mweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets((prev) => [document.data(), ...prev]);
    //     });
    };
    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").onSnapshot((snapshot) => { //snapshot = 실시간(firebase문서 참조)
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

return (
<div class="">
    <NweetFactory userObj={userObj} />
    <div class="t">
        {nweets.map((nweet) => (
            <Nweet 
                key={nweet.id} 
                nweetObj={nweet} 
                isOwner={nweet.creatorId === userObj.uid}
            />
        ))}
    </div>
</div>
);
};

export default Home;