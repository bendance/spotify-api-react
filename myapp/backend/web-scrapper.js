import fetch from "node-fetch";
import jsdom, { JSDOM } from "jsdom";

export default class WebScrapper
{
    constructor(genre)
    {
        this.genre = genre
    }

    getTopOneHundred = () =>
    {
        // will get different top 100 based on what the user requested
        switch (this.genre)
        {
            case "Pop":
                return this.getPopSongs();
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
        const topSongs = dom.window.document.querySelectorAll("cite").forEach((song) => console.log(song.textContent));
    }
}