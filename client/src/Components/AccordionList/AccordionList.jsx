import "./AccordionList.scss";
import { useContext } from "react";
import AccordionItem from "../AccordionItem/AccordionItem";
import SavedPlaylists from "../SavedPlaylists/SavedPlaylists";
import { UserContext } from "../../Context/UserContext";

const AccordionList = () => {
  let user = useContext(UserContext);
  const pl_data = user.savedplaylists;
  const renderAccordionList = () => {
    if (Object.keys(pl_data).length !== 0) {
      return (
        <>
          <div className="accordion-l">
            {pl_data.map((i) => (
              <AccordionItem
                key={i.playlist_id}
                open={false}
                title={`Playlist #${i.playlist_id}`}
                children={<SavedPlaylists />}
              />
            ))}
          </div>
        </>
      );
    }
  };
  return <>{renderAccordionList()}</>;
};

export default AccordionList;
