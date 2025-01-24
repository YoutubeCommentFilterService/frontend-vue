import fs from 'fs';
import axios from 'axios';

const arr = [];

const extractComment = (comments) => {
    comments.items.forEach(comment => {
        const id = comment.id;
        const snippet = comment.snippet.topLevelComment.snippet;
        const likeCount = snippet.likeCount;
        let displayName = snippet.authorDisplayName;
        displayName = displayName.slice(1)

        let textOriginal = snippet.textOriginal;
        textOriginal = textOriginal
                        .replace(/[\r\n,]+/g, ' ') // 개행 및 콤마를 띄어쓰기로 변환
                        .replace(/[^가-힣a-zA-Z0-9~!@#$%^&*()_+\-=\[\]{}:;"'<>,.?/\s]/g, '')
                        .replace(/(\.\.\.)\.+/g, '...')
                        .replace(/(ㅋㅋㅋ)ㅋ+/g, 'ㅋㅋㅋ')
                        .replace(/(ㅠㅠㅠ)ㅠ+/g, 'ㅠㅠㅠ')
                        .replace(/(ㅜㅜㅜ)ㅜ+/g, 'ㅜㅜㅜ')
                        .replace(/(ㄱㄱㄱ)ㄱ+/g, 'ㄱㄱㄱ')
                        .replace(/(\?\?\?)\?+/g, '???')
                        .replace(/\b(\d{1,3}):(\d{1,2}):(\d{1,2}):(\d{1,2})\b|\b(\d{1,3}):(\d{1,2}):(\d{1,2})\b|\b(\d{1,3}):(\d{1,2})\b/g, '') // 타임라인 제거
                        // .replace(/@/g, '')
                        // .replace(/[\p{Emoji}\p{Extended_Pictographic}]/gu, '') // 이모지 변환
        const csvData = `${id},${displayName},${textOriginal},\n`;
        arr.push({ text: csvData, likeCount });
    })
}

let videoId = "w4ohFo1pzWY";
let nextToken = "";
// fs.writeFile('data.csv', 'id,nickname,comment,nickname_class,comment_class,\n', () => {})
do {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/commentThreads", {
            params: {
                key: "AIzaSyCddTbJRZUse2PiTfDVwe38qS5kP2qrJSk",
                videoId,
                part: "snippet",
                maxResults: 100,
                pageToken: nextToken,
            }
        })
        extractComment(response.data);
        nextToken = response.data.nextPageToken;
    } catch (err) {
        console.log(err);
        nextToken = "";
    }
} while (nextToken);

arr.sort((a, b) => b.likeCount - a.likeCount);

arr.forEach(data => {
    fs.appendFile('data.csv', data.text, () => {});
})
fs.appendFile('data.csv', "\n", () => {})