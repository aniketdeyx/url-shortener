import shortUrl from "../models/short_url.model.js"

export const saveShortUrl = async (short_url, long_url, user_id) => {
    try {
        const newUrl = new shortUrl({
            longUrl: long_url,
            shortUrl: short_url
        })
        if (user_id) {
            newUrl.user = user_id
        }
        await newUrl.save()
    } catch (error) {
        console.log(error)
    }
}

export const getShortUrl = async (short_url) => {
    try {
        return await shortUrl.findOneAndUpdate({ shortUrl: short_url }, { $inc: { clicks: 1 } });
    } catch (error) {
        console.log(error)
    }
}

export const getCustomShortUrl = async (slug) => {
    try {
        return await shortUrl.findOne({ shortUrl: slug })
    } catch (error) {
        console.log(error)
    }
}
