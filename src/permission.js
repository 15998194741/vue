import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/cookie-utils'; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 路由拦截器
router.beforeEach(async(to, from, next) => {
  // 开始加载进度
  NProgress.start();
  next();
  NProgress.done();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});