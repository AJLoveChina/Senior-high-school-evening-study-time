(() => {
    let customConfig = {
        customVariableCanbeHere: "start",
        /**
         * answer data structure is like this:
         id: 964948841
         question: {type: "question", id: 364950315, title: "抖音日活突破 4 亿，你是这 4 亿分之一吗？", question_type: "normal", created: 1578288070, …}
         author: {id: "790397d81290093c334bd47c76a8730f", url_token: "iAladdin", name: "iAladdin", avatar_url: "https://pic3.zhimg.com/v2-4f4de7f3764a8144fdce813cb9ad189b_is.jpg", avatar_url_template: "https://pic3.zhimg.com/v2-4f4de7f3764a8144fdce813cb9ad189b_{size}.jpg", …}
         content: "<p>泻药。</p><p>不是。</p><p>我站B站和知乎，日活贡献者。</p>"

         url: "https://www.zhihu.com/api/v4/answers/964948841"
         type: "answer"
         answer_type: "normal"
         is_collapsed: false
         created_time: 1578309446
         updated_time: 1578309464
         extras: ""
         is_copyable: true
         is_normal: true
         voteup_count: 3
         comment_count: 0
         is_sticky: false
         admin_closed_comment: false
         comment_permission: "all"
         can_comment: {reason: "", status: true}
         reshipment_settings: "allowed"
         editable_content: ""
         excerpt: "泻药。 不是。 我站B站和知乎，日活贡献者。"
         collapsed_by: "nobody"
         collapse_reason: ""
         annotation_action: null
         mark_infos: []
         relevant_info: {is_relevant: false, relevant_type: "", relevant_text: ""}
         suggest_edit: {reason: "", status: false, tip: "", title: "", unnormal_details: {…}, …}
         is_labeled: false
         reward_info: {can_open_reward: false, is_rewardable: false, reward_member_count: 0, reward_total_money: 0, tagline: ""}
         relationship: {is_author: false, is_authorized: false, is_nothelp: false, is_thanked: false, is_recognized: false, …}
         ad_answer: null
         */
        async process(answer) {
            console.log(this.customVariableCanbeHere);
            console.log(answer);
        },
        sleep() {
            // 5 ~ 15秒的查询间隔时间
            let sleepMilliseconds = (25 + 10 * Math.random()) * 1000;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, sleepMilliseconds)
            });
        },
        shortSleep() {
            // 如果数据在indexedDB中有缓存, sleep的时间 0.1 ~ 0.6秒
            let sleepMilliseconds = (0.1 + 0.5 * Math.random()) * 1000;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, sleepMilliseconds)
            });
        },
    };


    (async () => {
        let url = location.href;
        let questionNumber = getQuestionNumberFromUrl(url);
        let limit = 10;
        let offset = 0;

        while (true) {
            console.log('limit', limit);
            console.log('offset', offset);
            let indexedDBKeyPathName = 'limit_offset';
            let keyPathValue = `k${limit}to${offset}`;
            let jsonparseedResponse;
            let handler = await getDBhandler('zhihuDB', `question_${questionNumber}`, indexedDBKeyPathName);
            let existIndexedDBValue = await getDBValue(keyPathValue, handler);
            if (existIndexedDBValue) {
                if (typeof existIndexedDBValue.content === 'string') {
                    jsonparseedResponse = JSON.parse(existIndexedDBValue.content);
                } else {
                    jsonparseedResponse = existIndexedDBValue.content;
                }
            } else {
                let zhihuDataUrl = `https://www.zhihu.com/api/v4/questions/${questionNumber}/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit=${limit}&offset=${offset}&platform=desktop&sort_by=default`;

                let response = await request(zhihuDataUrl);
                jsonparseedResponse = JSON.parse(response);


                handler = await getDBhandler('zhihuDB', `question_${questionNumber}`, indexedDBKeyPathName);
                handler.add({
                    content: jsonparseedResponse,
                    [indexedDBKeyPathName]: keyPathValue
                });
            }

            /**
             * jsonparseedResponse is like this:
             *   data: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                 paging:
                     is_end: false
                     is_start: true
                     next: "https://www.zhihu.com/api/v4/questions/364950315/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit=10&offset=10&platform=desktop&sort_by=default"
                     previous: "https://www.zhihu.com/api/v4/questions/364950315/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit=10&offset=0&platform=desktop&sort_by=default"
                     totals: 39
             */
            for (let i = 0; i < jsonparseedResponse.data.length; i++) {
                await customConfig.process.call(customConfig.process, jsonparseedResponse.data[i]);
            }

            if (existIndexedDBValue) {
                await customConfig.shortSleep();
            } else {
                await customConfig.sleep();
            }

            if (!existIndexedDBValue && jsonparseedResponse.paging && jsonparseedResponse.paging.is_end) {
                break;
            }
            offset += limit;
        }

        console.log("exit");
    })();


    function request(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ev => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    resolve(xhr.responseText);
                }
            };

            xhr.open('GET', url);
            xhr.send();
        });
    }

    function getDBhandler(tableName, tableNameDatabase, keyPath) {
        return new Promise((resolve, reject) => {
            var request = window.indexedDB.open(tableNameDatabase, 3);

            request.onerror = function (event) {
                // Do something with request.errorCode!
            };
            request.onsuccess = function (event) {
                db = event.target.result;
                // Create an objectStore for this database
                var tobj = db.transaction(tableName, 'readwrite').objectStore(tableName);
                resolve(tobj);
            };
            request.onupgradeneeded = function (event) {
                // Do something with request.result!
                db = event.target.result;
                // Create an objectStore for this database
                var objectStore = db.createObjectStore(tableName, {
                    autoIncrement: true,
                    keyPath,
                });

                objectStore.transaction.oncomplete = function (event) {
                    // 将数据保存到新创建的对象仓库
                    var tobj = db.transaction(tableName, 'readwrite').objectStore(tableName);
                    resolve(tobj)
                };
            };
        });
    }

    function getDBValue(keyPathValue, handler) {
        return new Promise((resolve, reject) => {
            var request = handler.get(keyPathValue);
            request.onerror = function (event) {
            };
            request.onsuccess = function (event) {
                resolve(request.result)
            };
        });
    }

    function getQuestionNumberFromUrl(url) {
        let results = /question\/\d+/.exec(url);
        return /\d+/.exec(results[0])[0];
    }
})();