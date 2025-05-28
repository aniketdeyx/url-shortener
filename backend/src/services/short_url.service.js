import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const short_url = slug || generateNanoId(6);
    const isExists = await getCustomShortUrl(slug);
    if (isExists) throw new Error("This custom url already exists")

    await saveShortUrl(short_url, url, userId)
    return short_url
}

export const createShortUrlWithoutUser = async (url) => {
    const short_url = generateNanoId(6);
    if (!short_url) throw new Error("Short URL not generated")
    await saveShortUrl(short_url, url)
    return short_url;
}