var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var news = require('../controllers/news');
var works = require('../controllers/works');
var category = require('../controllers/category');
var service = require('../controllers/service');
var job = require('../controllers/job');
var team = require('../controllers/team');
var confing = require('../controllers/confing');
/*模板视图路由*/
/*router.get('/', views.index);*/


/*登录接口*/
router.post('/login', login.loginCheck);

/*登录校验接口*/
router.get('/loginValid', login.loginValid);

/*退出登录*/
router.get('/logout', login.logout);

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

/*删除新闻 */
router.get('/news/remove', news.remove);

/*批量删除新闻 */
router.get('/news/batchremove', news.batchremove);

/*作品列表*/
router.get('/works/list', works.getList);

/*作品列表查询*/
router.get('/works/query', works.query);

/*作品详情*/
router.get('/works/details', works.details);

/*添加作品 */
router.post('/works/add', works.add);

/*修改作品 */
router.post('/works/edit', works.edit);

/*作品点赞 */
router.get('/works/thumbUp', works.thumbUp);

/*作品浏览 */
router.get('/works/browse', works.browse);

/*删除作品 */
router.get('/works/remove', works.remove);

/*批量删除作品 */
router.get('/works/batchremove', works.batchremove);

/*分类列表*/
router.get('/category/list', category.getList);

/*添加分类 */
router.post('/category/add', category.add);

/*删除分类 */
router.get('/category/remove', category.remove);

/*修改分类 */
router.post('/category/edit', category.edit);

/*服务列表*/
router.get('/service/list', service.getList);

/*添加服务 */
router.post('/service/add', service.add);

/*修改服务 */
router.post('/service/edit', service.edit);

/*删除服务 */
router.get('/service/remove', service.remove);

/*批量删除服务 */
router.get('/service/batchremove', service.batchremove);

/*招聘列表*/
router.get('/job/list', job.getList);

/*招聘详情*/
router.get('/job/details', job.details);

/*添加招聘 */
router.post('/job/add', job.add);

/*修改招聘 */
router.post('/job/edit', job.edit);

/*删除招聘 */
router.get('/job/remove', job.remove);

/*批量删除招聘 */
router.get('/job/batchremove', job.batchremove);

/*团队列表*/
router.get('/team/list', team.getList);

/*添加团队 */
router.post('/team/add', team.add);

/*修改团队 */
router.post('/team/edit', team.edit);

/*删除团队 */
router.get('/team/remove', team.remove);

/*批量删除团队 */
router.get('/team/batchremove', team.batchremove);

/*配置项编辑 */
router.post('/confing/edit', confing.edit);

/*配置项详情*/
router.get('/confing/details', confing.details);

/*配置项列表*/
router.get('/confing/list', confing.getList);

module.exports = router;