import React, { useState } from "react";
import { dbService, storageService } from "fbase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewTweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet
        });
        setEditing(false);
    }
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this tweet?");
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    
    return (
        <div className="tweet">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container tweetEdit">
                                <input 
                                    type="text" 
                                    placeholder="Edit your tweet"
                                    onChange={onChange}
                                    value={newTweet} 
                                    autoFocus
                                    required
                                    className="formInput"/>
                                <input type="submit" value="Update Tweet" className="formBtn"/>
                            </form> 
                            <span onClick={toggleEditing} className="formBtn cancelBtn">
                                Cancel
                            </span>
                        </>)}
                </>
                ) : (
                <>
                    {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <div class="tweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
};

export default Tweet;