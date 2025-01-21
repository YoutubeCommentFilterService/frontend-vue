import fs from 'fs';

const extractComment = (comments) => {
    comments.items.forEach(comment => {
        const id = comment.id;
        const snippet = comment.snippet.topLevelComment.snippet;
        let displayName = snippet.authorDisplayName;
        displayName = displayName.slice(1).replace(/-([a-zA-Z0-9]{3})$/, '').replace(/I9/g,"19")

        let textOriginal = snippet.textOriginal;
        textOriginal = textOriginal
                        .replace(/[\n,]+/g, ' ') // 개행 및 콤마를 띄어쓰기로 변환
                        .replace(/\b(\d{1,3}):(\d{1,2}):(\d{1,2}):(\d{1,2})\b|\b(\d{1,3}):(\d{1,2}):(\d{1,2})\b|\b(\d{1,3}):(\d{1,2})\b/g, '') // 타임라인 제거
                        // .replace(/[\p{Emoji}\p{Extended_Pictographic}]/gu, '') // 이모지 변환
        const csvData = `${id},${displayName},${textOriginal},\n`;
        if (textOriginal.trim() !== '') fs.appendFile('data.csv', csvData, () => {})
    })
}

const data = {
    "kind": "youtube#commentThreadListResponse",
    "etag": "mBY-kmtbWSHks4Ly1o9x7pVkTzQ",
    "pageInfo": {
        "totalResults": 73,
        "resultsPerPage": 100
    },
    "items": [
        {
            "kind": "youtube#commentThread",
            "etag": "Me4Rg5Y_5yx-rr3YOcnpVcaYhEQ",
            "id": "UgyhvC6HUcS687bko_R4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "zowUYCg02rLTXcEhw8w-wq9Z7VI",
                    "id": "UgyhvC6HUcS687bko_R4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "모든 피시방 다 되는거?",
                        "textOriginal": "모든 피시방 다 되는거?",
                        "authorDisplayName": "@cutybara5444",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/AUUhxrTy5NTk56RjmKKPkWM8QS1tW094E69DyuqjTAxq_r75kEyu0B7Ig0TVZLsfvgAcA5SmhPQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@cutybara5444",
                        "authorChannelId": {
                            "value": "UCJ6JLfV4Oo3BaclZHVXbAtA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T14:42:44Z",
                        "updatedAt": "2025-01-20T14:42:44Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "OOSKq_ZpXkZVWWzcIqALn4HTSJo",
            "id": "UgybhU4OKcB1l8yx-pZ4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "HPEx4S5O32a2jGFCJzdOLZMJgNY",
                    "id": "UgybhU4OKcB1l8yx-pZ4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "민수 턱살 진수화 뭐냐????? 흠;;; 돼냐링",
                        "textOriginal": "민수 턱살 진수화 뭐냐????? 흠;;; 돼냐링",
                        "authorDisplayName": "@comp9530",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nVhamd3Oapexh-qm6QKsghDxcxGb87VuURKvuIi6o3oA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@comp9530",
                        "authorChannelId": {
                            "value": "UCN8LfYytZU_7Pk7JOKqO_dA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T14:28:28Z",
                        "updatedAt": "2025-01-20T14:28:28Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "WnPqH_UZjLbLA0Wym233azyYmk0",
            "id": "UgxF3l87iSxrkdQd3OJ4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "x-BJvbUpiktT4PK57B4JVPaj2AI",
                    "id": "UgxF3l87iSxrkdQd3OJ4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=584\">9:44</a>",
                        "textOriginal": "9:44",
                        "authorDisplayName": "@aksk1129",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_kao9RzK-zqe4nks9iAHNh7Vrw722_5eKEq-Y8JP6Bl-ys=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@aksk1129",
                        "authorChannelId": {
                            "value": "UCuTtYvGR4IMUXr79WUnOMaA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T14:27:26Z",
                        "updatedAt": "2025-01-20T14:27:26Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "Y292zGiEC2yjMtTFs1hQ_mZ4TMs",
            "id": "UgxGu4zqmcoS0DkMM314AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "8Jf4lwlXjpjGafr3vPir5hBoHqU",
                    "id": "UgxGu4zqmcoS0DkMM314AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "근데 이게 보통 대부분 피시방에서는 투겜이 안돌아가기때문에 카트하는 사람 말고는 의미가 없지 않을까 싶다",
                        "textOriginal": "근데 이게 보통 대부분 피시방에서는 투겜이 안돌아가기때문에 카트하는 사람 말고는 의미가 없지 않을까 싶다",
                        "authorDisplayName": "@루카아데",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/TZFgISaZKK9pxq8j-W2xFp_uEbFbM4tHTNbhquDTIKQiK5har_c_q4q2fPCo-iOV3DOsMHbS=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%A3%A8%EC%B9%B4%EC%95%84%EB%8D%B0",
                        "authorChannelId": {
                            "value": "UC-8wn4fdKEYUOJEj1jM294Q"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:56:30Z",
                        "updatedAt": "2025-01-20T14:01:55Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "gdjBSnwxsA_bfQh5Ip3OSNo6PkM",
            "id": "UgxoSD21JgNqZYdgo4N4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "lzWwAYXI9xJJkBbzAaakU0z5fDs",
                    "id": "UgxoSD21JgNqZYdgo4N4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "제목 보자마자 카드맆 이벤트인거 알았다… (프..사....혼자있을때만눌..러ㅋ)",
                        "textOriginal": "제목 보자마자 카드맆 이벤트인거 알았다… (프..사....혼자있을때만눌..러ㅋ)",
                        "authorDisplayName": "@I9금-pioneering-ultimate-ROOM",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/DiUdFp1NShemp5WU6OgjyaSulIcnr5h-J4uNJa0eoIZw0rycQb5Mg7InVhlNeuIrMrlEtJaI5g=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@I9%EA%B8%88-pioneering-ultimate-ROOM",
                        "authorChannelId": {
                            "value": "UCFRZD5FG0HIWKTXo8Bzlpww"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 337,
                        "publishedAt": "2025-01-20T13:42:58Z",
                        "updatedAt": "2025-01-20T13:42:58Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 22,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "9pThKwEnUQeSqDqecLg6EkKFHqM",
            "id": "UgzrddcMqFXdnuPAYgl4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "pDMJ5HICfH8GthTJBNeHLVoPRxU",
                    "id": "UgzrddcMqFXdnuPAYgl4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "추가로 가맹점 잘 보고 가시면 됩니다 그냥 프리가 있고 플러스 프리미엄 있는 곳도 있어요 플프로 가시면 됩니다 다른 넥슨겜 스팀겜은  가능하나 롤은 안됩니다",
                        "textOriginal": "추가로 가맹점 잘 보고 가시면 됩니다 그냥 프리가 있고 플러스 프리미엄 있는 곳도 있어요 플프로 가시면 됩니다 다른 넥슨겜 스팀겜은  가능하나 롤은 안됩니다",
                        "authorDisplayName": "@유파토",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/VGS2D8g19vfnypLwA55o-xOcX66PTPT9LWpDTaVHp6qLsxM1Y_VA0huM-v5zjcE4eo-rfGAI=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9C%A0%ED%8C%8C%ED%86%A0",
                        "authorChannelId": {
                            "value": "UCF4yqCJrgQYkqwt7EmhlT4A"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:34:57Z",
                        "updatedAt": "2025-01-20T13:43:10Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "yO5oLuLSuJ_8UBDJ1ePzyDG9V2I",
            "id": "UgxAaY8UXygl3eAcevh4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "JM2_C4WFFa4fCPVSH8jDkt795iE",
                    "id": "UgxAaY8UXygl3eAcevh4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "넥슨겜은 넥슨에서 피방 중복실행 가능하게 만들어서 저렇게 가능한데 다른 게임들은 안될수도있어요 여러분~",
                        "textOriginal": "넥슨겜은 넥슨에서 피방 중복실행 가능하게 만들어서 저렇게 가능한데 다른 게임들은 안될수도있어요 여러분~",
                        "authorDisplayName": "@비공개-x4o",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nRGYaKQhNTO6oja7yttAutwCfZITlH2vftJtQIRVw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B9%84%EA%B3%B5%EA%B0%9C-x4o",
                        "authorChannelId": {
                            "value": "UCXXagGmVO_FoJ5kEVcLrwzA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:12:27Z",
                        "updatedAt": "2025-01-20T13:12:27Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "hNEyl2J6fGDfzMNU44mZQQH44UY",
            "id": "Ugyo0GGSNdnjgsJLtyp4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "KQ4KSUmbub29_0zlpIrVlj6ELtc",
                    "id": "Ugyo0GGSNdnjgsJLtyp4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "대월클 열린무울님이다...!",
                        "textOriginal": "대월클 열린무울님이다...!",
                        "authorDisplayName": "@한솔-e1w3m",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/D-qJ0iq9OkdWfGTS16Bh5jBAvmjX45povOkF4OCsk8cvdEql9OSz6leHCnazdAIkEzkB_NXD=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%ED%95%9C%EC%86%94-e1w3m",
                        "authorChannelId": {
                            "value": "UCKJBTCDwWMQSHzPiuSF6AZA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:10:07Z",
                        "updatedAt": "2025-01-20T13:10:07Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "AUy4UdwL6Y_oR0CZ4dPotrZVxDQ",
            "id": "UgwgvolJAB6d4I0X6bp4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "R9BJfr_ottT-N10PdzULADbLGB4",
                    "id": "UgwgvolJAB6d4I0X6bp4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "피시방에서 카트 1시간동안 틀어놓고 홈페이지 보니까 게토 포인트 5000원 지급 됐다길래 확인해봤는데 5000원은 커녕 1 원도 안들어왔던데;",
                        "textOriginal": "피시방에서 카트 1시간동안 틀어놓고 홈페이지 보니까 게토 포인트 5000원 지급 됐다길래 확인해봤는데 5000원은 커녕 1 원도 안들어왔던데;",
                        "authorDisplayName": "@푸항항-k7j",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_ndtGCqv8GkxVkOUgUUrgxMJ79NmTAJGhdSHUUM4AH2_DjjKes=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%ED%91%B8%ED%95%AD%ED%95%AD-k7j",
                        "authorChannelId": {
                            "value": "UCAW-M4e9oCiw-Wep8i3gxQQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:01:51Z",
                        "updatedAt": "2025-01-20T13:01:51Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "pD8mM9P1lsgNwjzl7EgOZvlKZn0",
            "id": "Ugzx5SOs4yEV8tZhOEF4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "ea_oC81Fp_-GqAnrDgnNmWgA9lY",
                    "id": "Ugzx5SOs4yEV8tZhOEF4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "우물이랑 같이가네 ㅋㅋㅋ",
                        "textOriginal": "우물이랑 같이가네 ㅋㅋㅋ",
                        "authorDisplayName": "@_Blitzcrank",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/3tlv3GJPrjjJ3TZZjsPBuRRB0ehNT_dYDVJ0z5QoP1GHUMA53oYgONtBZDWhrfzeaMEr9LUl=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@_Blitzcrank",
                        "authorChannelId": {
                            "value": "UCXMlqqPk0tVo2TR1oxsofog"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T13:01:48Z",
                        "updatedAt": "2025-01-20T13:01:48Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "qr9nRLNRYDwwG_oJPRKl_AlrkTA",
            "id": "UgyH7MAzpTXaLgs75IB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "bYrMhx3D1RABWmLPFVBdMFghzpE",
                    "id": "UgyH7MAzpTXaLgs75IB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "넥슨 급한가보네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                        "textOriginal": "넥슨 급한가보네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                        "authorDisplayName": "@오로치마루-e8l",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_mYrRkqBR-VVsxmJRem2uHMCB80JNVuhCyHco8syYE=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%98%A4%EB%A1%9C%EC%B9%98%EB%A7%88%EB%A3%A8-e8l",
                        "authorChannelId": {
                            "value": "UCQlBR1Qss2oN_hc2tYEr4RQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T12:34:54Z",
                        "updatedAt": "2025-01-20T12:34:54Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "hejfHbZjGQLZUsMQYBj2Ip5QrhE",
            "id": "Ugwv2U8FVyq23_Dqeqp4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "yj5UHh02Ku988l6s3bZOe2WHjxY",
                    "id": "Ugwv2U8FVyq23_Dqeqp4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "살찌니까 진수랑 똑닮았네 ㄷㄷ",
                        "textOriginal": "살찌니까 진수랑 똑닮았네 ㄷㄷ",
                        "authorDisplayName": "@goodchoo",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/-sxQTmCgUZot2vN29mIFy3veWGehHI_LjHlmoOGP77b3wOoI_2A9SdVKsvewEzyIRh5PpSX3=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@goodchoo",
                        "authorChannelId": {
                            "value": "UC7ZzJ_xKRo9domvILbUN7Ig"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T12:31:35Z",
                        "updatedAt": "2025-01-20T12:31:35Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "iH1TLNMGmQmCkS3SMgNBfin5WpM",
            "id": "Ugw-iso4Hbl2agGOJ5p4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "37vfRmSlR9otW_WCs08oAQ2y2og",
                    "id": "Ugw-iso4Hbl2agGOJ5p4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "롤도 같이 돌릴 수 있나요?",
                        "textOriginal": "롤도 같이 돌릴 수 있나요?",
                        "authorDisplayName": "@Q1w2e3__r",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/_yHzHbQsrfHV9-uyxCw_Fel_s4Ai1zC3rGRmSfTQ-ZTyf0myeT3hAYTm4rYdnk1LeMEayzfAHg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Q1w2e3__r",
                        "authorChannelId": {
                            "value": "UChhignRod-pMnWUwwTFWhOA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T12:18:48Z",
                        "updatedAt": "2025-01-20T12:18:48Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 2,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "xwy5jpcc7EMdJATmyOFI9Im2ISw",
            "id": "Ugwxzz7j6VqFlCIIt0N4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "_s4dgD-pvtrtXFBKNWdM69_Onx0",
                    "id": "Ugwxzz7j6VqFlCIIt0N4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "넥슨이 유료게임에서 10시간하면 내꺼 3시간 가져가더라 4천원은 있어야할듯",
                        "textOriginal": "넥슨이 유료게임에서 10시간하면 내꺼 3시간 가져가더라 4천원은 있어야할듯",
                        "authorDisplayName": "@3meat",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lbpfOC9I8qLiOVcpkqVGISdiSIIKblr7zkprr7zVhB1cV6PVM=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@3meat",
                        "authorChannelId": {
                            "value": "UC1xRXt0oTtuB4Dm0Ynz6t3Q"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T12:14:31Z",
                        "updatedAt": "2025-01-20T12:14:31Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "cKV999v1u9YvFIhONJ1qpkfkn74",
            "id": "UgxodQaNc81XLS_s_3N4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "KMRH0y7GDR3X2RqM9CE-R1QSc5A",
                    "id": "UgxodQaNc81XLS_s_3N4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트 켜놓고 크아 하는거 보니까 pc방 혜택 동시가 되네 ㅁㅊ;;",
                        "textOriginal": "카트 켜놓고 크아 하는거 보니까 pc방 혜택 동시가 되네 ㅁㅊ;;",
                        "authorDisplayName": "@users-mushroom",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lefjmCJzurRxLLWPvfQQV8uFM7uUJLf-YRgVcrgw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@users-mushroom",
                        "authorChannelId": {
                            "value": "UCWlxJqFkSjuwda4QUysTJDQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T12:10:59Z",
                        "updatedAt": "2025-01-20T12:10:59Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "BWQOq2k3surxY-OEbmMyxFHdCh4",
            "id": "UgwqZrJPwzddHzeFGvt4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "fXBhfpIfXPXWxYmSfeUPcv62R7M",
                    "id": "UgwqZrJPwzddHzeFGvt4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "형독님 요줌 롤 개망했는데 피방도 롤하는사람 많이 줄어들었나요?",
                        "textOriginal": "형독님 요줌 롤 개망했는데 피방도 롤하는사람 많이 줄어들었나요?",
                        "authorDisplayName": "@기원이-k3z",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/Az8lB2I__8mBBNem6GENA4EoyjIjxbz-RWCSHOqj5jo4Kh4Y98lfX1YWetutF26RdODo2lQ99Q=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EA%B8%B0%EC%9B%90%EC%9D%B4-k3z",
                        "authorChannelId": {
                            "value": "UCicii_aSSABG7vj0Q0ZRVkA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:43:00Z",
                        "updatedAt": "2025-01-20T11:43:00Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 2,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "yeY5skBvrscQYwJRulum1basiDM",
            "id": "UgwxydomXWKpRUhJRbx4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "wMZFtO4ozIpNSdcyxtEsa9IHawY",
                    "id": "UgwxydomXWKpRUhJRbx4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "하..형독이 이번 대회에 나갔었으면 1024강 다 씹어먹었을텐데 아쉽다",
                        "textOriginal": "하..형독이 이번 대회에 나갔었으면 1024강 다 씹어먹었을텐데 아쉽다",
                        "authorDisplayName": "@liillil53",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lz1_Ud1GkcNyWR_5ZPOYO0vamcd3Rl7496aKRDW1I=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@liillil53",
                        "authorChannelId": {
                            "value": "UCvF08EjI6M__ku-8dxs2odQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:35:53Z",
                        "updatedAt": "2025-01-20T11:35:53Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "4S_srE9VRDMkEvkgelxq3ISs3ko",
            "id": "UgyEUHge3qdf2KsfI7d4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "F9FdOznpBiS1_3IprBk-6eKpZZ0",
                    "id": "UgyEUHge3qdf2KsfI7d4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트 pc방 이벤트 열어서 하는애들 대부분은 카트만 켜놓고 정작 메이플하고있는 슬픈 현실..",
                        "textOriginal": "카트 pc방 이벤트 열어서 하는애들 대부분은 카트만 켜놓고 정작 메이플하고있는 슬픈 현실..",
                        "authorDisplayName": "@병줘팸",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_kJPqWvKueKR6ve-T6-VP0Iwzbv9i7XSlkmXRqJMTHFLW0PvSU=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B3%91%EC%A4%98%ED%8C%B8",
                        "authorChannelId": {
                            "value": "UCUHesLllvHNW5Q6AJGxrJBA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:30:09Z",
                        "updatedAt": "2025-01-20T11:30:09Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "0LMKUhl85IvTZwbvBzge58__5mY",
            "id": "Ugz4-KtRaYADG7odPb54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "rsoixydDlOqiQHUqUrPU4JSn2v8",
                    "id": "Ugz4-KtRaYADG7odPb54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카드맆 그마!!! 엄청나!!",
                        "textOriginal": "카드맆 그마!!! 엄청나!!",
                        "authorDisplayName": "@응애-v9g2h",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nGP4m4x-JiJ1K2npTZx68Sj4iO5dzshlvsikf6RPwL2th9efoYZwNS1zCgugInNN8p-dh1d1Yy=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9D%91%EC%95%A0-v9g2h",
                        "authorChannelId": {
                            "value": "UCb64cah4Y1bijWhDVf1o8bw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:27:32Z",
                        "updatedAt": "2025-01-20T11:27:32Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "Ns_xlTuIGjH8EkVYGAZALuJ6Yus",
            "id": "UgwASDkf_aqqH1xYmyx4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "OYfU3WV2jYl7ve84Yd1OuG94CTg",
                    "id": "UgwASDkf_aqqH1xYmyx4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트켜두고 롤ㄱㄴ?",
                        "textOriginal": "카트켜두고 롤ㄱㄴ?",
                        "authorDisplayName": "@고양이다냥캉캉",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/VRyDov9hnmgRyOyaQy7QX8q3p2rf0FpalctLDD30k5Zk132Y8YfNeohfVUH7SmEZK4t9U1jWbQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EA%B3%A0%EC%96%91%EC%9D%B4%EB%8B%A4%EB%83%A5%EC%BA%89%EC%BA%89",
                        "authorChannelId": {
                            "value": "UCTUrgpIgm0bcwdpGGi-0dQA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:21:19Z",
                        "updatedAt": "2025-01-20T11:21:19Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "yRsgMx5SycVxQmmbigTtdNPISNI",
            "id": "UgyeZvQ9uQJtLuc8gHl4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "-qhSeXenYewV72M7FReI4ReyQvU",
                    "id": "UgyeZvQ9uQJtLuc8gHl4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "뭔가 우물님이 제2의 코믿이 될거 같은 느낌이 드는디",
                        "textOriginal": "뭔가 우물님이 제2의 코믿이 될거 같은 느낌이 드는디",
                        "authorDisplayName": "@박시우-r5l",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/z84_docBhl7fuqkTdxvMszVU2P5lzhoQb1uFp4S-zI7QDqBImMVqQqb0d2CcmVVKwyFSI8w2=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B0%95%EC%8B%9C%EC%9A%B0-r5l",
                        "authorChannelId": {
                            "value": "UCg_hN2VzkPk37Lc_ht3ThwA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:07:07Z",
                        "updatedAt": "2025-01-20T11:07:07Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "40Z7Lc62xNO29FLb_H0w-OIZavk",
            "id": "Ugy9hh59NWusjOnLoEt4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "wAIuffSIP0k12YeJVDMvQVJCDs4",
                    "id": "Ugy9hh59NWusjOnLoEt4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "지금은 모르겠는데 처음 3시간 이벤트때는 이벤트 되는 피방 찾는게 하늘의 별따기라 하고 싶어도 못했었는데",
                        "textOriginal": "지금은 모르겠는데 처음 3시간 이벤트때는 이벤트 되는 피방 찾는게 하늘의 별따기라 하고 싶어도 못했었는데",
                        "authorDisplayName": "@musclemusclekingJYE",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nPBr_xpF_U6Gq1fz398RZe4487CqcOmhQdsy0A5CBmbg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@musclemusclekingJYE",
                        "authorChannelId": {
                            "value": "UC6LxS46F-gNGg0BmFBGBayQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T11:04:32Z",
                        "updatedAt": "2025-01-20T11:04:32Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "HMmaON12pCHpcOKjJ62FjF22EiQ",
            "id": "UgwzagzGbVxbQE_KB7R4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "BB9iTvpqTQkfk_Ep-A9s-gu0UDs",
                    "id": "UgwzagzGbVxbQE_KB7R4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "집에 컴 못써서 저 시간 알뜰살뜰 쓰고 있음 ㅋㅋㅋㅋㅋ",
                        "textOriginal": "집에 컴 못써서 저 시간 알뜰살뜰 쓰고 있음 ㅋㅋㅋㅋㅋ",
                        "authorDisplayName": "@겁나약한초보",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/lHBP7EjzwL4bOw1jobmRVX4A3HwOU3mxOj3NzL0WRgZjwhW9iyUAVOtEN408iiiUA8AmSg5phg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EA%B2%81%EB%82%98%EC%95%BD%ED%95%9C%EC%B4%88%EB%B3%B4",
                        "authorChannelId": {
                            "value": "UChzIG8zvVDdWMHZsGp22cdA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T10:53:28Z",
                        "updatedAt": "2025-01-20T10:53:28Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "UUVTCM14ZGrI00c5dUJux8Whm68",
            "id": "Ugz15EBlCzV1ncEW7KB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "HvnBboyzGmRaP5EpM_KshVe5RN4",
                    "id": "Ugz15EBlCzV1ncEW7KB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "어디 Pc방이지😊",
                        "textOriginal": "어디 Pc방이지😊",
                        "authorDisplayName": "@여진정-p5x",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lFFW-nj60JfhTG590s75U0dWxzJiGsU07Mq2tqA7-t2yj2XpI=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%97%AC%EC%A7%84%EC%A0%95-p5x",
                        "authorChannelId": {
                            "value": "UC7e66osstqfqEOr6r7N0ObA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T10:50:46Z",
                        "updatedAt": "2025-01-20T10:50:46Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "RTtvg6z7w8s2rpa5J6xYNxUwCHA",
            "id": "UgwCOTN2MDtnsXwVrMh4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "uvlt0w8VZEVy7WGfbES7Vv0eB_k",
                    "id": "UgwCOTN2MDtnsXwVrMh4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "중간 버파브금 ㅈㄴ 추억이네 ㅠㅠ",
                        "textOriginal": "중간 버파브금 ㅈㄴ 추억이네 ㅠㅠ",
                        "authorDisplayName": "@박지민-l4k",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lcZRJFTg_dTtxMavMi-zN1oDfYy6BlKG6ih4jmFVzg-HI=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B0%95%EC%A7%80%EB%AF%BC-l4k",
                        "authorChannelId": {
                            "value": "UCxBgVRzXa_ojU05qdIj9mLQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T10:44:43Z",
                        "updatedAt": "2025-01-20T10:44:43Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "ZVAuTSQnOwQuo8_grn0dwS24fPI",
            "id": "Ugzcf35CLLtH7Au8fR54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "Rillyhc17Z_Kk-8vVqpHTwf5TfY",
                    "id": "Ugzcf35CLLtH7Au8fR54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "피시방가니까 카드맆 키고 메이플하던데 ㅋㅋㅋㅋ",
                        "textOriginal": "피시방가니까 카드맆 키고 메이플하던데 ㅋㅋㅋㅋ",
                        "authorDisplayName": "@아야팬-Kim",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/qQKq4p8diKGHX6V_3n5GgMKw9mCZU13QT1lgx5pp97RDaprxwdLozfSGXyQ7shZFHaTNBO5_V74=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%95%84%EC%95%BC%ED%8C%AC-Kim",
                        "authorChannelId": {
                            "value": "UCXvmZLEL3OfA3dAVoysCovw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T10:44:11Z",
                        "updatedAt": "2025-01-20T10:44:11Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "MhBqHb-5boHOEeNPlz1yvuz2NKY",
            "id": "UgyUoW0uWAy7tfig2XJ4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "_HzG5eGLrfpceeYRiwnYBb2Gi7g",
                    "id": "UgyUoW0uWAy7tfig2XJ4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=350\">5:50</a> ㄹㅌㅇㅇㄴㅇ",
                        "textOriginal": "5:50 ㄹㅌㅇㅇㄴㅇ",
                        "authorDisplayName": "@일몰-c1l",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/zHncPVQexPILU9iQPPHSMLzfXDsW5hMWTdDNOMBNHPJPKiHhL1M3dWlQiQIm70LIzWVSp2Nodw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9D%BC%EB%AA%B0-c1l",
                        "authorChannelId": {
                            "value": "UCUk9EPl8NKNEX3ZB5cIYxww"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T10:16:23Z",
                        "updatedAt": "2025-01-20T10:16:23Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "86pIVbW3O_qhcIrGA95snXKNeK0",
            "id": "Ugyq1qG7jK5rpYidq594AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "sfg8gT8ErKIfOHpBB7pGgzguuoc",
                    "id": "Ugyq1qG7jK5rpYidq594AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=248\">4:08</a> 레이시티 브금이네 개추억ㅋㅋㅋㅋㅋ",
                        "textOriginal": "4:08 레이시티 브금이네 개추억ㅋㅋㅋㅋㅋ",
                        "authorDisplayName": "@완기-z6w",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/Up6MnUpb3R413zb7Hm42HPtmc-kIASuhRms4F2TDjhsHnTXIbjLwfOsVKvZMM_6kcjNafRLwBic=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%99%84%EA%B8%B0-z6w",
                        "authorChannelId": {
                            "value": "UC-egXRVXgmKa8i5ZflKmEoA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 4,
                        "publishedAt": "2025-01-20T10:06:26Z",
                        "updatedAt": "2025-01-20T10:06:26Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "8raU38qzUoiXUJiC4ChwKHD4eyE",
            "id": "UgyP8KtYOPmFCg_cyW14AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "BgFVwVG0P8F-Big0T7zXED15LPM",
                    "id": "UgyP8KtYOPmFCg_cyW14AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "썸넬 땜에 예전 영상인줄 알았다",
                        "textOriginal": "썸넬 땜에 예전 영상인줄 알았다",
                        "authorDisplayName": "@master_ruby",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/mqB_FjE9eKOC2PrlLfKXbyv481fYw_V2Wo40EPV2ac3Zgmq13Q7F10PWEgjFcTWZfPKNGJR6XSs=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@master_ruby",
                        "authorChannelId": {
                            "value": "UCwbtwB1VTWVduMTwiuUKuAg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T09:44:36Z",
                        "updatedAt": "2025-01-20T09:44:36Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "JlTZlSxZZfmVre8Zot1G_8giXGk",
            "id": "UgzoPE7CicxWlKV_Xfp4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "ilCBhOTZVgn2Vga0SKSX973N2MQ",
                    "id": "UgzoPE7CicxWlKV_Xfp4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "오늘도 사이좋은(?) 둘. <br>가스렌지에 물올리게 되는 영상이었다😂",
                        "textOriginal": "오늘도 사이좋은(?) 둘. \n가스렌지에 물올리게 되는 영상이었다😂",
                        "authorDisplayName": "@SHIN-gs6lp",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/uBe41AT0f5rmvBcwN99MdDDgBHtRkbBDHrdM12QWxIta9AKDHZuGJsNV5IN6HJ3I4IOX7pI4lw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@SHIN-gs6lp",
                        "authorChannelId": {
                            "value": "UCVla1s-d7JAVtUVUh1-D0HA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T09:31:00Z",
                        "updatedAt": "2025-01-20T09:31:00Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "TES5Kb-og5lftFbF-6WWrxNVJXM",
            "id": "UgxH6c7z3vB_YArsXA94AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "Z4K4wvM0b4rCWhV2xs3gmbQMYm4",
                    "id": "UgxH6c7z3vB_YArsXA94AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "쌀먹 ㅅㅅ",
                        "textOriginal": "쌀먹 ㅅㅅ",
                        "authorDisplayName": "@션패-p1b",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_k9DxRcgVvlF2-TsMG-lul0LjIx9ATYSJIuiqvfyp_pXiAdTq1vkaynoMRA7jWczAgFZ0nBAGl9=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%85%98%ED%8C%A8-p1b",
                        "authorChannelId": {
                            "value": "UCVCJnMCup9670A3IaNh2_RQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 1,
                        "publishedAt": "2025-01-20T09:30:37Z",
                        "updatedAt": "2025-01-20T09:30:37Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "J2KjsISUa1yXc0owr0vBHSDvxSo",
            "id": "Ugz1Hv-xRmi5oIN05DN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "nxlCYsVMoZCtwsO-Q4icgP_wUxY",
                    "id": "Ugz1Hv-xRmi5oIN05DN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "디펜스(?)의 그랜드 마스터(?) 우물",
                        "textOriginal": "디펜스(?)의 그랜드 마스터(?) 우물",
                        "authorDisplayName": "@les-fe",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lb-lBb6-rl_rxGgAnDeW8EvJQjI_nH6RhaFU61qkNyLtqKelCNJ2fbVBeKGbbGsTR3ag=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@les-fe",
                        "authorChannelId": {
                            "value": "UCaYGzFuGN05RvbvDkWwJrYA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T09:24:27Z",
                        "updatedAt": "2025-01-20T09:24:27Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "fsgBFyDbPAjHxnjQzR1dJpV9KTc",
            "id": "Ugzscp3-1T8FfO2PNo54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "bMAN7NujOtGSNDyMKEDVoTz3gHE",
                    "id": "Ugzscp3-1T8FfO2PNo54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "중간에  왜 레이시티 브금이 들렸지,,",
                        "textOriginal": "중간에  왜 레이시티 브금이 들렸지,,",
                        "authorDisplayName": "@흰둥이-m8t",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nTXTB-bYTpAFwqWiCwPrHu0mTLV3hTqBc2axA0UExMZWo=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%ED%9D%B0%EB%91%A5%EC%9D%B4-m8t",
                        "authorChannelId": {
                            "value": "UCqqEj_cbt0ZZZgfLP_SkIig"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T09:24:06Z",
                        "updatedAt": "2025-01-20T09:24:06Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "RBUTwd4BcDytnrfSSjWAhGzyubY",
            "id": "Ugz_v056zBlyDLe4hft4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "KQtGjuaPOJfQe0el2vVdYI1Z8W0",
                    "id": "Ugz_v056zBlyDLe4hft4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "열린우물님 걍 암것도 안하고 가만히 있어도 웃기네 ㅋㅋㅋㅋㅋㅋ 치트키;;",
                        "textOriginal": "열린우물님 걍 암것도 안하고 가만히 있어도 웃기네 ㅋㅋㅋㅋㅋㅋ 치트키;;",
                        "authorDisplayName": "@usesion",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_n3AexbIABbMKlogUR0dPQIElzbRy40MFOmAi6C0boN4j398k0=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@usesion",
                        "authorChannelId": {
                            "value": "UCmjnWdnadgEBimAm_hofzIQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T09:04:42Z",
                        "updatedAt": "2025-01-20T09:04:42Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "1FKVfW0zA1-HTiy2TsWPpG6VtnU",
            "id": "UgzbsKVeQTCnIxIfslN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "QEwrm8txzn-ZgKib6JIaAeojM04",
                    "id": "UgzbsKVeQTCnIxIfslN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "아니 너무 수상하잖아...ㅋㅋㅋㅋ",
                        "textOriginal": "아니 너무 수상하잖아...ㅋㅋㅋㅋ",
                        "authorDisplayName": "@enidanny554",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nKLtSEAbOEZ2f5uzeY6_7DFxEhOcFouWACZ1xbimrlCxM=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@enidanny554",
                        "authorChannelId": {
                            "value": "UCxloceQ6owd6zCm338u3_XQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:39:35Z",
                        "updatedAt": "2025-01-20T08:39:35Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "ZuMIqSTwvQoNPXR0g1TqnEIG0fs",
            "id": "Ugx0i_kn0IBds4nKGex4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "oOtM2qHCXT_VngbTzYx5KfFm5b4",
                    "id": "Ugx0i_kn0IBds4nKGex4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "PC방 쌀먹은 뭐야",
                        "textOriginal": "PC방 쌀먹은 뭐야",
                        "authorDisplayName": "@김창섭djejs",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/O6jHExQ2UtuD64OHG1uwQSpvA-xDot6CM2iEo0AWWfjJm1vH0k4EjeejzlS74nW0mUa9Ud41uts=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EA%B9%80%EC%B0%BD%EC%84%ADdjejs",
                        "authorChannelId": {
                            "value": "UC7MLopFLjAZxRqH0IvAEmfg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 1,
                        "publishedAt": "2025-01-20T08:37:57Z",
                        "updatedAt": "2025-01-20T08:37:57Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "BoDfV4cgO79DSgqIT4u-YfiIpgQ",
            "id": "Ugw51MEEAsBxZebsc5l4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "sKEY5xhTZarHVx-OufYK6xdRBPU",
                    "id": "Ugw51MEEAsBxZebsc5l4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "쇼츠만 보다가 롱폼 처음 보는데<br>편집 소스를 얼굴로 한 사람이 실제로 살아 움직이니까<br>되게 낯서네 ㅋㅋㅋㅋㅋㅋㅋ",
                        "textOriginal": "쇼츠만 보다가 롱폼 처음 보는데\n편집 소스를 얼굴로 한 사람이 실제로 살아 움직이니까\n되게 낯서네 ㅋㅋㅋㅋㅋㅋㅋ",
                        "authorDisplayName": "@요와이",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/6Cb6cwVifHWXadmJ5KXUlf13jEBwLroGQTBo65BWPVuHGKlLER_hpD9v8BrPkzoLPmmldgjw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9A%94%EC%99%80%EC%9D%B4",
                        "authorChannelId": {
                            "value": "UChHrlz5bthrYGbNSXZ7t0qw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 10,
                        "publishedAt": "2025-01-20T08:36:26Z",
                        "updatedAt": "2025-01-20T08:36:26Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "pSb273_G5KeD0JEi0uTniO_nLyY",
            "id": "UgzQbhjzWC8m66MkzK94AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "oCxNhQ29RG2si9fYdZ8RiwIfagA",
                    "id": "UgzQbhjzWC8m66MkzK94AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "어 이거 카트 켜놓고 다른 게임만 해도 10시간 공짜+5000원 먹거리 주는 거임??",
                        "textOriginal": "어 이거 카트 켜놓고 다른 게임만 해도 10시간 공짜+5000원 먹거리 주는 거임??",
                        "authorDisplayName": "@Jay-kp1oe",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nsWdm-0tZUR8ShzKorb2PW8LI2auQ93p8BDwLfjAk=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Jay-kp1oe",
                        "authorChannelId": {
                            "value": "UCai4P7KZDmmd-TC1W7nKyLA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:26:47Z",
                        "updatedAt": "2025-01-20T08:26:47Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "QUMS_9uoAe525ugMRjgvtt8HBpU",
            "id": "Ugx6SosvLRFQ3nFUbPN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "tNe7KDJSDYAAKeVdeDykOO21EZQ",
                    "id": "Ugx6SosvLRFQ3nFUbPN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "재미없는거 억지로 해야하네....;;",
                        "textOriginal": "재미없는거 억지로 해야하네....;;",
                        "authorDisplayName": "@JH_JCHI",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/HD0V3N6M015_DrA99q5gM5g21Wc6PeT4eYuq0ScObhi6huY8wl5p88chlPwxrEIwTENFOrnaSw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@JH_JCHI",
                        "authorChannelId": {
                            "value": "UCwF7oxUnkpSp3kR3ZwZagAw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 2,
                        "publishedAt": "2025-01-20T08:26:41Z",
                        "updatedAt": "2025-01-20T08:26:41Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "4iadjjoxeSzSdEgwsXIs6wnApdc",
            "id": "Ugz-KGEoWLFVxIFgjRh4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "s_HGiEbQWNKSAIHLD2HlIli9ACM",
                    "id": "Ugz-KGEoWLFVxIFgjRh4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이거 좋더라 카트키고 던파헬도면 개꿀입",
                        "textOriginal": "이거 좋더라 카트키고 던파헬도면 개꿀입",
                        "authorDisplayName": "@이근규-p5w",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nX4HfiXY6W7mAzsZPP4xrRi4LVwy3DxJ8n5bP9lQBRqqbrj1s=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9D%B4%EA%B7%BC%EA%B7%9C-p5w",
                        "authorChannelId": {
                            "value": "UC-oKg16R-GBGXiYuTuCnm1w"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:25:27Z",
                        "updatedAt": "2025-01-20T08:25:27Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "1K7UHJysg3MUR_Hx9ezTaTx0bnw",
            "id": "UgxUIQbbhDmrQMvJIeh4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "CZJ4AGci8rAT2IAvZWBISAWnlsc",
                    "id": "UgxUIQbbhDmrQMvJIeh4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "아 배고프다",
                        "textOriginal": "아 배고프다",
                        "authorDisplayName": "@수건-m2z",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/iuZdMcfm65NWkhTNiUghZZoAPJdUHqv-6t5CK6cmwDrkKv0xSBM-FwSUwm2q5950CeYAlizTaw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%88%98%EA%B1%B4-m2z",
                        "authorChannelId": {
                            "value": "UCH8WWBWO7to5jjFsZ6z8fqQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:22:48Z",
                        "updatedAt": "2025-01-20T08:22:48Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "FPKcvljcpsN4THwkISRNgjUPHDo",
            "id": "Ugz6brBEAQ1sT6IDlMB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "LQ-FebHXiomaWhcVIwplnFW37CE",
                    "id": "Ugz6brBEAQ1sT6IDlMB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=84\">1:24</a> 와 인트로 바꼈어 ㅁㅊ 역시 형집자",
                        "textOriginal": "1:24 와 인트로 바꼈어 ㅁㅊ 역시 형집자",
                        "authorDisplayName": "@shinwaldongfirepunchfdzz",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/PFjnbNaR3-1zJI5fESJEY35DQ2RV69gLXNZlY6Q-mDzSWHY6ehw2QQjVXSdj2XVNrxqh6vXU=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@shinwaldongfirepunchfdzz",
                        "authorChannelId": {
                            "value": "UCLXIRd7M9qFnEQ17JX7ZuBg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 64,
                        "publishedAt": "2025-01-20T08:17:50Z",
                        "updatedAt": "2025-01-20T08:17:50Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "85iHr4b-WF-CHLzW0a6oZ4QtPVk",
            "id": "UgzVfmGG93qQB1CIfp54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "dA5MQTPIJ3thq3hzJvKkf9GG6AU",
                    "id": "UgzVfmGG93qQB1CIfp54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "아마 넥슨이 지원해준듯...",
                        "textOriginal": "아마 넥슨이 지원해준듯...",
                        "authorDisplayName": "@스토커-Stalker",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/qyDm2kSH9nIb5fH-WX-uVyQ4nk_PwkwxcV6ovQLfXcG5x69AAE6KSF0KTedeiRLDrPz6Y0EMbUA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%8A%A4%ED%86%A0%EC%BB%A4-Stalker",
                        "authorChannelId": {
                            "value": "UCuWupiUu1tskHktiTIQ-oYg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:15:50Z",
                        "updatedAt": "2025-01-20T08:15:50Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 1,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "LyegeRujGWRNjyu7-H3OZk-fwHQ",
            "id": "UgyJOthhL8y6HYJ8B6p4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "0BANQ6BJ-uIRS51tPdJ1KGB4qiE",
                    "id": "UgyJOthhL8y6HYJ8B6p4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트영상좀 자주올려주세요!!!!!",
                        "textOriginal": "카트영상좀 자주올려주세요!!!!!",
                        "authorDisplayName": "@End_it-t4y",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/QrOc35S4Kjkbk6_GClElzDjsJ9cVH9tt7hT2L_xJaV9ATMKMPeHcl7h4ZzMulAZA_T6iTU01vg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@End_it-t4y",
                        "authorChannelId": {
                            "value": "UC_RpZX1xra1hL1jR9mf8NNw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:05:09Z",
                        "updatedAt": "2025-01-20T08:05:09Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "7r4Ya4r6MFSZ0gsfyOrLlfPgitk",
            "id": "UgwROsez1MnAYqTiyJ54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "CGmpcKse70AZ68owQQjvmDkcvUw",
                    "id": "UgwROsez1MnAYqTiyJ54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "우물님은 퇴사 하셧는대 같이나오네 신기하누",
                        "textOriginal": "우물님은 퇴사 하셧는대 같이나오네 신기하누",
                        "authorDisplayName": "@바미-j5t",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/H7J7BFjCwW17HAQR1D5NgHlBD1yRTooYAF750OZs05IGjyv43VPaurfML6WUVEZ2VtND-sSfjA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B0%94%EB%AF%B8-j5t",
                        "authorChannelId": {
                            "value": "UCf5-JO0tXJjIoIVym0CrfgQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T08:04:04Z",
                        "updatedAt": "2025-01-20T08:04:04Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "3f47xwOzKha5QIoRj-6P6TrVy_g",
            "id": "UgxhHv73xA272gSVojN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "Ql0yNNLmm6vkaXoVCddRiFpjOa0",
                    "id": "UgxhHv73xA272gSVojN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "매우 아이러니한 사실:카드립이 로아 등 인기겜은 pc방 점유율로 이겼는데 1월 20일 오후 5시 5분 기준으로 치지직 시청자순위 카러플보다 낮음(22명)<br>+동일시점 기준 로아 시청자 5000명후반 메이플 900명 극후반 롤 4000명 초반 발로란트 7000명 중반",
                        "textOriginal": "매우 아이러니한 사실:카드립이 로아 등 인기겜은 pc방 점유율로 이겼는데 1월 20일 오후 5시 5분 기준으로 치지직 시청자순위 카러플보다 낮음(22명)\n+동일시점 기준 로아 시청자 5000명후반 메이플 900명 극후반 롤 4000명 초반 발로란트 7000명 중반",
                        "authorDisplayName": "@mujeogui_sambaegpalsibdolo",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/-d2bHQ3gFUyKiSb02ND-VKKrxJP1kRZy67xlOcFqXcpPn5Ewy97WW_phHJwreMXe03hwoMWSHw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@mujeogui_sambaegpalsibdolo",
                        "authorChannelId": {
                            "value": "UC7QOST6iFnbhgOWLYJkrnYg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 4,
                        "publishedAt": "2025-01-20T08:03:53Z",
                        "updatedAt": "2025-01-20T08:07:22Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 2,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "adhZfs5jNS8Ox-bufjH8wBI-93k",
            "id": "UgxLjA8lZOwexi8n8fJ4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "Lr8ZOAV74NZApxc-hg8pV6Qzaag",
                    "id": "UgxLjA8lZOwexi8n8fJ4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "팬이에요 입질의추억님!",
                        "textOriginal": "팬이에요 입질의추억님!",
                        "authorDisplayName": "@늘보랑",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/5r3T8jBZ0iT9t-6RfFT77KjxkH-mCj6Fcfh69dWJkhkFYM3Pdm1EfFl_ekOXuNeUJ0ZDcdodwoo=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%8A%98%EB%B3%B4%EB%9E%91",
                        "authorChannelId": {
                            "value": "UCFfBg0MDI2PKq80n4liqwLw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 2,
                        "publishedAt": "2025-01-20T08:00:20Z",
                        "updatedAt": "2025-01-20T08:00:20Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "bz3yRgLTxsBH42BJX2Fm2FDwXZc",
            "id": "Ugxt8js2-cH06L4awbF4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "VbIj1yocBw6Np2Gi-EjDhM4YWZE",
                    "id": "Ugxt8js2-cH06L4awbF4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트 켜놓고 다른 넥슨게임 가능 &lt;&lt;&lt;이렇게해서 점유율 높여봤자 카트 망한거 인정하겠다는 거 아님?",
                        "textOriginal": "카트 켜놓고 다른 넥슨게임 가능 <<<이렇게해서 점유율 높여봤자 카트 망한거 인정하겠다는 거 아님?",
                        "authorDisplayName": "@꼬북칩-g8z",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/i0sdU3xxVfbCKh1pDp2y_XuPUsvvit0erfm2d5uiDS3MY_77im3P0u7a9u4hMCnlABvDLPdLUA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EA%BC%AC%EB%B6%81%EC%B9%A9-g8z",
                        "authorChannelId": {
                            "value": "UCmR51O9hVxpkJlnA8rMR-sA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 19,
                        "publishedAt": "2025-01-20T07:59:02Z",
                        "updatedAt": "2025-01-20T08:09:46Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 3,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "aOzHYenBemoECrP8lIwWN6SsR1k",
            "id": "UgyWCuEWwZuWxBSCp794AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "mJS0jFb569ev59Uvxmz1aXObWbI",
                    "id": "UgyWCuEWwZuWxBSCp794AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이렇게라도 점유율올라가서 좋네 ㅋㅋ",
                        "textOriginal": "이렇게라도 점유율올라가서 좋네 ㅋㅋ",
                        "authorDisplayName": "@MsJ-세종",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nO5_AnrR5wC3yikrkeRVMEqqK2JYLnvMQub5cKxd-mCQNDacSpJv5wGRkTMh4pgO6TqQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@MsJ-%EC%84%B8%EC%A2%85",
                        "authorChannelId": {
                            "value": "UCbIGitRVTr2qWhfm2ysWoDg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:55:08Z",
                        "updatedAt": "2025-01-20T07:55:08Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "L7mw-NMoCwluxNO3qHAUlrZA7aU",
            "id": "UgxwOlcM4aHGdx7I4B94AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "o8Q-sppb04DdOEJ5XZ-KTPgcFYo",
                    "id": "UgxwOlcM4aHGdx7I4B94AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이젠 놀라울정도로 광고가아니라는게 신기할 유튜버 대.형.독@.@",
                        "textOriginal": "이젠 놀라울정도로 광고가아니라는게 신기할 유튜버 대.형.독@.@",
                        "authorDisplayName": "@여친맘속",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/5d2zDB7xQDfKHNYzLEM7S8dB-3so8vMHyJCngmNnehiUWO9ecp6b2V-cGQ69ABJHadbR8fMCOYU=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%97%AC%EC%B9%9C%EB%A7%98%EC%86%8D",
                        "authorChannelId": {
                            "value": "UC7UEVJUtnsyniS4iUPiuDCA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:54:07Z",
                        "updatedAt": "2025-01-20T07:54:07Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "8iA70ljQmfckxJUdlI4MsPxoeyU",
            "id": "UgyYsPgMI9YnYprIqWF4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "7usPu9mq2jrqIx5d83M7eEJEo8k",
                    "id": "UgyYsPgMI9YnYprIqWF4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "생방에서 그렇게 사납던 선인장이 맞나? 손 흔들어 주는거 왜케 좋지ㅋㅋㅋ",
                        "textOriginal": "생방에서 그렇게 사납던 선인장이 맞나? 손 흔들어 주는거 왜케 좋지ㅋㅋㅋ",
                        "authorDisplayName": "@kkm1778-u7z",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/0IQZu3wt8JCyuLTMBAlBC13ZqCEclt1f5Ljk--FIKIpEx-2Y-Aixvwr5_GbmtGTGPRmuxnb9SA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@kkm1778-u7z",
                        "authorChannelId": {
                            "value": "UCJziI-rrc6UfYP7TfYM5Xjg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 2,
                        "publishedAt": "2025-01-20T07:52:19Z",
                        "updatedAt": "2025-01-20T07:52:19Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "5ZK92TEsybhnhzPKjZWPMIS4yEo",
            "id": "Ugx5LrL2fu9IsTNQVph4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "G-_3fgFp2gE9tsceeT8Jq7cvPOQ",
                    "id": "Ugx5LrL2fu9IsTNQVph4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "브금이 레이시티 브금도 있었던거 같음",
                        "textOriginal": "브금이 레이시티 브금도 있었던거 같음",
                        "authorDisplayName": "@Face-별빛",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/BFj4qJNxp1MNIe6Br_4PjSNQwDKBBdAgX8uf0u0jvSVtl870Yqx0b3Jn_4S9Jug-tp2G8ZcQzA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Face-%EB%B3%84%EB%B9%9B",
                        "authorChannelId": {
                            "value": "UC5wO6dw6J_3IA_brA4fBbeQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:50:35Z",
                        "updatedAt": "2025-01-20T07:50:35Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "LMdYQfu9n0x5hQqmN4ooegyf66U",
            "id": "Ugz60JlTjbWLFc7osLB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "XNCahp-lhEjbiAjWmesSzMa-5IU",
                    "id": "Ugz60JlTjbWLFc7osLB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=405\">6:45</a> 편집 뭔데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                        "textOriginal": "6:45 편집 뭔데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                        "authorDisplayName": "@StaLight",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/7PxSrBV05F9Fw2iG5GdEH5ztljN9UZo_dC8exXO4G6t74sO_HYP-ffD1nVygPoyQflvlBgc5=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@StaLight",
                        "authorChannelId": {
                            "value": "UCxRO-DSgVroK5HPNHt7kUKA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 1,
                        "publishedAt": "2025-01-20T07:49:53Z",
                        "updatedAt": "2025-01-20T07:49:53Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "HusYZRtC8He0PAmIu3nTwYvbn2A",
            "id": "UgwBgHecZVVaZ7A6H4l4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "OYf9j339KWUEiY80C42pYOIIdf4",
                    "id": "UgwBgHecZVVaZ7A6H4l4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "우물님ㄷㄷ 팬이에요",
                        "textOriginal": "우물님ㄷㄷ 팬이에요",
                        "authorDisplayName": "@africa_stream",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/5sndgC-is8yc6FrDshZE-wgLwheYAkYBXU5ICIybiDCoxMKC0y8hZo3hbTu4Hc02IdcBZ69qsQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@africa_stream",
                        "authorChannelId": {
                            "value": "UCVzNJbYIH9fa3E75qBhHj6A"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 13,
                        "publishedAt": "2025-01-20T07:48:57Z",
                        "updatedAt": "2025-01-20T07:48:57Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "UzYs2h_tqFeS2ZncAJ4QeqK24b0",
            "id": "UgyTvwDQLC9XsBQAJRN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "NhEPRFy9aVH8s_UcKkMgF6pB-lo",
                    "id": "UgyTvwDQLC9XsBQAJRN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "딴 게임도 무료 10시간 적용 되나?",
                        "textOriginal": "딴 게임도 무료 10시간 적용 되나?",
                        "authorDisplayName": "@HakosBaelz0229",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/Y-36gZRrq1rnj-l8I_0ePBVoHEeZkJB-nXwmwBCp6c_bBTOQDfrqLOkmqeBE7QisfbApNnaIlLs=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@HakosBaelz0229",
                        "authorChannelId": {
                            "value": "UC1K_1V2zdyHIeOrXRbVYSRA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 2,
                        "publishedAt": "2025-01-20T07:48:43Z",
                        "updatedAt": "2025-01-20T07:48:43Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "Lxzaln5pNCLWf81bXKt6_OSkzwU",
            "id": "UgxyzeZTFbBUIlUw2ex4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "Ta48drkkatFxfXUZwfk4cb29pKU",
                    "id": "UgxyzeZTFbBUIlUw2ex4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이제 부가티로 노젓기 과연..",
                        "textOriginal": "이제 부가티로 노젓기 과연..",
                        "authorDisplayName": "@아이디",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_k7IkU4Zyf1J2e2fi3ct0fzzfLCk2p06HiPImt2cU6anl4=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%95%84%EC%9D%B4%EB%94%94",
                        "authorChannelId": {
                            "value": "UCZg-hQBEPZkQLvosHwByoPQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:46:10Z",
                        "updatedAt": "2025-01-20T07:46:10Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "yULHZxO3xlu4VNm3LRuJ8Ltrqzg",
            "id": "UgwsOkU1HpSqy5-9DjB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "UTNk-0Q_RwLNX4Oe0NblmbzSLuw",
                    "id": "UgwsOkU1HpSqy5-9DjB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "팁:저거 켜두고 다른게임하시면됩니다 ㅋㅋ",
                        "textOriginal": "팁:저거 켜두고 다른게임하시면됩니다 ㅋㅋ",
                        "authorDisplayName": "@이노리-o5o",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lpl7kqpCdCfTs7XrBG3crd0PFO7JkRn-NSCAiF7NC0CpU=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9D%B4%EB%85%B8%EB%A6%AC-o5o",
                        "authorChannelId": {
                            "value": "UCRDV4f37vI_Q-0F9T2meFUg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 20,
                        "publishedAt": "2025-01-20T07:43:31Z",
                        "updatedAt": "2025-01-20T07:43:31Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 12,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "2DX4IPZbR4Y-6i_Q9Ii37WzK3A4",
            "id": "UgwYjUTxbZFf7mJikO94AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "-Z_8ejOeS8-H6vMs8LDV4HvHDZo",
                    "id": "UgwYjUTxbZFf7mJikO94AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "아니 인트로에 지나가는 차가 거의 하승진님인데 ㅋㅋ",
                        "textOriginal": "아니 인트로에 지나가는 차가 거의 하승진님인데 ㅋㅋ",
                        "authorDisplayName": "@White-ic4wq",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lj4SaMWMLoNcDgmGtpASjoYQ2mZAubFCw9Kna8FIi5r5g=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@White-ic4wq",
                        "authorChannelId": {
                            "value": "UCZyHrgjFO_z4W7wlyYcqJKg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:41:14Z",
                        "updatedAt": "2025-01-20T07:41:14Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "GZbV9d5JtPU7bY9CJtBhdY8Nsns",
            "id": "UgzntkszJLIsuOeQy6B4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "1mszo9NwNuDFkvzDEIULkRidgn8",
                    "id": "UgzntkszJLIsuOeQy6B4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이거 듣기로는 카트 밑에다가 깔아두고 딴거할수 있어가지고 개꿀이라던데 ㅋㅋ",
                        "textOriginal": "이거 듣기로는 카트 밑에다가 깔아두고 딴거할수 있어가지고 개꿀이라던데 ㅋㅋ",
                        "authorDisplayName": "@hand1633",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_ksS6Dw-eG4bDvGHylKAP229xJP_c4mqAJd7efWDZZslq0TznRHsmFBRY03p-6mlUFOKA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@hand1633",
                        "authorChannelId": {
                            "value": "UCTetG5B5gbwk155yYSUUNsA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 7,
                        "publishedAt": "2025-01-20T07:40:48Z",
                        "updatedAt": "2025-01-20T08:02:22Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "1V4IMDsoop6iNJxbO88-yiCIGCk",
            "id": "UgzLx97kfgC03T8iiyd4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "pJ6g54-zr8Yh_3NEG_4EUMIRyR4",
                    "id": "UgzLx97kfgC03T8iiyd4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Ea5ZxYi6m8s&amp;t=406\">06:46</a> ㅋㅋㅋㅋ 편집 레전드",
                        "textOriginal": "06:46 ㅋㅋㅋㅋ 편집 레전드",
                        "authorDisplayName": "@이윤서-n7w7w",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_ndtGCqv8GkxVkOUgUUrgxMJ79NmTAJGhdSHUUM4AH2_DjjKes=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%9D%B4%EC%9C%A4%EC%84%9C-n7w7w",
                        "authorChannelId": {
                            "value": "UCFfw4PhSBDxyg_SP_wKueSg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 62,
                        "publishedAt": "2025-01-20T07:39:54Z",
                        "updatedAt": "2025-01-20T07:39:54Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 1,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "LFZdsGaQnW9MA4wEeCCTiPifmWU",
            "id": "UgwbnkDJ3LGHJhs_iGB4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "P3E5Bb-QA5QfS088ftzcD3S4VrA",
                    "id": "UgwbnkDJ3LGHJhs_iGB4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카드맆 pc방 가서 하기가 좀.... 아직 부끄럽다...",
                        "textOriginal": "카드맆 pc방 가서 하기가 좀.... 아직 부끄럽다...",
                        "authorDisplayName": "@삐eee",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/L9lT55cnjxf7zV3FvhoIptHKrEv3TKdnbA9GMYqNWDnWRMAGd9SU-yWIHZwI4kcqyoc2MSSv6A=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EC%82%90eee",
                        "authorChannelId": {
                            "value": "UCFdzNU6MJBeUyuZaKMa_gRA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 1,
                        "publishedAt": "2025-01-20T07:38:10Z",
                        "updatedAt": "2025-01-20T07:38:10Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "NsfSbsOkODbSDhJoSQwr2Hovu7I",
            "id": "Ugy6IFPlpRm5bz6FPYt4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "MF1JHzjqy1W6EnAuI8kW_K53_WQ",
                    "id": "Ugy6IFPlpRm5bz6FPYt4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "혼자 즐거운 시간 보낼려고 피방으로 도망치는 형독.",
                        "textOriginal": "혼자 즐거운 시간 보낼려고 피방으로 도망치는 형독.",
                        "authorDisplayName": "@부태입니다",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/vAuPpPe8927uPi6_mnry-2L59gDqHwz03WKrXVb_QyIYd0wB4ppV_cDvaczi1ukoKDaiH8h6Rw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B6%80%ED%83%9C%EC%9E%85%EB%8B%88%EB%8B%A4",
                        "authorChannelId": {
                            "value": "UC7KBkVV3FFm6M1nJfh1NnZA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:37:19Z",
                        "updatedAt": "2025-01-20T07:37:19Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "w0mTgdwzekYVxcx9lrj9MudptP8",
            "id": "UgzRZKG85_kbK2pWQJF4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "uZGya_iqXi0c3gZhzxcwLha4gj0",
                    "id": "UgzRZKG85_kbK2pWQJF4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "배그도 같이 켜지나?",
                        "textOriginal": "배그도 같이 켜지나?",
                        "authorDisplayName": "@블랙갓백",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_k-_tblZNO1EGWbZvDqc0hK9JtZn0ctXFl_54CYNS8=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B8%94%EB%9E%99%EA%B0%93%EB%B0%B1",
                        "authorChannelId": {
                            "value": "UCuiQcIouYbbnvzEyz-myKig"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:36:52Z",
                        "updatedAt": "2025-01-20T07:36:52Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 4,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "mtlPsvbZzetSR-QFxGIljq_2Q80",
            "id": "UgzxdyYjs3UrpAMDsgt4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "tE10mP1KgOo57tlLgF9S6iWA8g0",
                    "id": "UgzxdyYjs3UrpAMDsgt4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "피시방에서만카트하는저한테는개꿀이네요",
                        "textOriginal": "피시방에서만카트하는저한테는개꿀이네요",
                        "authorDisplayName": "@노는자",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/qGorDlXwwfPIf686jv3GHcdidvOsJV0EE4zdse7tUyKh3Yq3lXPfVibecs96VgSm9wqbiTsI6w=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%85%B8%EB%8A%94%EC%9E%90",
                        "authorChannelId": {
                            "value": "UCPjiczwGQPxPImttT43e7Fg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:35:48Z",
                        "updatedAt": "2025-01-20T07:35:48Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "Vwg-kCd7ynSx1mJa4n4CuGuaV0w",
            "id": "Ugycay2XmWHKkfIsN_B4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "nN333Fwd2GoYxvhkZayqowHXQxU",
                    "id": "Ugycay2XmWHKkfIsN_B4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "Pc방에서 카트하면 좀 쪽팔릴거같은데",
                        "textOriginal": "Pc방에서 카트하면 좀 쪽팔릴거같은데",
                        "authorDisplayName": "@Curv_ed",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/zW3GD5M2Ja8vL96fS_oc4Vot6gw8fgW6wPVgQ_Pa9GVvTNxQz7UqU7deiEw6EO5c0PIt3S4e2g=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Curv_ed",
                        "authorChannelId": {
                            "value": "UCXu669lIKDYFr9Hwy8AN5rQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:35:45Z",
                        "updatedAt": "2025-01-20T07:35:45Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "F8s6IexlZ0kb_HFnkEPuETjtPSM",
            "id": "UgxUOUu6iAANhkozdPN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "-cixA_D-0tu34h9uWHpcr0jy7i4",
                    "id": "UgxUOUu6iAANhkozdPN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "오랜만에 다양한 인트로ㅋㅋ 인트로변형도 자주 해줬으면",
                        "textOriginal": "오랜만에 다양한 인트로ㅋㅋ 인트로변형도 자주 해줬으면",
                        "authorDisplayName": "@나그네유튜브",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/XCJtOvZ-3nKX79Okye5mcbcI9B7Dcs5GeN2WedwCKoLzZQNQ5s6YH2XYcInt3iSLd7XQKqSCxQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%82%98%EA%B7%B8%EB%84%A4%EC%9C%A0%ED%8A%9C%EB%B8%8C",
                        "authorChannelId": {
                            "value": "UC5mC7kwSFDaRQgtpkqVsIxw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 4,
                        "publishedAt": "2025-01-20T07:33:05Z",
                        "updatedAt": "2025-01-20T07:33:05Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "YYeJKgvbU6UFvpFtdceorDQMb_s",
            "id": "UgyWtlfmwC4wQbUEZd54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "qs-kvNv9Ze_JON3JI280wEFGNYQ",
                    "id": "UgyWtlfmwC4wQbUEZd54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "2분전은 못참지 왔다내야동",
                        "textOriginal": "2분전은 못참지 왔다내야동",
                        "authorDisplayName": "@bjmute8522",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_lf2PZ8AqBzQ_1_HWXnakxgb_RWGLe2jgALKf2kMf4AOdE=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@bjmute8522",
                        "authorChannelId": {
                            "value": "UCbthuI4GqI9f2URFstuRDcw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 3,
                        "publishedAt": "2025-01-20T07:32:57Z",
                        "updatedAt": "2025-01-20T07:32:57Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "x6XVjzE_X2y5iRTjlKgG1XZej4E",
            "id": "Ugwip-NV0pwv0kBF3NN4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "_3MP_fSiLNmCum7UXFcBHN2CUDI",
                    "id": "Ugwip-NV0pwv0kBF3NN4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "부가티 얼마나 사기로 내야 이게 회수가 될까",
                        "textOriginal": "부가티 얼마나 사기로 내야 이게 회수가 될까",
                        "authorDisplayName": "@GALGORY",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_kWXbTK3yDGA6hDk29bkrFtjogn9gc9CsKiSoOQbQE=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@GALGORY",
                        "authorChannelId": {
                            "value": "UCpdFe0FUIsITjqs26MObR6g"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:32:04Z",
                        "updatedAt": "2025-01-20T07:32:04Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "6X2LioEUFoCnrHidrZqj3oi0mz0",
            "id": "Ugwd2RmeDwk7ef1KwC54AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "n9x2vcNairXt95ftOIT-ZDTSXyc",
                    "id": "Ugwd2RmeDwk7ef1KwC54AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "이렇게 브이로그? 자주 찍는것도 좋네요",
                        "textOriginal": "이렇게 브이로그? 자주 찍는것도 좋네요",
                        "authorDisplayName": "@나그네유튜브",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/XCJtOvZ-3nKX79Okye5mcbcI9B7Dcs5GeN2WedwCKoLzZQNQ5s6YH2XYcInt3iSLd7XQKqSCxQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%82%98%EA%B7%B8%EB%84%A4%EC%9C%A0%ED%8A%9C%EB%B8%8C",
                        "authorChannelId": {
                            "value": "UC5mC7kwSFDaRQgtpkqVsIxw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 2,
                        "publishedAt": "2025-01-20T07:31:09Z",
                        "updatedAt": "2025-01-20T07:31:09Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "zuC2bLAqWSWe0ONM1hBikJyBkPM",
            "id": "Ugx96xEC_XqUiDqeN0R4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "JMuEKDoqGfxH2wipMAHdRwwTOM4",
                    "id": "Ugx96xEC_XqUiDqeN0R4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "카트라이더 이벤트로 하는거 아님?",
                        "textOriginal": "카트라이더 이벤트로 하는거 아님?",
                        "authorDisplayName": "@님피아",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_mLN__OwK8pAfe72URE4aWPvbq7PWtP3RCgfwLQIN2q_mo=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%8B%98%ED%94%BC%EC%95%84",
                        "authorChannelId": {
                            "value": "UCi_GeEZiKqC0k-21FexFiWg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:30:56Z",
                        "updatedAt": "2025-01-20T07:30:56Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 1,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "KOHUWRQKx9uI_haDRq_uTUsuOm0",
            "id": "UgwrG559e8jamLNico94AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "uIVRbKo_frVmsnEbO60cMKUtXGU",
                    "id": "UgwrG559e8jamLNico94AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "베댓이다",
                        "textOriginal": "베댓이다",
                        "authorDisplayName": "@박상우-k9d",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/dNXFjPBhvtqfPKDV3pObtFnWnP-zC5QFNrwx8Qpbdt_9kmlGUZcN5nKxSE0EOewQm3UtdQO4bA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@%EB%B0%95%EC%83%81%EC%9A%B0-k9d",
                        "authorChannelId": {
                            "value": "UCdOXBDwysfamY-sS5RlsX5g"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 4,
                        "publishedAt": "2025-01-20T07:30:51Z",
                        "updatedAt": "2025-01-20T07:30:51Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "u6nRpcqaC8STVvxB9PmCN8omDBM",
            "id": "UgydTUJgXBYDIPJfz094AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "QTp_mH1yAoS3ENjjBhvA3x-RyE4",
                    "id": "UgydTUJgXBYDIPJfz094AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "제목 보자마자 카드맆 이벤트인거 알았다…",
                        "textOriginal": "제목 보자마자 카드맆 이벤트인거 알았다…",
                        "authorDisplayName": "@Zac1114",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ynYbzq0PXfk5MtG9g-_A1U_u-dSAhcpCLgbrnn7PypLFW7t1uHwh650YhMO0gKBIFTacPCq7dQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Zac1114",
                        "authorChannelId": {
                            "value": "UCF5eEem0U8DwOddVTzmJHxQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 194,
                        "publishedAt": "2025-01-20T07:30:40Z",
                        "updatedAt": "2025-01-20T07:30:40Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 4,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "fhTeakK8mVeGxWdbnuoEu8vjB6I",
            "id": "UgwAYtIazhfO6xJD9CJ4AaABAg",
            "snippet": {
                "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                "videoId": "Ea5ZxYi6m8s",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "40okrPgh6VePOiwXdOmDcJzm2s0",
                    "id": "UgwAYtIazhfO6xJD9CJ4AaABAg",
                    "snippet": {
                        "channelId": "UCJDEss5wA1ddrCBC40giO8A",
                        "videoId": "Ea5ZxYi6m8s",
                        "textDisplay": "오",
                        "textOriginal": "오",
                        "authorDisplayName": "@Panda-jw4hi",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_mIX515WWWOrAn1wTKH95qjuIzQlPJq73LDw_VljGzp7w=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/@Panda-jw4hi",
                        "authorChannelId": {
                            "value": "UCPYYZFqnkeUiFI99D_fuUgA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 0,
                        "publishedAt": "2025-01-20T07:30:38Z",
                        "updatedAt": "2025-01-20T07:30:38Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        }
    ]
}

extractComment(data)