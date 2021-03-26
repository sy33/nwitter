import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you wnat to delete this nweet?");
        
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };    
return(
    <div class="test">
        {editing ? (
            <>
              <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Edit your nweet" 
                    value={newNweet} 
                    required 
                    onChange={onChange}
                    />
                    <input type="submit" value="Update Nweet" />
              </form>
            <button onClick={toggleEditing}>Cancle</button>
            </>
            ) : (
            <>
            <div class="item">
            <h2>{nweetObj.text}</h2>
            {nweetObj.attachmentUrl && (
                <img src={nweetObj.attachmentUrl} width="300px" height="auto" />
            )}
            {isOwner && (
                <>
                <div>
                    <button onClick={onDeleteClick} >Delete Nweet</button>
                    <button onClick={toggleEditing} >Edit Nweet</button>
                </div>
                </>
            )}
            </div>
            </>

            )
        }
    </div>
    );
};


export default Nweet;