import React from "react";
import DailyLogEntry from "./DailyLogEntry";
import SolutionEntry from "./SolutionEntry";
import ConversationEntry from "./ConversationEntry";
import NoteEntry from "./NoteEntry";

const EntryPopupSkeleton = (props) => {
  const entry = props.entryData;

  const closeHandler = () => {
    props.onRemove(null);
  }

  const deleteHandler = async () => {
    console.log("deleted", entry);
    const result = await fetch(`${process.env.REACT_APP_API_URL}/posts/delete/${entry._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    });

    const resData = { ...await result.json(), status: result.status }

    if (resData.status !== 200) {
      props.onNotification({ title: "Error Occured", type: "error", message: resData.message });
      return;
    }

    props.onNotification({ title: "Entry Deleted", type: "success", message: resData.message });
    props.onRemove();
  }

  return (
    <>
      {entry.type === "daily-log" && <DailyLogEntry entry={entry} onClose={closeHandler} token={props.token} onNotification={props.onNotification} onDelete={deleteHandler} />}
      {entry.type === "solution" && <SolutionEntry entry={entry} onClose={closeHandler} token={props.token} onNotification={props.onNotification} onDelete={deleteHandler} />}
      {entry.type === "conversation" && <ConversationEntry entry={entry} onClose={closeHandler} onNotification={props.onNotification} token={props.token} onDelete={deleteHandler} />}
      {entry.type === "note" && <NoteEntry entry={entry} onClose={closeHandler} token={props.token} onNotification={props.onNotification} onDelete={deleteHandler} />}
    </>
  )
}

export default EntryPopupSkeleton;