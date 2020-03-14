const { YoutubeDataAPI } = require("youtube-v3-api");
const dotenv = require('dotenv').config;

class YoutubeAPI{
    constructor(apikey){
        this.apikey = apikey;
        this.dataAPI = new YoutubeDataAPI(this.apikey);
    }


    /**
     * @param {string} query запрос (шашлындос, etc. )
     */
    async searchMusic(query, max=10){
        let result = await this.dataAPI.searchAll(query, max);
        console.log(require('util').inspect(result));
        return result;
    }
}

module.exports = {
    ytapi: YoutubeDataAPI
}