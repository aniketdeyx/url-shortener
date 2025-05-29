import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/short_url.service.js"

export const createShortUrl = async (req, res) => {
    const data = req.body
    if(!data.url){
        return res.status(400).send("URL is required")
    }
    let short_url;
    if(req.user){
        short_url = await createShortUrlWithUser(data.url, req.user._id, data.slug)
    }
    else{
        short_url = await createShortUrlWithoutUser(data.url)
    }
  res.send(`http://localhost:3000/`+ short_url)
}

export const redirectFromShortUrl = async (req, res) => {
    const {id} = req.params;
    const url = await getShortUrl(id);
    if (!url) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(url.longUrl)
}
