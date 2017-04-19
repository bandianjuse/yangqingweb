var news = require('../controllers/news');



module.exports = function(router){
    /*新闻列表*/
    router.get('/news/list', news.getList);

    /*新闻详情*/
    router.get('/news/details', news.details);

    /*添加新闻 */
    router.post('/news/add', news.add);

    /*修改新闻 */
    router.post('/news/edit', news.edit);

    /*新闻点赞 */
    router.get('/news/thumbUp', news.thumbUp);

    /*新闻浏览 */
    router.get('/news/browse', news.browse);
};