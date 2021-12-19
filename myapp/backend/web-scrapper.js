import fetch from "node-fetch";
import jsdom, { JSDOM } from "jsdom";

export default class WebScrapper
{
    constructor(genre)
    {
        this.genre = genre
    }

    // returns a list of tuples of the top 100 songs for that genre in this format [[artist, song],...]
    getTopOneHundred = async () =>
    {
        // will get different top 100 based on what the user requested
        switch (this.genre)
        {
            case "Pop":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-pop-songs.php');
            case "Hip Hop":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-rap-songs.php');
            case "Rock":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-rock-songs.php');
            case "Electronic":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-electronic-songs.php');
            case "Latin":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-latin-songs.php');
            case "Indie Rock":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-indie-songs.php');
            case "Reggaeton":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-reggaeton-songs.php');
            case "K-Pop":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-kpop-songs.php');
            case "R&B / Soul":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-soul-songs.php');
            case "Country":
                return await this.getSongsInGenre('http://www.popvortex.com/music/charts/top-country-songs.php');
        }
    }

    getSongsInGenre = async (link) =>
    {
        const response = await fetch(link);
        const text = await response.text();
        const dom = await new JSDOM(text);
        const topSongTitles = dom.window.document.querySelectorAll(".title");
        const topSongArtists = dom.window.document.querySelectorAll(".artist");

        let topSongTuples = []

        for (let i = 0; i < topSongArtists.length; i++)
        {
            var songTitle = topSongTitles[i].textContent;
            var songArtist = topSongArtists[i].textContent;

            // if the song has feat. in the title, trim it
            if(songTitle.includes("(feat."))
                songTitle = songTitle.replace(/\(feat..*$/, '');

            if(songArtist.includes("&"))
                songArtist = songArtist.replace(/\&.*$/,'');

            if(songArtist.includes("X"))
                songArtist = songArtist.replace(/\X.*$/,'');

            topSongTuples.push([songTitle, songArtist]);
        }

        return topSongTuples;
    }
}