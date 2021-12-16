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
                return await this.getPopSongs();
            case "Hip Hop":
                return;
            case "Rock":
                return;
            case "Electronic":
                return;
            case "Latin":
                return;
        }
    }

    getPopSongs = async () =>
    {
        const response = await fetch('http://www.popvortex.com/music/charts/top-pop-songs.php');
        const text = await response.text();
        const dom = await new JSDOM(text);
        const topSongTitles = dom.window.document.querySelectorAll(".title");
        const topSongArtists = dom.window.document.querySelectorAll(".artist");

        let topSongTuples = []

        for (let i = 0; i < topSongArtists.length; i++)
        {
            topSongTuples.push([topSongArtists[i].textContent, topSongTitles[i].textContent]);
        }

        return topSongTuples;
    }
}