import { post } from "./Utilitys";

export const addFavMasjid = (masjidId, action) => {
    console.log("editAction");
    const requestData = { masjidId: masjidId, action: action };
    return post('/fav-masjid', requestData);
  };